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
import { PredictionResolutionGroup, PredictionResolutionOverTime, nonMarketScore } from "~/lib/prediction-analysis/src/index";

import { Guesstimator } from "~/lib/guesstimator/src/index";
import { delBasePath } from "next/dist/shared/lib/router/router";
import { Calculate } from "@mui/icons-material";
import { anyTypeAnnotation } from "@babel/types";

const stampy_id = "stampy";

const {Matrix, solve} = require('ml-matrix');

const readline = require('readline');
const f = require('fs');



const admin_usernames = []; //Either fill with admins, or remove



class Utilities {

    static DB_PATH;

    static __instance;
    static db;
    static client;
    

    static users;
    static ids;
    static indices;
    static scores;
    static UserVotes;
    static Predictions;
    static Resolutions;
    static ProposalTags;


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
        Utilities.scores = {};
        Utilities.indices = {};
    }

    static async clearVotes() {
        await Utilities.UserVotes.deleteMany({});
    }

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
    //A series of databse functions follow. Modify based on db implementation.
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

  static async get_votes_by_user(userwallet, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({user: userwallet, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }

  static async get_votes_for_user(userwallet, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({votedFor: userwallet, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }

  static async get_votes_by_target(target, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({target: target, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }

  static async get_total_votes(collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }

  static async get_all_user_votes(collection){
		let targetTable = Utilities.UserVotes;
    return await targetTable.find({graph: collection}).toArray();
  }

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

  static async get_graphs() {
    let targetTable = Utilities.UserVotes;
    return targetTable.distinct("graph", {});
  }

  static async get_content_types() {
    let targetTable = Utilities.UserVotes;
    return targetTable.distinct("targetType", {});
  }

  static async get_resolutions_by_target(target, collection){
		let targetTable = Utilities.Resolutions;
    let allResolutions = await targetTable.find({targetId: target, collection: collection}).toArray();
    return allResolutions;
  }

  static async get_predictors_by_target(target, collection){
		let targetTable = Utilities.Predictions;
    let allPredictions = await targetTable.find({contentId: target, collection: collection}).toArray();
    return allPredictions.map(prediction => prediction.user);
  }

  static async get_resolving_user_ids(target, targetType) {
		let targetTable = Utilities.db.collection("contents");
    let targetProposal = (await targetTable.find({_id: target, contentType: targetType}).toArray())[0];
    if (! targetProposal.resolvingUsers) {
      return [];
    } else {
      return targetProposal.resolvingUsers.split(",");
    }
  }

  static async get_content_by_tag(tag) {
    let targetTable = Utilities.ProposalTags;
    let targetTags = await targetTable.find({tagName: tag}).toArray();
    return targetTags.map(tag => tag.id);
  }

  static async get_tag_count(tag, id) {
    let targetTable = Utilities.ProposalTags;
    let targetTags = await targetTable.find({tagName: tag, id: id}).toArray();
    return targetTags.length;
  }

  static async get_prediction(user, id) {
    let targetTable = Utilities.Predictions;
    let finalPredictions = await targetTable.find({user: user, contentId: id}).toArray();
    return finalPredictions[0];
  }
	
  static async get_average_impact_by_target(id) {
		let all_impact_votes = await Utilities.Predictions.find({contentId: id}).toArray();
    let all_impact_resolutions = await Utilities.Resolutions.find({contentId: id}).toArray();
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
	
	static async get_average_impact_by_user(userwallet) {
    let user_content = await Utilities.db.collection("contents").find({creator: userwallet}).toArray();
    console.log(user_content);
    
		let total = 0;
		if (user_content.length < 1) {
			return 0;
		}
		for (let i = 0; i < user_content.length; i++) {
			total += await this.get_average_impact_by_target(user_content[i]._id);
		}
		return total/user_content.length;
	}
	

}

class StampsModule {
    utils: any;
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
            console.log(users_matrix);
            console.log(toi);
            console.log(from_id_index);
            console.log(users_matrix.get(toi, from_id_index));
            users_matrix.set(toi, from_id_index, users_matrix.get(toi, from_id_index) + score); 
        }



      }

      for (let i = 1; i < user_count; i++) {
        users_matrix.set(i, i, -1.0);
      }

      users_matrix.set(0, 0, 1.0);


      let user_count_matrix = Matrix.zeros(user_count, 1);
      user_count_matrix.set(0, 0, 1.0); //God has 1 karma
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
 
 /*function normal(mu, sigma, nsamples){
   if(!nsamples) nsamples = 6
   if(!sigma) sigma = 1
   if(!mu) mu=0
 
   var run_total = 0
   for(var i=0 ; i<nsamples ; i++){
      run_total += Math.random()
   }
 
   return sigma*(run_total - nsamples/2)/(nsamples/2) + mu
 }*/
 
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
     getContentScore(targets: [String]): [Float]
     getUserScore(user: String): Float
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
     
     getVotesByTarget: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       
       let resultData = [] as any;
       for (let i = 0; i < args.targets.length; i++) {
         resultData.push(await stamps.utils.get_votes_by_transaction(args.targets[i], args.collection));
       }
       return resultData;
     },
     
     updateVote: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       if (! args.toTransaction) {
           args.toTransaction = null;
       }
       if (! args.toProposal) {
         args.toProposal = null;
       }
       const success = await stamps.update_vote(args.stampType, args.fromId, args.fromName, args.toId, args.toTarget, args.targetType, args.collection, args.negative); //req.query.negative is true in the case of a downvote, and false otherwise.
         return success;
     },
     
     updateVoteForTarget: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       const success = await stamps.update_vote(args.stampType, args.fromId, args.fromName, args.toId, args.toTarget, args.collection, args.negative);
         return success;
     },
     
     getUserStamps: async (obj, args, context, info) => {
       const stamps = new StampsModule();
       await stamps.init();
       let resultData = await stamps.get_user_stamps(args.user, args.collection);
       return resultData;
     },
     

     getContentScore: async (obj, args, context, info) => {
      const stamps = new StampsModule();
      await stamps.init();
      let resultData = [] as any;
      
      for (let i = 0; i < args.targets.length; i++) {
        let graphs = stamps.utils.get_graphs();
        let total_proposal_votes = 0;
        for (let j = 0; j < graphs.length; i++) {
          total_proposal_votes += await stamps.utils.get_votes_by_target(args.targets[i], graphs[j]);
        }
        let average_impact_rating = await stamps.utils.get_average_impact_by_target(args.targets[i]);
        resultData.push(average_impact_rating + total_proposal_votes);
      }
  
      return resultData;
    },
    
    getUserScore: async (obj, args, context, info) => {
      const stamps = new StampsModule();
      await stamps.init();
      let graphs = stamps.utils.get_graphs();
      let total_user_votes = 0;     
      for (let i = 0; i < graphs.length; i++) {
        total_user_votes += await stamps.utils.get_votes_for_user(args.user, graphs[i]);
      }
      let average_impact_rating = await stamps.utils.get_average_impact_by_user(args.user);
      return average_impact_rating + total_user_votes;
    },

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

    calculateResult: async(obj, args, context, info) => {


      const db = mongoose.connection;

      const getVariable = async function(name) {
        return await db.collection("variables").find({user: args.user, name: name, targetId: args.targetId}).toArray()[0];
      }

      function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
      }

      let allRelevantVariables = await db.collection("variables").find({user: args.user, targetId: args.targetId}).toArray();
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
     console.log("initting!");
     await stamps.init();
     const targets = await stamps.utils.get_content_by_tag(args.tag);
     console.log(targets);
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
    db.collection("users").findOneAndUpdate({user: args.user, tag: args.tag, collection: args.collection}, {$set: {user: args.user, tag: args.tag, collection: args.collection, score: finalScore}}, {upsert: true});
    return finalScore;
  },
  
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
 