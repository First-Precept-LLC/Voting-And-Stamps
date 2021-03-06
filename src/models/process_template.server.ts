import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";

import { createMongooseConnector } from "@vulcanjs/mongo";
import { Proj } from "./proj.server";

export interface ProcessTemplateTypeServer extends VulcanDocument {
    name?: string;
    parentProject?: string;
    estimatedDuration?: string;
    description?: string;
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
    userId: {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["guests","members"]

    },

    name: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
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

    parentProject: {
        type: String,
        relation: {
          fieldName: "proj",
          kind: "hasOne",
          model: Proj,
          typeName: "Proj",
        },
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
  
    },

    estimatedDuration: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },

    description: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "ProcessTemplate",
    graphql: {
      typeName: "ProcessTemplate",
      multiTypeName: "ProcessTemplates",
    },
    schema,
    permissions: {
      canCreate: ["guests","members","owners", "admins"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["guests","members", "admins"],
    },
  };

  export const ProcessTemplate = createGraphqlModelServer(modelDef);

  export const ProcessTemplateConnector = createMongooseConnector<ProcessTemplateTypeServer>(ProcessTemplate);