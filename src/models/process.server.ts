import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";

import { createMongooseConnector } from "@vulcanjs/mongo";
import { ProcessTemplate } from "./process_template.server";

export interface ProcessTypeServer extends VulcanDocument {
    name?: string;
    parentProcessTemplate?: string;
    progress?: number;
    status?: string;
    dueDate?: Date;
    userId?: string;
    //TODO: add user?
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

    parentProcessTemplate: {
        type: String,
        relation: {
          fieldName: "processTemplate",
          kind: "hasOne",
          model: ProcessTemplate,
          typeName: "ProcessTemplate",
        },
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
  
    },

    dueDate: {
        type: Date,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },

    status: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    },

    progress: {
        type: Number,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Process",
    graphql: {
      typeName: "Process",
      multiTypeName: "Processes",
    },
    schema,
    permissions: {
      canCreate: ["guests","members","owners", "admins"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["guests","members", "admins"],
    },
  };

  export const Process = createGraphqlModelServer(modelDef);

  export const ProcessConnector = createMongooseConnector<ProcessTypeServer>(Process);