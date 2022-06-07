import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";
import { User } from "./user.server";
import { Content } from "./content.server";


  export interface ResolutionTypeServer extends VulcanDocument {
    user?: string;
    contentId?: string;
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
      canCreate: ["members"],
    },
  
    //The piece of content being resolved.
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


    score: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    //The trust graph this resolution is associated with.
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

