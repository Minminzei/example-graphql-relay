import { GraphQLObjectType } from "graphql";
import node from "@api/resolver/query/node";
import user from "@api/resolver/query/user";
import chat from "@api/resolver/query/chat";
import chats from "@api/resolver/query/chats";
import viewer from "@api/resolver/query/viewer";
import viewerChats from "@api/resolver/query/viewerChats";
import updateProfile from "@api/resolver/mutation/updateProfile";
import createChat from "@api/resolver/mutation/createChat";
import removeChat from "@api/resolver/mutation/removeChat";
import createPost from "@api/resolver/mutation/createPost";
import removePost from "@api/resolver/mutation/removePost";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    node,
    user,
    chat,
    chats,
    viewer,
    viewerChats,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updateProfile,
    createChat,
    removeChat,
    createPost,
    removePost,
  },
});

export { query, mutation };
