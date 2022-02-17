import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";


  export interface TrainingTypeServer extends VulcanDocument {
    creator?: string;
    trainingId?: string;
    description?: string;
    viewedUsers?: string;
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

    //This ID is referenced in the externalId of any content of type 'chat'.

    trainingId: {
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


    //the content of the training itself.
    description: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    //This is the comma-separated list of users who have viewed this training, added to when a user does so.
    viewedUsers: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"],
        canUpdate: ["members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Training",
    graphql: {
      typeName: "Training",
      multiTypeName: "Trainings",
    },
    schema,
    permissions: {
      canCreate: ["members"], // Users should be able to create contents
      canUpdate: ["members"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Training = createGraphqlModelServer(modelDef);

  export const TrainingConnector = createMongooseConnector<TrainingTypeServer>(Training);

