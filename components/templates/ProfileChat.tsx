import React, { useState } from "react";
import { StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, useMutation, graphql } from "react-relay/hooks";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import Icons from "@constants/Icons";
import Dialog from "@components/atoms/Dialog";
import Spacer from "@components/atoms/Spacer";
import Guide from "@components/atoms/Guide";
import Ripple from "react-native-material-ripple";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { navigate } from "@navigation/navigator";
import { ProfileChat_list$key } from "@generated/ProfileChat_list.graphql";
import { ProfileChat_viewer$key } from "@generated/ProfileChat_viewer.graphql";
import { ProfileChatRemoveMutation } from "@generated/ProfileChatRemoveMutation.graphql";
import Button from "@components/atoms/Button";
import Loading from "@components/atoms/Loading";

const profileChatQuery = graphql`
  fragment ProfileChat_list on Query {
    myChats {
      id
      title
    }
  }
`;

const profileViewerQuery = graphql`
  fragment ProfileChat_viewer on User {
    id
  }
`;

const chatMessageMutation = graphql`
  mutation ProfileChatRemoveMutation($input: RemoveChatInput!) {
    removeChat(input: $input) {
      __typename
      ... on ChatRemovedSuccess {
        id @deleteRecord
      }
      ... on ChatRemovedError {
        message
      }
    }
  }
`;

export default function ProfileChat({
  chatsFragment,
  userFragment,
}: {
  chatsFragment: ProfileChat_list$key;
  userFragment: ProfileChat_viewer$key;
}) {
  const { myChats } = useFragment<ProfileChat_list$key>(
    profileChatQuery,
    chatsFragment
  );
  const { id: viewerId } = useFragment<ProfileChat_viewer$key>(
    profileViewerQuery,
    userFragment
  );
  const [commit] = useMutation<ProfileChatRemoveMutation>(chatMessageMutation);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function remove(): Promise<void> {
    if (!removeId) {
      return;
    }
    setLoading(true);
    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: {
            id: removeId,
            user_id: viewerId,
          },
        },
        onCompleted({ removeChat }) {
          if (removeChat.__typename === "ChatRemovedError") {
            Alert.alert(removeChat.message);
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
        data={myChats}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <Ripple
              style={styles.link}
              onPress={() => setRemoveId(item.id)}
              rippleColor={Colors.black}
            >
              <Icon name={Icons.remove} size={24} color={Colors.gray} />
            </Ripple>

            <Ripple
              style={styles.link}
              onPress={() => navigate("Chat", { id: item.id })}
              rippleColor={Colors.black}
            >
              <Icon name={Icons.next} size={24} color={Colors.blue} />
            </Ripple>
          </View>
        )}
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
        keyExtractor={(item) => item.id}
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
