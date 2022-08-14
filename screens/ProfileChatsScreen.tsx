import React, { Suspense } from "react";
import { StyleSheet } from "react-native";
import { View } from "@components/atoms/Themed";
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  PreloadedQuery,
} from "react-relay/hooks";
import { PagingChats } from "@constants/App";
import Loading from "@components/atoms/Loading";
import { ProfileChatsScreenQuery } from "@generated/ProfileChatsScreenQuery.graphql";
import ProfileChats from "@components/templates/ProfileChats";

const profileScreenQuery = graphql`
  query ProfileChatsScreenQuery($first: Int!, $after: String, $user_id: ID!) {
    ...ProfileChats_list
      @arguments(first: $first, after: $after, user_id: $user_id)
    viewer {
      ...ProfileChats_viewer
    }
  }
`;

function ScreenContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<ProfileChatsScreenQuery>;
}) {
  const data = usePreloadedQuery<ProfileChatsScreenQuery>(
    profileScreenQuery,
    queryReference
  );
  return <ProfileChats chatFramgent={data} viewerFragment={data.viewer} />;
}

export default function ProfileChatsScreen() {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<ProfileChatsScreenQuery>(profileScreenQuery);

  React.useEffect(() => {
    loadQuery({ first: PagingChats, user_id: "VXNlcjox" });
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
