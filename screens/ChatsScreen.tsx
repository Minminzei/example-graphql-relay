import React, { Suspense } from "react";
import { StyleSheet } from "react-native";
import { View } from "@components/atoms/Themed";
import { PagingChats } from "@constants/App";
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  PreloadedQuery,
} from "react-relay/hooks";
import Loading from "@components/atoms/Loading";
import Chats from "@components/templates/Chats";
import { ChatsScreenQuery } from "generated/ChatsScreenQuery.graphql";
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
