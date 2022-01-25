import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";


  export interface ModelTypeServer extends VulcanDocument {
    user?: string;
    proposalId?: string;
    score?: string;
    collection?: string;
  }

  
  export const schema: VulcanGraphqlSchemaServer = {
    // _id, userId, and createdAT are basic field you may want to use in almost all schemas
    _id: {
      type: String,
      optional: true,
      canRead: ["guests"],
    },
    // userId is the _id of the owner of the document
    // Here, it guarantees that the user belongs to group "owners" for his own data
    userId: {
      type: String,
      optional: true,
      canRead: ["guests"],
    },
    createdAt: {
      type: Date,
      optional: true,
      canRead: ["admins"],
      onCreate: () => {
        return new Date();
      },
    },
    user: {
      type: String,
      optional: true,
      canRead: ["guests"]
    },
  
    proposalId: {
      type: String,
      optional: true,
      canRead: ["guests"]
    },

    collection: {
        type: String,
        optional: true,
        canRead: ["guests"]
    },

    score: {
        type: Number,
        optional: true,
        canRead: ["guests"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Model",
    graphql: {
      typeName: "Model",
      multiTypeName: "Model",
    },
    schema,
    permissions: {
      canCreate: ["owners, admins"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Model = createGraphqlModelServer(modelDef);

  export const ModelConnector = createMongooseConnector<ModelTypeServer>(Model);

