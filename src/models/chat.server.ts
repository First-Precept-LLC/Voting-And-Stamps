import { VulcanDocument } from "@vulcanjs/schema";
import {
    CreateGraphqlModelOptionsServer,
    createGraphqlModelServer,
    VulcanGraphqlSchemaServer,
  } from "@vulcanjs/graphql/server";
  import { createMongooseConnector } from "@vulcanjs/mongo";
import { User } from "./user.server";


  export interface ChatTypeServer extends VulcanDocument {
    creator?: string;
    chatId?: string;
    description?: string;
    subject?: string;
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

    chatId: {
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
      relation: {
        fieldName: "user",
        kind: "hasOne",
        model: User,
        typeName: "VulcanUser",
      },
      optional: true,
      canRead: ["guests"],
      canCreate: ["members"]

    },


    //the content of the message itself.
    description: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    //This is either the id of another chat message, if this is a reply, or the id of a non-chat piece of content.
    //Which of the two it is depends on the isBase field.
    subject: {
        type: String,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    },

    isBase: {
        type: Boolean,
        optional: true,
        canRead: ["guests"],
        canCreate: ["members"]
    }
  };

  export const modelDef: CreateGraphqlModelOptionsServer = {
    name: "Chat",
    graphql: {
      typeName: "Chat",
      multiTypeName: "Chats",
    },
    schema,
    permissions: {
      canCreate: ["members"], // Users should be able to create contents
      canUpdate: ["owners", "admins"],
      canDelete: ["owners", "admins"],
      canRead: ["members", "admins"],
    },
  };

  export const Chat = createGraphqlModelServer(modelDef);

  export const ChatConnector = createMongooseConnector<ChatTypeServer>(Chat);

