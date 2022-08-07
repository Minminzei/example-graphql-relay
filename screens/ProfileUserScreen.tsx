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
import { ProfileUserScreenQuery } from "@generated/ProfileUserScreenQuery.graphql";
import ProfileUser from "@components/templates/ProfileUser";

const profileScreenQuery = graphql`
  query ProfileUserScreenQuery {
    viewer {
      ...ProfileUser_data
    }
  }
`;

function ScreenContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<ProfileUserScreenQuery>;
}) {
  const { viewer } = usePreloadedQuery(profileScreenQuery, queryReference);
  return <ProfileUser userFragment={viewer} />;
}

export default function ProfileUserScreen() {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<ProfileUserScreenQuery>(profileScreenQuery);

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
