import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";

import { createMongooseConnector } from "@vulcanjs/mongo";
import { Org } from "./org.server";


export interface PuserTypeServer extends VulcanDocument {
    name?: string;
    role?: string;
    levelUp?: string;
    department?: string;


    parentId?: string;
  }

  
  export const schema: VulcanGraphqlSchemaServer = {
    // _id, userId, and createdAT are basic field you may want to use in almost all schemas
    _id: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["guests","members"]
    },
    // userId is the _id of the owner of the document
    // Here, it guarantees that the user belongs to group "owners" for his own data
   

    name: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },

    role: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },
    
    levelUp: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },

    department: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },
   

  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Puser",
    graphql: {
      typeName: "Puser",
      multiTypeName: "Pusers",
    },
    schema,
    permissions: {
      canCreate: ["guests","members","owners", "admins"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["guests","members", "admins"],
    },
  };

  export const Puser = createGraphqlModelServer(modelDef);

  export const PuserConnector = createMongooseConnector<PuserTypeServer>(Puser);