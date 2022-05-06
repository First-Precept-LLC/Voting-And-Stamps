import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";
  import { User } from "./user.server";
import { Content } from "./content.server";


  export interface PredictionTypeServer extends VulcanDocument {
    user?: string;
    proposalId?: string;
    score?: number;
    collection?: string;
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
      onCreate: () => {
        return new Date();
      },
      canCreate: ["members"]
    },
    user: {
      type: String,
      relation: {
        fieldName: "predictor",
        kind: "hasOne",
        model: User,
        typeName: "User",
      },
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },
  
    //The piece of content being predicted.
    contentId: {
      type: String,
      relation: {
        fieldName: "content",
        kind: "hasOne",
        model: Content,
        typeName: "Content",
      },
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },

    //The trust graph this prediction is associated with.
    collection: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    //The actual number being predicted. Typically calculated using a Guesstimate 
    score: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Prediction",
    graphql: {
      typeName: "Prediction",
      multiTypeName: "Predictions",
    },
    schema,
    permissions: {
      canCreate: ["members"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Prediction = createGraphqlModelServer(modelDef);

  export const PredictionConnector = createMongooseConnector<PredictionTypeServer>(Prediction);

