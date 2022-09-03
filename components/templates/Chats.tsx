import React, { useState } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { usePaginationFragment, graphql } from "react-relay/hooks";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import { PagingChats } from "@constants/App";
import Spacer from "@components/atoms/Spacer";
import Ripple from "react-native-material-ripple";
import { Chats_list$key } from "@generated/Chats_list.graphql";
import Avatar from "@components/atoms/Avatar";
import Loading from "@components/atoms/Loading";
import { navigate } from "@navigation/navigator";

const chatsQuery = graphql`
  fragment Chats_list on Query
  @refetchable(queryName: "Chats_list_pagination")
  @argumentDefinitions(after: { type: "String" }, first: { type: "Int!" }) {
    chats(first: $first, after: $after) @connection(key: "Chats_chats") {
      edges {
        node {
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
    }
  }
`;

export default function Chats({
  chatsFragment,
}: {
  chatsFragment: Chats_list$key;
}) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [paging, setPaging] = useState<boolean>(false);
  const { data, loadNext, hasNext, refetch } = usePaginationFragment(
    chatsQuery,
    chatsFragment
  );

  return (
    <View>
      <FlatList
        data={data.chats.edges}
        renderItem={({ item }) => {
          if (!item) {
            return null;
          }
          return (
            <View style={styles.container}>
              <View style={styles.item}>
                <Ripple
                  style={styles.avatar}
                  onPress={() => navigate("User", { id: item.node.user.id })}
                  rippleColor={Colors.black}
                >
                  <Avatar uri={item.node.user.image} size={72} />
                </Ripple>

                <Ripple
                  style={styles.info}
                  onPress={() => navigate("Chat", { id: item.node.id })}
                  rippleColor={Colors.black}
                >
                  <View style={styles.user}>
                    <Text style={styles.text}>{item.node.user.name}</Text>
                    <Spacer width={8} />
                    <Text style={styles.text}>{item.node.user.division}</Text>
                  </View>

                  <Spacer height={4} />
                  <Text style={styles.title}>{item.node.title}</Text>
                </Ripple>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item?.node.id || ""}
        onEndReached={() => {
          if (hasNext && !paging) {
            setPaging(true);
            loadNext(PagingChats, { onComplete: () => setPaging(false) });
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              if (!refreshing) {
                setRefreshing(true);
                refetch(
                  { first: PagingChats },
                  {
                    fetchPolicy: "network-only",
                    onComplete: () => setRefreshing(false),
                  }
                );
              }
            }}
          />
        }
      />
      {paging && (
        <View style={styles.paging}>
          <Loading />
        </View>
      )}
    </View>
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
  paging: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    paddingVertical: 12,
  },
});
