import React, { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { View } from "@components/atoms/Themed";
import {
  useFragment,
  usePaginationFragment,
  useMutation,
  graphql,
  ConnectionHandler,
} from "react-relay/hooks";
import { PagingChats } from "@constants/App";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import Icons from "@constants/Icons";
import Dialog from "@components/atoms/Dialog";
import Spacer from "@components/atoms/Spacer";
import Guide from "@components/atoms/Guide";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { navigate } from "@navigation/navigator";
import { ProfileChats_list$key } from "@generated/ProfileChats_list.graphql";
import { ProfileChats_viewer$key } from "@generated/ProfileChats_viewer.graphql";
import { ProfileChatsemoveMutation } from "@generated/ProfileChatsemoveMutation.graphql";
import Button from "@components/atoms/Button";
import Loading from "@components/atoms/Loading";
import message, { MessageData } from "@recoil/message";
import ChatItem from "@components/organisms/ProfileChat/ProfileChatItem";

const profileChatsChatList = graphql`
  fragment ProfileChats_list on Query
  @refetchable(queryName: "ProfileChats_list_pagination")
  @argumentDefinitions(
    after: { type: "String" }
    first: { type: "Int!" }
    user_id: { type: "ID!" }
  ) {
    chats(first: $first, after: $after, user_id: $user_id)
      @connection(key: "ProfileChats_chats") {
      edges {
        node {
          id
          ...ProfileChatItem_chat
        }
      }
    }
  }
`;

const profileChatsUser = graphql`
  fragment ProfileChats_viewer on User {
    id
  }
`;

const chatMessageMutation = graphql`
  mutation ProfileChatsemoveMutation(
    $input: RemoveChatInput!
    $connections: [ID!]!
  ) {
    removeChat(input: $input) {
      __typename
      ... on RemoveChatId {
        removeChatId @deleteEdge(connections: $connections)
      }
      ... on RemoveChatError {
        message
      }
    }
  }
`;

export default function ProfileChats({
  chatFramgent,
  viewerFragment,
}: {
  chatFramgent: ProfileChats_list$key;
  viewerFragment: ProfileChats_viewer$key;
}) {
  const { data, refetch } = usePaginationFragment(
    profileChatsChatList,
    chatFramgent
  );

  const { id: viewerId } = useFragment<ProfileChats_viewer$key>(
    profileChatsUser,
    viewerFragment
  );
  const [commit] = useMutation<ProfileChatsemoveMutation>(chatMessageMutation);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { set: setMessage } = message();

  async function remove(): Promise<void> {
    if (!removeId) {
      return;
    }
    setLoading(true);
    setRemoveId(null);
    const connectionId = ConnectionHandler.getConnectionID(
      "root",
      "Chats_chats"
    );

    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            id: removeId,
            user_id: viewerId,
          },
          connections: [connectionId],
        },
        onCompleted({ removeChat }) {
          if (removeChat.__typename === "RemoveChatError") {
            setMessage(
              new MessageData({
                message: removeChat.message,
                error: true,
              })
            );
          } else {
            setMessage(
              new MessageData({
                message: "削除しました",
                mode: "toast",
              })
            );
            // TODO: チャット一覧 @connection(key: "Chats_chats")からは削除できるが、
            // プロフィール＞チャット一覧 @connection(key: "ProfileChats_chats") からは削除できないので、refetchする。
            // 複数のコネクションから、削除する方法は要調査。
            refetch(
              { first: PagingChats },
              {
                fetchPolicy: "network-only",
              }
            );
          }
          resolve();
        },
      });
    });
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.chats?.edges}
        renderItem={({ item }) =>
          item?.node ? (
            <ChatItem chatFragment={item.node} onRemove={setRemoveId} />
          ) : null
        }
        ListEmptyComponent={() => (
          <View>
            <Spacer height={16} />
            <Guide title="チャットを所持していません。新しく作成しますか？" />
            <Spacer height={24} />
            <View style={styles.button}>
              <Button
                title="チャットを作成する"
                onPress={() => navigate("ChatCreate")}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item?.node.id || ""}
      />
      <TouchableOpacity
        style={styles.create}
        onPress={() => navigate("ChatCreate")}
      >
        <Icon name={Icons.add} size={24} color={Colors.white} />
      </TouchableOpacity>
      {removeId && (
        <Dialog
          message="このチャットを削除しますか？"
          confirmText="削除する"
          onConfirm={remove}
          onClose={() => setRemoveId(null)}
        />
      )}
      {loading && <Loading mask />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
  },
  info: {
    flex: 1,
  },
  title: {
    ...Fonts.lg,
  },
  link: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  create: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
