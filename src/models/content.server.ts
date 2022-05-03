import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";
import { User } from "./user.server";


  export interface ContentTypeServer extends VulcanDocument {
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

    //This ID is used to map to the data specific to this type of content, rather than the data here that all content has.
    //Can be used to index into other databases.
    externalId: {
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
      type: User,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]

    },
  
    name: {
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

    contentType: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },


    //The users trusted to produce resolutions of the effect of this piece of content.
    //By default, all users are so trusted.
    resolvingUsers: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Content",
    graphql: {
      typeName: "Content",
      multiTypeName: "Contents",
    },
    schema,
    permissions: {
      canCreate: ["members"], // Users should be able to create contents
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Content = createGraphqlModelServer(modelDef);

  export const ContentConnector = createMongooseConnector<ContentTypeServer>(Content);

