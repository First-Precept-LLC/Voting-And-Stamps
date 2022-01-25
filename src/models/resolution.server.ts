import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";


  export interface ResolutionTypeServer extends VulcanDocument {
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
    user: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"],
    },
  
    proposalId: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    },

    collection: {
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
    graph: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    }
  };

  export const resolutionDef: CreateGraphqlModelOptionsServer = {
    name: "Resolution",
    graphql: {
      typeName: "Resolution",
      multiTypeName: "Resolutions",
    },
    schema,
    permissions: {
      canCreate: ["members"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Resolution = createGraphqlModelServer(resolutionDef);

  export const ResolutionConnector = createMongooseConnector<ResolutionTypeServer>(Resolution);

