import React, { Suspense } from "react";
import { StyleSheet } from "react-native";
import { View } from "@components/atoms/Themed";
import { RootStackScreenProps } from "@navigation/types";
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  PreloadedQuery,
} from "react-relay/hooks";
import Loading from "@components/atoms/Loading";
import Header from "@components/atoms/Header";
import { ChatCreateScreenQuery } from "@generated/ChatCreateScreenQuery.graphql";
import ChatCreate from "@components/templates/ChatCreate";

const chatCreateScreenQuery = graphql`
  query ChatCreateScreenQuery {
    viewer {
      ...ChatCreate_viewer
    }
  }
`;

function ScreenContent({
  queryReference,
  move,
}: {
  queryReference: PreloadedQuery<ChatCreateScreenQuery>;
  move: (id: string) => void;
}) {
  const { viewer } = usePreloadedQuery<ChatCreateScreenQuery>(
    chatCreateScreenQuery,
    queryReference
  );
  return <ChatCreate viewerFragment={viewer} move={move} />;
}

export default function ChatCreateScreen({
  navigation,
}: RootStackScreenProps<"ChatCreate">) {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<ChatCreateScreenQuery>(chatCreateScreenQuery);

  React.useEffect(() => {
    loadQuery({});
    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery]);

  return (
    <View style={styles.container}>
      <Header title="チャット作成" onBack={() => navigation.goBack()} />
      {
        <Suspense fallback={<Loading size="large" />}>
          {queryReference && (
            <ScreenContent
              queryReference={queryReference}
              move={(id) => navigation.replace("Chat", { id })}
            />
          )}
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
