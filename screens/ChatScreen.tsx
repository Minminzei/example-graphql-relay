import React, { Suspense } from "react";
import { RootStackScreenProps } from "@navigation/types";
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  PreloadedQuery,
} from "react-relay/hooks";
import Loading from "@components/atoms/Loading";
import Chat from "@components/templates/Chat";
import { ChatScreenQuery } from "generated/ChatScreenQuery.graphql";

const chatScreenQuery = graphql`
  query ChatScreenQuery($id: ID!) {
    chat(id: $id) {
      ...Chat_detail
    }
    viewer {
      ...Chat_viewer
    }
  }
`;

function ScreenContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<ChatScreenQuery>;
}) {
  const { chat, viewer } = usePreloadedQuery<ChatScreenQuery>(
    chatScreenQuery,
    queryReference
  );
  return <Chat chatFragment={chat} viewerFragment={viewer} />;
}

export default function ChatScreen({
  navigation,
  route,
}: RootStackScreenProps<"Chat">) {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<ChatScreenQuery>(chatScreenQuery);

  React.useEffect(() => {
    loadQuery({ id: route.params.id });
    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery]);

  return (
    <Suspense fallback={<Loading size="large" />}>
      {queryReference && <ScreenContent queryReference={queryReference} />}
    </Suspense>
  );
}
