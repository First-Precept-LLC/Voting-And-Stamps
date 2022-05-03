import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";
import { User } from "./user.server";
import { Content } from "./content.server";


  export interface UserVoteTypeServer extends VulcanDocument {
    user?: string;
    votedFor?: string;
    toProposal?: string;
    toTransaction?: string;
    votecount?: number;
    graph?: string;
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
      type: User,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]

    },
  
    votedFor: {
      type: User,
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]

    },

    targetTransaction: {
        type: Content,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]

    },

    targetProposal: {
        type: Content,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]

    },

    votecount: {
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

    },
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "userVote",
    graphql: {
      typeName: "UserVote",
      multiTypeName: "UserVotes",
    },
    schema,
    permissions: {
      canCreate: ["members"], // Users should be able to vote
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const UserVote = createGraphqlModelServer(modelDef);

  export const UserVoteConnector = createMongooseConnector<UserVoteTypeServer>(UserVote);

