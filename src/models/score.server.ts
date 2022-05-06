import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";
import { User } from "./user.server";


  export interface ScoreTypeServer extends VulcanDocument {
    user?: string;
    score?: number;
    graph?: string;
    tag?: string;
    isImpact?: boolean;
  }

  
  export const schema: VulcanGraphqlSchemaServer = {
    // _id, userId, and createdAT are basic field you may want to use in almost all schemas
    _id: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },
    // userId is the _id of the owner of the document
    // Here, it guarantees that the user belongs to group "owners" for his own data
    userId: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },
    createdAt: {
      type: Date,
      optional: true,
      canRead: ["admins"],
      canCreate: ["members"],
      onCreate: () => {
        return new Date();
      },
    },
    scorerId: {
      type: String,
      relation: {
        fieldName: "user",
        kind: "hasOne",
        model: User,
        typeName: "User",
      },
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"],
    },
  
    tag: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },


    score: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    //The trust graph this score is associated with.
    graph: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },

    isImpact: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
      },
  };

  export const scoreDef: CreateGraphqlModelOptionsServer = {
    name: "Score",
    graphql: {
      typeName: "Score",
      multiTypeName: "Scores",
    },
    schema,
    permissions: {
      canCreate: ["members"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Score = createGraphqlModelServer(scoreDef);

  export const ScoreConnector = createMongooseConnector<ScoreTypeServer>(Score);

