import { throws } from "assert";

import express, { Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { buildApolloSchema } from "@vulcanjs/graphql/server";

import mongoConnection from "~/lib/api/middlewares/mongoConnection";
import corsOptions from "~/lib/api/cors";
import { contextFromReq } from "~/lib/api/context";
import models from "~/models/index.server";

// will trigger seed
import runSeed from "~/lib/api/runSeed";
import { PredictionResolutionGroup, nonMarketScore } from "~/lib/prediction-analysis/src/index";

import { Guesstimator } from "~/lib/guesstimator/src/index";

const stampy_id = "stampy";
const {Matrix, solve} = require('ml-matrix');

const readline = require('readline');
const f = require('fs');
const cron = require('node-cron');



const admin_usernames = []; //Either fill with admins, or remove


//Singleton utility class. Contains many static functions that access the database.
class Utilities {

    static DB_PATH;

    static __instance;
    static db;
    static client;
    

    static users;
    static ids;
    //indices of users and scores for each trust graph.
    static indices;
    static scores;
    //MongoDB collections
    static UserVotes;
    static Predictions;
    static Resolutions;
    static ProposalTags;
    static Values;


    static get_instance () {
        if(! Utilities.__instance) {
            new Utilities();
        }
        return Utilities.__instance;
    }

    constructor() {
      if(Utilities.__instance != null) {
          throw "This class is a singleton!"
      } else {
          Utilities.db = mongoose.connection;
          Utilities.__instance = this;
      }

    }

    static async init() {
        Utilities.UserVotes = Utilities.db.collection("uservotes");
		    Utilities.Predictions = Utilities.db.collection("predictions");
        Utilities.Resolutions = Utilities.db.collection("resolutions");
        Utilities.ProposalTags = Utilities.db.collection("proposaltags");
        Utilities.Values = Utilities.db.collection("values");
        Utilities.scores = {};
        Utilities.indices = {};
    }

    static async clearVotes() {
        await Utilities.UserVotes.deleteMany({});
    }

    //update the ids list and indices based on changes to the users.

    static async update_ids_list() {
        if (Utilities.users) {
          Utilities.ids = Utilities.users.sort();
        }
		    console.log(Utilities.ids);
        let graphs = await Utilities.get_graphs()
        for(let i = 0; i < graphs.length; i++) {
            Utilities.indices[graphs[i]] = {0: 0};
        }
        if (Utilities.ids) {
		    for(let i = 0; i < Utilities.ids.length; i++) {
                let userid = Utilities.ids[i];
                for (let i = 0; i < graphs.length; i++) {
                  Utilities.indices[graphs[i]][userid] = Utilities.ids.indexOf(userid);
                }
          }
        }
    }

    static index_dammit(user, collection) {
		
		let targetIndex = Utilities.indices[collection];
		
        //get an index into the scores array from whatever you get.
        if (user in targetIndex) {
            //maybe we got a valid ID?
            return targetIndex[user];
        } else if (user.toString() in targetIndex) {
            return targetIndex[user.toString()];
        }
        //Maybe we got a User or Member object that has an ID?
        let uid = user.id ? user.id : null;
        console.log(uid);
        console.log(targetIndex);
        if (uid) {
            return this.index_dammit(uid, collection);
        }

        return null;
    }

    //Get the score of a user from the scores array.
    static get_user_score(user, collection) {
        let userIndex = this.index_dammit(user, collection);
        if (userIndex) {
          console.log(Utilities.scores);
          let res = Utilities.scores[collection][userIndex];
          console.log("Aha!");
          return res;
        }
        return 0.0;
    }
    //Add a vote for a piece of content.
    static async update_vote(userwallet, user_name, voted_for, voted_for_target, target_type, vote_quantity, collection) {
		    let targetTable = Utilities.UserVotes;
        let insertedObj = {
            user: userwallet,
            sourceName: user_name,
            votedFor: voted_for,
            target: voted_for_target,
            targetType: target_type,
            votecount: vote_quantity,
            graph: collection			
        };
        console.log(insertedObj);
        await targetTable.insertOne(insertedObj);
    }

  //Find all the votes a user has made.
  static async get_votes_by_user(userwallet, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({user: userwallet, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }

  //Find all the votes a user has received.
  static async get_votes_for_user(userwallet, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({votedFor: userwallet, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }


  //Find all the votes a piece of content has received.
  static async get_votes_by_target(target, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({target: target, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }
  //Get the total votes for a provided trust graph.
  static async get_total_votes(collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }
  //Get every vote for a provided trust graph.
  static async get_all_user_votes(collection){
		let targetTable = Utilities.UserVotes;
    return await targetTable.find({graph: collection}).toArray();
  }
  //Get the users that have interacted through votes with a given trust graph, whether by giving or receiving a vote.
  static async get_users(collection) {
      let targetTable = Utilities.UserVotes;
      let users = [] as any;
      let allUserVotes = await targetTable.find({graph: collection}).toArray();
      for (let i = 0; i < allUserVotes.length; i++) {
          if(! users.includes(allUserVotes[i].user)) {
              users.push(allUserVotes[i].user);
          }
          if(! users.includes(allUserVotes[i].votedFor)) {
              users.push(allUserVotes[i].votedFor);
          }
      }
      return users;
  }
  //Get every trust graph.
  static async get_graphs() {
    let targetTable = Utilities.UserVotes;
    return targetTable.distinct("graph", {});
  }
  //Get every content type.
  static async get_content_types() {
    let targetTable = Utilities.UserVotes;
    return targetTable.distinct("targetType", {});
  }
  //Get resolutions for a piece of content.
  static async get_resolutions_by_target(target, collection){
		let targetTable = Utilities.Resolutions;
    let allResolutions = await targetTable.find({targetId: target, graph: collection}).toArray();
    return allResolutions;
  }
  //Get predictions for a piece of content.
  static async get_predictors_by_target(target, collection){
		let targetTable = Utilities.Predictions;
    let allPredictions = await targetTable.find({contentId: target, collection: collection}).toArray();
    return allPredictions.map(prediction => prediction.user);
  }
  //Get the resolving users for a piece of content. If the empty list is returned, all users are counted as resolving users.
  static async get_resolving_user_ids(target, targetType) {
		let targetTable = Utilities.db.collection("contents");
    let targetProposal = (await targetTable.find({_id: target, contentType: targetType}).toArray())[0];
    if (! targetProposal.resolvingUsers) {
      return [];
    } else {
      return targetProposal.resolvingUsers.split(",");
    }
  }
  //Get all pieces of content with some tag.
  static async get_content_by_tag(tag) {
    let targetTable = Utilities.ProposalTags;
    let targetTags = await targetTable.find({tagName: tag}).toArray();
    return targetTags.map(tag => tag.id);
  }
  //Get the amount of times a tag has been applied to a piece of content.
  static async get_tag_count(tag, id) {
    let targetTable = Utilities.ProposalTags;
    let targetTags = await targetTable.find({tagName: tag, id: id}).toArray();
    return targetTags.length;
  }
  //get a user's prediction of a piece of content.
  static async get_prediction(user, id) {
    let targetTable = Utilities.Predictions;
    let finalPredictions = await targetTable.find({user: user, contentId: id}).toArray();
    return finalPredictions[0];
  }
	//Get the average impact of a piece of content.
  //Use resolutions if any exist, otherwise use predictions.
  static async get_average_impact_by_target(id, graph) {
		let all_impact_votes = await Utilities.Predictions.find({contentId: id, graph: graph}).toArray();
    let all_impact_resolutions = await Utilities.Resolutions.find({contentId: id, graph: graph}).toArray();
    if (all_impact_resolutions.length > 0) {
      all_impact_votes = all_impact_resolutions;
    }
    console.log(all_impact_votes);
		let total = 0;
		if (all_impact_votes.length < 1) {
			return 0;
		}
		for (let i = 0; i < all_impact_votes.length; i++) {
            total += all_impact_votes[i].score;
        }
        return total/all_impact_votes.length;
	}
	//Get the average impact of a user, using all pieces of content they have created.
	static async get_average_impact_by_user(userwallet, graph) {
    let user_content = await Utilities.db.collection("contents").find({creator: userwallet}).toArray();
    console.log(user_content);
    
		let total = 0;
		if (user_content.length < 1) {
			return 0;
		}
		for (let i = 0; i < user_content.length; i++) {
			total += await this.get_average_impact_by_target(user_content[i]._id, graph);
		}
		return total/user_content.length;
	}
  //Get the start set for a value or trust graph. If no start set is specified, default to the value's creator.
  static async get_start_set(name) {
    let values = await Utilities.Values.find({name: name}).toArray();
    if (values.length < 1) {
      return [];
    } else if (! values[0].startSet) {
      return [values[0].creator];
    } else {
      return values[0].startSet.split(",");
    }
  }

  //get the range of numbers of votes for all pieces of content on a given trust graph. Used for normalization.
  static async get_vote_range(graph) {
    let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({graph: graph}).toArray();
    let min = 99999;
    let max = -99999;
    for (let i = 0; i < allUserVotes.length; i++) {
      let count = allUserVotes[i].votecount;
      if (count > max) {
        max = count;
      }

      if (count < min) {
        min = count;
      }

    }

    return [min, max];

  }

  //
  static async get_prediction_range(graph) {
    let targetTable = Utilities.Predictions;
    let allResolutions = await targetTable.find({graph: graph}).toArray();
    let min = 99999;
    let max = -99999;
    for (let i = 0; i < allResolutions.length; i++) {
      let count = allResolutions[i].score;
      if (count > max) {
        max = count;
      }

      if (count < min) {
        min = count;
      }
    }
  }

  static async get_resolution_range(graph) {
    let targetTable = Utilities.Resolutions;
    let allResolutions = await targetTable.find({graph: graph}).toArray();
    let min = 99999;
    let max = -99999;
    for (let i = 0; i < allResolutions.length; i++) {
      let count = allResolutions[i].score;
      if (count > max) {
        max = count;
      }

      if (count < min) {
        min = count;
      }
    }
  }
	

}

class StampsModule {
    utils: any;
    //Strengths of votes.
    red_stamp_value: number;
    gold_stamp_value: number;
    half_red_stamp_value: number;
    half_gold_stamp_value: number;
    zero_stamp_value: number;

    user_karma: number;
    total_votes: any;
    total_temperature_votes: any;
    total_capital_votes: any;
    graphs: any;
    toString() {
        return "Stamps module";
    }

    constructor() {
      Utilities.get_instance();
      this.utils = Utilities;
      this.red_stamp_value = 1;
      this.gold_stamp_value = this.red_stamp_value * 5;
      this.half_red_stamp_value = .5;
      this.half_gold_stamp_value = 2.5;
      this.zero_stamp_value = 0;
      this.user_karma = 1.0; 
    }

    async init() {
      await this.utils.init();
      this.graphs = await this.utils.get_graphs();
      this.total_votes = {}
      for (let i = 0; i < this.graphs.length; i++) {
          this.total_votes[this.graphs[i]] = await this.utils.get_total_votes(this.graphs[i]);
          await this.calculate_stamps(this.graphs[i]);
      }
    }

    reset_stamps() {
      console.log("WIPING STAMP RECORDS");
      this.utils.clearVotes()
      this.utils.update_vote('alice', 'alice_name', 'bob', 'seed_transaction', null, 7, "time", "transaction"); //Generate start set IDs and replace these
      this.utils.update_vote('alphonse', 'alphonse_name', 'barry', 'seed_transaction', null, 7, "temperature", "transaction"); //Generate start set IDs and replace these
      this.utils.update_vote('paul', 'paul_name', 'carl', 'seed_transaction', null, 7, "capital", "transaction"); //Generate start set IDs and replace these
    }

    //Process a vote.
    async update_vote(stamp_type, from_id, from_name, to_id, to_target, target_type, collection, negative=false, recalculate=true){
        if (to_id == stampy_id) {
            //votes for stampy do nothing
            return false;
        }
        if(to_id == from_id) {
            //votes for yourself do nothing
            return false;
        }

        let vote_strength = 0;

        if (stamp_type == "stamp") {
            vote_strength = this.red_stamp_value;
        } else if (stamp_type == "goldstamp") {
            vote_strength = this.gold_stamp_value;
        } else if (stamp_type == "halfstamp") {
			    vote_strength = this.half_red_stamp_value
		    } else if (stamp_type == "halfgoldstamp") {
		 	    vote_strength = this.half_gold_stamp_value;
		    }

        if (negative) {
            vote_strength = -vote_strength;
        }
		
        this.total_votes[collection] += vote_strength;
        await this.utils.update_vote(from_id, from_name, to_id, to_target, vote_strength, collection, target_type);
        let allUsers = [] as any;
        for (let i = 0; i < this.graphs.length; i++) {
            let users = await this.utils.get_users(this.graphs[i]);
            allUsers = [...new Set([...allUsers, ...users])];
        }
        this.utils.users = allUsers;
        await this.utils.update_ids_list();
        if (recalculate) {
            this.calculate_stamps(collection);
        }
        return true;
    }


    //Calculate the stamps each user has, given all the votes thus far.
    async calculate_stamps(collection) {
      //set up and solve the system of linear equations
      console.log("RECALCULATING STAMP SCORES");
      let allUsers = [] as any;
      for (let i = 0; i < this.graphs.length; i++) {
          let users = await this.utils.get_users(this.graphs[i]);
          allUsers = [...new Set([...allUsers, ...users])];
      }


		  this.utils.users = allUsers;
      await this.utils.update_ids_list();
		

      let targetIndex = this.utils.indices[collection];
      let user_count = Object.keys(targetIndex).length - 1;



      let users_matrix = Matrix.zeros(user_count, user_count);

      let votes = await this.utils.get_all_user_votes(collection);		



      for(let i = 0; i < votes.length; i++) {
        let from_id = votes[i]['user']; //This may change depending on the database implementation and what objects returned from the database look like
        let to_id = votes[i]['votedFor'];
        let votes_for_user = votes[i]['votecount'];
        let from_id_index = targetIndex[from_id];
        let toi = targetIndex[to_id];
        let total_votes_by_user = await this.utils.get_votes_by_user(from_id, collection);
        if (total_votes_by_user != 0) {
            let score = (this.user_karma * votes_for_user) / total_votes_by_user;
            users_matrix.set(toi, from_id_index, users_matrix.get(toi, from_id_index) + score); 
        }



      }

      for (let i = 1; i < user_count; i++) {
        users_matrix.set(i, i, -1.0);
      }


      let start_set = await this.utils.get_start_set(collection);

      let start_indices = [] as any;

      if (start_set.length == 0) {
        start_indices.push(0);
      } else {
        for (let i = 0; i < start_set.length; i++) {
          if (start_set[i] in targetIndex) {
            start_indices.push(targetIndex[start_set[i]]);
          }
        }
        if (start_indices.length == 0) {
          start_indices.push(0);
        }
      }

      for (let i = 0; i < start_indices.length; i++) {
        users_matrix.set(start_indices[i], start_indices[i], 1.0);
      }



      let user_count_matrix = Matrix.zeros(user_count, 1);
      for (let i = 0; i < start_indices.length; i++) {
        user_count_matrix.set(start_indices[i], 0, 1.0); //TODO: Is this the right dimension to use?
      }
	    this.utils.scores[collection] = solve(users_matrix, user_count_matrix).to1DArray();
		  console.log(this.utils.scores);
        //this.print_all_scores(collection);
        //done
    }

    async get_user_scores(collection) {
        let message = "Here are the users and how many stamps they're worth:\n";
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id, collection);
            message += name + ": \t" + String(stamps) + "\n";
        }
        return message;
    }

    async print_all_scores(collection) {
        let total_stamps = 0;
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id, collection);
            total_stamps += stamps;
            console.log(name + "\t" + String(stamps));
        }
        console.log("Total votes:" + String(this.total_votes));
        console.log("Total stamps:" + String(total_stamps));
    }

    //Get the stamps a user has regarding a particular trust graph.
    get_user_stamps(user, collection) {
		  if (!user) {
			  return 0;
		  }
      let index = this.utils.index_dammit(user, collection);
      console.log("get_user_stamps for " + String(user)+ ", index=" + String(index) + ", collection=" + collection);
      let stamps = 0.0; //Maybe readd nonzero predicate when seed users are figured out?
			stamps = this.utils.scores[collection][index] * this.total_votes;
	

			console.log(this.utils.scores[index]);
		  console.log(this.utils.scores);
      console.log(this.total_votes);
      return stamps;
    }

    load_votes_from_csv(collection, filename="stamps.csv") {
        let rl = readline.createInterface({
            input : f.createReadStream(File),
            output : process.stdout,
            terminal: false
        });
        let headerSkipped = false;
        rl.on('line', function (line) {
            if (! headerSkipped) {
                headerSkipped = true;
            } else {
                let line_contents = line.split(",");
                let msg_id =line_contents[0];
                let react_type = line_contents[1];
                let from_id = line_contents[2];
                let to_id = line_contents[3];
                this.update_vote(react_type, from_id, to_id, collection, false, false);
            }
        });
        this.calculate_stamps(collection);
    }

    static user_is_admin(username) {
        for(let i = 0; i < admin_usernames.length; i++) {
            if (username == admin_usernames[i]) {
                return true;
            }
            return false;
        }
    } 

}

/**
 * Example graphQL schema and resolvers generated using Vulcan declarative approach
 * http://vulcanjs.org/
 */
 const vulcanRawSchema = buildApolloSchema(models);
 console.log(vulcanRawSchema);
 const vulcanSchema = makeExecutableSchema(vulcanRawSchema);
 
 /**
  * Example custom Apollo server, written by hand
  */
 const typeDefs = gql`
   type Query {
     getUservotes(graph: String): [UserVote]
     getVotesByTarget(targets: [String], collection: String): [Int]
     updateVote(stampType: String, fromId: String, fromName: String, toId: String, toTarget: String, targetType: String, collection: String, negative: Boolean): Boolean
     updateVoteForTarget(stampType: String, fromId: String, fromName: String, toId: String, toTarget: String, collection: String, negative: Boolean): Boolean
     getUserStamps(user: String, collection: String): Float
     getContentScore(targets: [String], graph: String): [Float]
     getContentScoreGlobal(targets: [String]): [Float]
     getUserScore(user: String, graph: String): Float
     getUserScoreGlobal(user: String): Float
     saveVariable(user: String, proposalId: String, name: String, type: String, value: String) : Boolean
     calculateResult(user: String, proposalId: String, expression: String, collection: String): Float
     scoreUserByTag(user: String, collection: String, tag: String): Float
     getContentPage(first: Int, after: String, contentType: String): ContentConnection
   }
 
   type UserVote {
     _id: ID!
     user: String
     sourceName: String
     votedFor: String
     targetTransaction: String
     voteCount: Int
     targetProposal: String
   }


   type ContentConnection {
     edges: [ContentEdge]
     pageInfo: PageInfo 
   }

   type ContentEdge {
     node: String
     cursor: String
   }

   type PageInfo {
     hasPreviousPage: Boolean
     hasNextPage: Boolean
     startCursor: String
     endCursor: String
   }
    `;
 const resolvers = {
   Query: {
     getUservotes: async (obj, args, context, info) => {
       const db = mongoose.connection;
       const collection = db.collection("uservotes");
        const filteredDocs = await collection.find({graph: args.graph}).toArray();
       console.log(filteredDocs);
       return filteredDocs;
    },
     
     //Get votes for a particular piece of content
     getVotesByTarget: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       
       let resultData = [] as any;
       for (let i = 0; i < args.targets.length; i++) {
         resultData.push(await stamps.utils.get_votes_by_transaction(args.targets[i], args.collection));
       }
       return resultData;
     },
     
     //process a vote
     updateVote: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       const success = await stamps.update_vote(args.stampType, args.fromId, args.fromName, args.toId, args.toTarget, args.targetType, args.collection, args.negative); //req.query.negative is true in the case of a downvote, and false otherwise.
         return success;
     },

     //Get the stamps of a user in a particular trust graph
     getUserStamps: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       let resultData = await stamps.get_user_stamps(args.user, args.collection);
       return resultData;
     },
     
     //Get the score of a piece of content, based on the votes for it and either predictions or resolutions of it, for a specific trust graph.
     getContentScore: async (obj, args, context, info) => {
      const stamps = new StampsModule();
      await stamps.init();
      let resultData = [] as any;

      let vote_range = await stamps.utils.get_vote_range(args.graph);
      let prediction_range = await stamps.utils.get_prediction_range(args.graph);
      let resolution_range = await stamps.utils.get_resolution_range(args.graph);
      
      for (let i = 0; i < args.targets.length; i++) {
        let total_proposal_votes = await stamps.utils.get_votes_by_target(args.targets[i], args.graph);
        let normalized_proposal_votes = (total_proposal_votes - vote_range[0])/(vote_range[1] - vote_range[0]); 
        let average_impact_rating = await stamps.utils.get_average_impact_by_target(args.targets[i], args.graph);
        let all_impact_resolutions = await Utilities.Resolutions.find({contentId: args.targets[i], graph: args.graph}).toArray();
        let normalized_impact_rating;
        if (all_impact_resolutions.length > 0) {
           normalized_impact_rating = (average_impact_rating - resolution_range[0])/(resolution_range[1] - resolution_range[0]);
        } else {
           normalized_impact_rating = (average_impact_rating - prediction_range[0])/(prediction_range[1] - prediction_range[0]);
        }
        resultData.push(normalized_impact_rating + normalized_proposal_votes);
      }
  
      return resultData;
    },
    //Get the score of a user, based on the content they have created, for a specific trust graph.
    getUserScore: async (obj, args, context, info) => {
      const db = mongoose.connection;
      const stamps = new StampsModule();
      await stamps.init();
      let vote_range = await stamps.utils.get_vote_range(args.graph);
      let prediction_range = await stamps.utils.get_prediction_range(args.graph);
      let resolution_range = await stamps.utils.get_resolution_range(args.graph);
      let total_user_votes = await stamps.utils.get_votes_for_user(args.user, args.graph);
      let normalized_user_votes = (total_user_votes - vote_range[0])/(vote_range[1] - vote_range[0]); 
      let average_impact_rating = await stamps.utils.get_average_impact_by_user(args.user, args.graph);
      let all_impact_resolutions = await Utilities.Resolutions.find({user: args.user, graph: args.graph}).toArray();
      let normalized_impact_rating;
      if (all_impact_resolutions.length > 0) {
          normalized_impact_rating = (average_impact_rating - resolution_range[0])/(resolution_range[1] - resolution_range[0]);
      } else {
          normalized_impact_rating = (average_impact_rating - prediction_range[0])/(prediction_range[1] - prediction_range[0]);
      }

      let userScore = normalized_impact_rating + normalized_user_votes;
      let insertedObj = {
        user: args.user,
        graph: args.graph,
        score: userScore,
        isImpact: true
      }
      await db.collection("scores").findOneAndUpdate({user: args.user, graph: args.graph, isImpact: true}, {$set: insertedObj}, {upsert: true});
      return normalized_impact_rating + normalized_user_votes;
    },
     //Get the score of a piece of content, based on the votes for it and either predictions or resolutions of it, across all trust graphs.
     getContentScoreGlobal: async (obj, args, context, info) => {
      const stamps = new StampsModule();
      await stamps.init();
      let resultData = [] as any;

      let vote_ranges = [] as any;
      let prediction_ranges = [] as any;
      let resolution_ranges = [] as any;

      let graphs = stamps.utils.get_graphs();
      for (let i = 0; i < graphs.length; i++ ){
        vote_ranges.push(await stamps.utils.get_vote_range(args.graph));
        prediction_ranges.push(await stamps.utils.get_prediction_range(args.graph));
        resolution_ranges.push(await stamps.utils.get_resolution_range(args.graph));
      }
      
      for (let i = 0; i < args.targets.length; i++) {
        let total_proposal_votes = 0;
        let average_impact_rating = 0;
        for (let j = 0; j < graphs.length; i++) {
          let proposal_votes = await stamps.utils.get_votes_by_target(args.targets[i], graphs[j]);
          total_proposal_votes += (proposal_votes - vote_ranges[j][0])/(vote_ranges[j][1] - vote_ranges[j][0]); 
          let impact_rating = (await stamps.utils.get_average_impact_by_target(args.targets[i], graphs[j]))/graphs.length;
          let all_impact_resolutions = await Utilities.Resolutions.find({contentId: args.targets[i], graph: args.graph}).toArray();
          if (all_impact_resolutions.length > 0) {
            average_impact_rating += (impact_rating - resolution_ranges[j][0])/(resolution_ranges[j][1] - resolution_ranges[j][0]);
          } else {
            average_impact_rating = (impact_rating - prediction_ranges[j][0])/(prediction_ranges[j][1] - prediction_ranges[j][0]);
          }
        }
        resultData.push(average_impact_rating + total_proposal_votes);
      }
  
      return resultData;
    },

    //Get the score of a user, based on the content they have created, across all trust graphs.
    getUserScoreGlobal: async (obj, args, context, info) => {
      const stamps = new StampsModule();
      await stamps.init();
      let vote_ranges = [] as any;
      let prediction_ranges = [] as any;
      let resolution_ranges = [] as any;
      let graphs = stamps.utils.get_graphs();
      for (let i = 0; i < graphs.length; i++ ){
        vote_ranges.push(await stamps.utils.get_vote_range(args.graph));
        prediction_ranges.push(await stamps.utils.get_prediction_range(args.graph));
        resolution_ranges.push(await stamps.utils.get_resolution_range(args.graph));
      }
      let total_user_votes = 0;
      let average_impact_rating = 0;     
      for (let i = 0; i < graphs.length; i++) {
        let user_votes = await stamps.utils.get_votes_for_user(args.user, graphs[i]);
        total_user_votes += (user_votes - vote_ranges[i][0])/(vote_ranges[i][1] - vote_ranges[i][0]); 
        let impact_rating = (await stamps.utils.get_average_impact_by_user(args.user, graphs[i]))/graphs.length;
        let all_impact_resolutions = await Utilities.Resolutions.find({contentId: args.targets[i], graph: args.graph}).toArray();
        if (all_impact_resolutions.length > 0) {
          average_impact_rating += (impact_rating - resolution_ranges[i][0])/(resolution_ranges[i][1] - resolution_ranges[i][0]);
        } else {
          average_impact_rating = (impact_rating - prediction_ranges[i][0])/(prediction_ranges[i][1] - prediction_ranges[i][0]);
        }

      }
      return average_impact_rating + total_user_votes;
    },
    
    //Save a variable for use in a prediction.
    saveVariable: async (obj, args, context, info) => {
      const db = mongoose.connection;
      let insertedObj = {
        user: args.user,
        targetId: args.targetId,
        name: args.name,
        type: args.type,
        value: args.value
      };
      db.collection("variables").findOneAndUpdate({user: args.user, targetId: args.targetId, name: args.name}, {$set: insertedObj}, {upsert: true});
      return true;
    },
    //Calculate the result of a complex prediction, using a Guesstimate string.
    calculateResult: async(obj, args, context, info) => {


      const db = mongoose.connection;

      function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
      }

      let allRelevantVariables = await db.collection("variables").find({user: args.user, targetId: args.targetId}).toArray();

      //Finds the first variable that a Guesstimate string contains.
      const matchVariable = function(str) {
        for (let i = 0; i < allRelevantVariables.length; i++){
          const possibleVar = allRelevantVariables[i]["name"];
          if (str.includes(possibleVar)) {
            return allRelevantVariables[i];
          }
        }
        return false;
      }


      const inputString = args.expression;
      //Variable by variable, substitutes in raw expressions for variables detected in a Guesstimate string.
      const  percolateVariables = async function(str) {
        let firstFoundVariable = matchVariable(str);
        if (! firstFoundVariable) {
          return str;
        } else {
          const fullFirstVarValue : String = String(await percolateVariables(firstFoundVariable["value"]));
          const truncatedFirstVarValue = replaceAll(fullFirstVarValue, "=", "");          
          const substitutedStr = replaceAll(str, firstFoundVariable["name"], truncatedFirstVarValue);
          return await percolateVariables(substitutedStr);
        }
      }
      let fullString = await percolateVariables(inputString);
      let [error, item] = Guesstimator.parse({text: fullString});
      if (item instanceof Guesstimator) {
        let parsedInput = item.parsedInput;
        let f = new Guesstimator({ parsedError: error, parsedInput: parsedInput });
        let results = f.sample(10000);
        console.log(results);
        console.log(item);
        const sum = (previousValue, currentValue) => previousValue + currentValue;
        let assignedValue = results["values"].reduce(sum)/results["values"].length;
        db.collection("predictions").findOneAndUpdate({user: args.user, contentId: args.targetId, collection: args.collection}, {$set: {user: args.user, contentId: args.targetId, collection: args.collection, score: assignedValue}}, {upsert: true});
        return assignedValue;
      } else {
        return -999;
      }
   },

   //Get a user's score for a particular tag and collection
   scoreUserByTag: async (obj, args, context, info) => {
     const db = mongoose.connection;
     const stamps = new StampsModule();
     await stamps.init();
     const targets = await stamps.utils.get_content_by_tag(args.tag);
     let rawScores = [] as any;
     let weights = [] as any;
     for (let i = 0; i < targets.length; i++ ) {
      let target = targets[i];
      const resolvingUsers = stamps.utils.get_resolving_user_ids(target);
      const resolutions = stamps.utils.get_resolutions_by_proposal(target, args.collection);
      const predictors = stamps.utils.get_predictors_by_proposal(target, args.collection);
      let trustedResolutions = [] as any;
      for (let i = 0; i < resolutions.length; i++) {
        if (! predictors.includes(resolutions[i].user) && (!resolvingUsers || resolvingUsers.includes(resolutions[i].user)) && resolutions[i].graph == args.collection){
          trustedResolutions.push(resolutions[i]);
        }
      }

      let finalResolution = 0.0;

      for (let i = 0; i < trustedResolutions.length; i++) {
        finalResolution += parseFloat(trustedResolutions[i])/trustedResolutions.length; 
      }

      let userPrediction = (await stamps.utils.get_prediction(args.user, target)).score;

      if (userPrediction > finalResolution) {
        let ratio = finalResolution/userPrediction;
        userPrediction = 1.0;
        finalResolution = ratio;
      } else {
        let ratio = userPrediction/finalResolution;
        finalResolution = 1.0;
        userPrediction = ratio;
      }

      const finalScore = new PredictionResolutionGroup({agentPrediction: {data: userPrediction, dataType: 'percentage'}, resolution: {data: finalResolution, dataType: 'percentage'}, marketPrediction: null});
      let avgscore = finalScore.pointScore(nonMarketScore);

      if ('data' in avgscore) {
        rawScores.push(avgscore.data);
      } else {
        console.log(avgscore.error);
        continue;
      }

      weights.push(await stamps.utils.get_tag_count(args.tag, target));
      console.log(weights);
    }

    let totalWeights = weights.reduce((a, b) => a + b);

    let finalScore = 0.0;

    for (let i = 0; i < weights.length; i++) {
      finalScore += rawScores[i] * weights[i]/totalWeights;
    }
    db.collection("scores").findOneAndUpdate({user: args.user, tag: args.tag, graph: args.collection}, {$set: {user: args.user, tag: args.tag, graph: args.collection, score: finalScore, isImpact: false}}, {upsert: true});
    return finalScore;
  },
  //Generate a page of content.
  getContentPage: async (obj, args, context, info) => {
    let first = args.first;
    let after = args.after;
    let contentType = args.contentType;
    const db = mongoose.connection;
    let allContent = await db.collection("contents").find({contentType: contentType}).sort({createdAt: -1}).toArray();
    let allEdges = allContent.map(function (item) { 
      return {node: item._id, cursor: item.createdAt.toString()}
    });

    const applyCursorsToEdges = function(allEdges, after) {
      let edges = allEdges;
      let afterEdge = allEdges.filter(function(edge) { return edge.cursor == after})[0];
      if (afterEdge) {
        edges = edges.slice(edges.indexOf(afterEdge) + 1)
      }
      return edges;
    }

    const edgesToReturn = function(allEdges, first, after) {
      let edges = applyCursorsToEdges(allEdges, after);
      if(first){
        if(first < 0) {
          throw Error("First below zero!");
        } else {
          return edges.slice(0, first);
        }
      }

      return edges;
    }

    let finalEdges = edgesToReturn(allEdges, first, after);

    return {
      edges: finalEdges,

      pageInfo: {
        startCursor: finalEdges[0].cursor,
        endCursor: finalEdges[finalEdges.length - 1].cursor,
        hasPreviousPage: allEdges.indexOf(finalEdges[0]) > first,
        hasNextPage: allEdges.indexOf(finalEdges[finalEdges.length - 1]) < allEdges.length - first
      }
    }


  },

  getTrainingEffectiveness: async (obj, args, context, info) => {
    const db = mongoose.connection;
    const stamps = new StampsModule();
    await stamps.init();
    let trainingId = args.training;
    let training = await db.collection("training").find({_id: trainingId}).toArray()[0];
    let viewedUsers = training.viewedUsers.split(",");
    let nonViewedUsers = (await stamps.utils.get_users(args.graph)).filter(user => ! (user in viewedUsers));


    //TODO: do some kind of statistical analysis to find how effective the training is.

    
  }
    
 }
 };
 const customSchema = makeExecutableSchema({ typeDefs, resolvers });
 // NOTE: schema stitching can cause a bad developer experience with errors
 export const mergedSchema = mergeSchemas({ schemas: [vulcanSchema, customSchema] });
 
 const mongoUri = process.env.MONGO_URI;
 if (!mongoUri) throw new Error("MONGO_URI env variable is not defined");
 
 // Define the server (using Express for easier middleware usage)
 const server = new ApolloServer({
   schema: mergedSchema,
   context: ({ req }) => contextFromReq(req as Request),
   introspection: process.env.NODE_ENV !== "production",
   playground:
     process.env.NODE_ENV !== "production"
       ? {
           settings: {
             "request.credentials": "include",
           },
         }
       : false,
 });

 cron.schedule('0 0 0 * * *', async () => {
   const db = mongoose.connection;
   const stamps = new StampsModule();
   await stamps.init();
   let allScores = await db.collection("scores").find({}).toArray();
   for (let i = 0; i < allScores.length; i++) {
     allScores[i].createdAt = new Date();
     await db.collection("pastscores").insertOne(allScores[i]);
   }
 })
 
 const app = express();
 
 app.set("trust proxy", true);
 
 const gqlPath = "/api/graphql";
 // setup cors
 app.use(gqlPath, cors(corsOptions));
 // init the db
 app.use(gqlPath, mongoConnection(mongoUri));
 
 server.applyMiddleware({ app, path: "/api/graphql" });
 
 export default app;
 
 export const config = {
   api: {
     bodyParser: false,
   },
 };
 
 export const testServer = server;
 
 // Seed in development
 runSeed();
 