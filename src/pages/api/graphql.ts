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
import { Utilities, StampsModule } from "./stamp-utils";
import models from "~/models/index.server";

// will trigger seed
import runSeed from "~/lib/api/runSeed";
//import { PredictionResolutionGroup, nonMarketScore } from "~/lib/prediction-analysis/src/index";

//import { Guesstimator } from "~/lib/guesstimator/src/index";
import user from "./account/user";

const stampy_id = "stampy";
const {Matrix, solve} = require('ml-matrix');



//const readline = require('readline');
//const fs = require('fs');
const cron = require('node-cron');



const admin_usernames = []; //Either fill with admins, or remove




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
     getVotesByTarget(targets: [String], collection: String): [Int]
     updateVote(stampType: String, fromId: String, fromName: String, toId: String, toTarget: String, targetType: String, collection: String, negative: Boolean): Boolean
     updateVoteForTarget(stampType: String, fromId: String, fromName: String, toId: String, toTarget: String, collection: String, negative: Boolean): Boolean
     getUserStamps(user: String, collection: String): Float
     getContentScore(targets: [String], graph: String): [Float]
     getContentScoreGlobal(targets: [String]): [Float]
     getUserScore(user: String, graph: String): Float
     getUserScoreGlobal(user: String): Float
     getTrainingEffectiveness(training: String, graph: String): Float
     saveVariable(user: String, proposalId: String, name: String, type: String, value: String) : Boolean
     calculateResult(user: String, proposalId: String, expression: String, collection: String): Float
     scoreUserByTag(user: String, collection: String, tag: String): Float
     getContentPage(first: Int, after: String, contentType: String): ContentConnection
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
 export const resolvers = {
   Query: {
     
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
      let all_impact_resolutions = await Utilities.Resolutions.find({creator: args.user, graph: args.graph}).toArray();
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
      await db.collection("scores").findOneAndUpdate({scorerId: args.user, graph: args.graph, isImpact: true}, {$set: insertedObj}, {upsert: true});
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
    /*calculateResult: async(obj, args, context, info) => {


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
   },*/

   //Get a user's score for a particular tag and collection
   /*scoreUserByTag: async (obj, args, context, info) => {
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
        if (! predictors.includes(resolutions[i].creator) && (!resolvingUsers || resolvingUsers.includes(resolutions[i].creator)) && resolutions[i].graph == args.collection){
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
    db.collection("scores").findOneAndUpdate({scorerId: args.user, tag: args.tag, graph: args.collection}, {$set: {user: args.user, tag: args.tag, graph: args.collection, score: finalScore, isImpact: false}}, {upsert: true});
    return finalScore;
  },
  */
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

 console.log("huh?")

 let task = cron.schedule('0 * * * * *', async () => {
   console.log("aiee!")
   const db = mongoose.connection;
   let allScores = await db.collection("scores").find({}).toArray();
   for (let i = 0; i < allScores.length; i++) {
     console.log(i);
     allScores[i].createdAt = new Date();
     await db.collection("pastscores").insertOne(allScores[i]);
   }
 });

 task.start();


 
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
 