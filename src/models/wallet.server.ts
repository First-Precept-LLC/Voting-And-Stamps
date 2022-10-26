import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";

import { createMongooseConnector } from "@vulcanjs/mongo";
import { Org } from "./org.server";


export interface WalletTypeServer extends VulcanDocument {
    vulcanId?: string;
    auroraWallet?: string;
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

    vulcanId: {
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

    auroraWallet: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["guests","members"]
  
    },
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Wallet",
    graphql: {
      typeName: "Wallet",
      multiTypeName: "Wallets",
    },
    schema,
    permissions: {
      canCreate: ["guests","members","owners", "admins"], 
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["guests","members", "admins"],
    },
  };

  export const Wallet = createGraphqlModelServer(modelDef);

  export const ProjConnector = createMongooseConnector<WalletTypeServer>(Wallet);