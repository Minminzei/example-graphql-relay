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
import { PagingPosts } from "@constants/App";
import { ChatScreenQuery } from "generated/ChatScreenQuery.graphql";

const chatScreenQuery = graphql`
  query ChatScreenQuery($id: ID!, $first: Int!, $after: String) {
    chat(id: $id) {
      ...Chat_detail
      ...Chat_pagination @arguments(first: $first, after: $after)
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
  return (
    <Chat chatFragment={chat} postsFragment={chat} viewerFragment={viewer} />
  );
}

export default function ChatScreen({
  navigation,
  route,
}: RootStackScreenProps<"Chat">) {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<ChatScreenQuery>(chatScreenQuery);

  React.useEffect(() => {
    loadQuery({ id: route.params.id, first: PagingPosts });
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
