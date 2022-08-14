import React, { Suspense } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@components/atoms/Themed";
import { navigate } from "@navigation/navigator";
import Colors from "@constants/Colors";
import { PagingChats } from "@constants/App";
import Icons from "@constants/Icons";
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  PreloadedQuery,
} from "react-relay/hooks";
import Loading from "@components/atoms/Loading";
import Chats from "@components/templates/Chats";
import { ChatsScreenQuery } from "generated/ChatsScreenQuery.graphql";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const chatsScreenQuery = graphql`
  query ChatsScreenQuery($first: Int!) {
    ...Chats_list @arguments(first: $first)
  }
`;

function ScreenContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<ChatsScreenQuery>;
}) {
  const data = usePreloadedQuery<ChatsScreenQuery>(
    chatsScreenQuery,
    queryReference
  );
  return <Chats chatsFragment={data} />;
}

export default function ChatsScreen() {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<any>(chatsScreenQuery);

  React.useEffect(() => {
    loadQuery({ first: PagingChats });
    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery]);

  return (
    <View style={styles.container}>
      {
        <Suspense fallback={<Loading size="large" />}>
          {queryReference && <ScreenContent queryReference={queryReference} />}
        </Suspense>
      }
      <TouchableOpacity
        style={styles.create}
        onPress={() => navigate("ChatCreate")}
      >
        <Icon name={Icons.add} size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
