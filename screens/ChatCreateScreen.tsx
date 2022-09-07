import React, { Suspense } from "react";
import { StyleSheet } from "react-native";
import { View } from "@components/atoms/Themed";
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
import { goBack } from "@navigation/navigator";

const chatCreateScreenQuery = graphql`
  query ChatCreateScreenQuery {
    viewer {
      ...ChatCreate_viewer
    }
  }
`;

function ScreenContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<ChatCreateScreenQuery>;
}) {
  const { viewer } = usePreloadedQuery<ChatCreateScreenQuery>(
    chatCreateScreenQuery,
    queryReference
  );
  return <ChatCreate viewerFragment={viewer} />;
}

export default function ChatCreateScreen() {
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
      <Header title="チャット作成" onBack={goBack} />
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
