import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";
import { User } from "./user.server";
import { Content } from "./content.server";



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
      canCreate: ["members", "guests"]
    },
    // userId is the _id of the owner of the document
    // Here, it guarantees that the user belongs to group "owners" for his own data
    userId: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members", "guests"]

    },

    //This name will be the value's graph field in uservotes.
    name: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"]
    },


    createdAt: {
      type: Date,
      optional: true,
      canRead: ["admins"],
      onCreate: () => {
        return new Date();
      },
      canCreate: ["members", "guests"]

    },


    creator: {
      type: String,
      relation: {
        fieldName: "user",
        kind: "hasOne",
        model: User,
        typeName: "VulcanUser",
      },
      optional: true,
      canRead: ["guests"],
      canCreate: ["members", "guests"]

    },

    description: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"]
    },
    //Refers to any parent goal that this goal has, by ID.
    parentGoal: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"]
    },

    isComplete: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"],
        canUpdate: ["members"]
    },

    isArchived: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"],
        canUpdate: ["members"]
    },

    deadline: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"],
    },

    //External ID from the contents table maps here.
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
        canCreate: ["members", "guests"]
    },
    
    //TODO: auto-modify this depending on votes on the goal? Or track how much people trust it to represent each value?
    //Comma-separated.
    //Maybe remove this field, and instead fetch votecounts on each value?
    values: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members", "guests"],
        canUpdate: ["members"]
    },

    associatedContents: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members", "guests"],
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
      canCreate: ["members", "guests"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Goal = createGraphqlModelServer(modelDef);

  export const GoalConnector = createMongooseConnector<GoalTypeServer>(Goal);

