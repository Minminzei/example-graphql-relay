import React, { Suspense } from "react";
import { StyleSheet } from "react-native";
import { View } from "@components/atoms/Themed";
import Header from "@components/atoms/Header";
import { RootStackScreenProps } from "@navigation/types";
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  PreloadedQuery,
} from "react-relay/hooks";
import Loading from "@components/atoms/Loading";
import { UserScreenQuery } from "@generated/UserScreenQuery.graphql";
import User from "@components/templates/User";

const userScreenQuery = graphql`
  query UserScreenQuery($id: ID!) {
    user(id: $id) {
      ...User_list
    }
    ...User_chats @arguments(user_id: $id)
  }
`;

function ScreenContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<UserScreenQuery>;
}) {
  const data = usePreloadedQuery(userScreenQuery, queryReference);

  return <User userFragment={data.user} chatFragment={data} />;
}

export default function UserScreen({ route }: RootStackScreenProps<"User">) {
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<UserScreenQuery>(userScreenQuery);
  React.useEffect(() => {
    loadQuery({ id: route.params.id });
    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery]);

  return (
    <View style={styles.container}>
      <Header title="ユーザー" />
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
