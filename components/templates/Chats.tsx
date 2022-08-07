import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import Spacer from "@components/atoms/Spacer";
import Ripple from "react-native-material-ripple";
import { Chats_list$key } from "@generated/Chats_list.graphql";
import Avatar from "@components/atoms/Avatar";
import { navigate } from "@navigation/navigator";

const chatsQuery = graphql`
  fragment Chats_list on Query {
    chats {
      id
      title
      user {
        id
        name
        image
        division
      }
    }
  }
`;

export default function Chats({
  chatsFragment,
}: {
  chatsFragment: Chats_list$key;
}) {
  const { chats } = useFragment<Chats_list$key>(chatsQuery, chatsFragment);
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.item}>
            <Ripple
              style={styles.avatar}
              onPress={() => navigate("User", { id: item.user.id })}
              rippleColor={Colors.black}
            >
              <Avatar uri={item.user.image} size={72} />
            </Ripple>

            <Ripple
              style={styles.info}
              onPress={() => navigate("Chat", { id: item.id })}
              rippleColor={Colors.black}
            >
              <View style={styles.user}>
                <Text style={styles.text}>{item.user.name}</Text>
                <Spacer width={8} />
                <Text style={styles.text}>{item.user.division}</Text>
              </View>

              <Spacer height={4} />
              <Text style={styles.title}>{item.title}</Text>
            </Ripple>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
  },
  item: {
    flex: 1,
    flexDirection: "row",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  info: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 8,
    paddingRight: 16,
  },
  user: {
    flexDirection: "row",
  },
  text: {
    ...Fonts.xs,
    color: Colors.gray,
  },
  title: {
    ...Fonts.lg,
  },
});
