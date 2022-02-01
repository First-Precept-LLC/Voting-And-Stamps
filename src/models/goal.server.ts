import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";



  export interface GoalTypeServer extends VulcanDocument {
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
    //Refers to any parent goal that this goal has, by ID.
    parentGoal: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    isComplete: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["members"]
    },

    isArchived: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["members"]
    },

    deadline: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
    },

    //External ID from the contents table maps here.
    contentId: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },
    
    //TODO: auto-modify this depending on votes on the goal? Or track how much people trust it to represent each value?
    //Comma-separated.
    values: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["members"]
    },

    associatedContents: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"],
      canUpdate: ["members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Goal",
    graphql: {
      typeName: "Goal",
      multiTypeName: "Goals",
    },
    schema,
    permissions: {
      canCreate: ["members"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Goal = createGraphqlModelServer(modelDef);

  export const GoalConnector = createMongooseConnector<GoalTypeServer>(Goal);

