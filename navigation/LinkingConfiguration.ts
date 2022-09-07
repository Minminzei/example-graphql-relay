/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "./types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Chats: {
            path: "/",
          },
          Profile: {
            screens: {
              User: {
                path: "profile",
              },
              Chat: {
                path: "myChats",
              },
            },
          },
        },
      },
      ChatCreate: {
        path: "chat/create",
      },
      Chat: {
        path: "chat/:id",
        parse: {
          id: String,
        },
      },
      User: {
        path: "user/:id",
        parse: {
          id: String,
        },
      },
    },
  },
};

export default linking;
