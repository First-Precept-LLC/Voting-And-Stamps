import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";


  export interface ValueTypeServer extends VulcanDocument {
    proposer?: string;
    proposalId?: string;
    description?: string;
    resolvingUsers?: string;
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

    //This name will be the value's graph field in uservotes.
    name: {
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


    creator: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]

    },

    description: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    //TODO: store image fields
    image: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },


    //Users who begin with stamps for this value. If unset, defaults to the creator. Comma-separated IDs.
    startSet: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Value",
    graphql: {
      typeName: "Value",
      multiTypeName: "Values",
    },
    schema,
    permissions: {
      canCreate: ["members"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Value = createGraphqlModelServer(modelDef);

  export const ValueConnector = createMongooseConnector<ValueTypeServer>(Value);

