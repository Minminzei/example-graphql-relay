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
import { ProfileChatsScreenQuery } from "@generated/ProfileChatsScreenQuery.graphql";
import ProfileChat from "@components/templates/ProfileChat";

const profileScreenQuery = graphql`
  query ProfileChatsScreenQuery {
    viewer {
      ...ProfileChat_viewer
    }
    ...ProfileChat_list
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
  return <ProfileChat userFragment={data.viewer} chatsFragment={data} />;
}

export default function ProfileChatsScreen() {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<ProfileChatsScreenQuery>(profileScreenQuery);

  React.useEffect(() => {
    loadQuery({});
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
