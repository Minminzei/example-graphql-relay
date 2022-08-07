import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, graphql } from "react-relay/hooks";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import Avatar from "@components/atoms/Avatar";
import Spacer from "@components/atoms/Spacer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserProfile_user$key } from "@generated/UserProfile_user.graphql";

const userProfileQuery = graphql`
  fragment UserProfile_user on User {
    name
    image
    email
    division
  }
`;

export default function UserProfile({
  userFragment,
}: {
  userFragment: UserProfile_user$key;
}) {
  const data = useFragment<UserProfile_user$key>(
    userProfileQuery,
    userFragment
  );

  return (
    <View style={styles.container}>
      <Spacer height={24} />

      <Avatar uri={data.image} size={120} />

      <Spacer height={24} />
      <Text style={styles.name}>{data.name}</Text>

      <Spacer height={8} />

      <View style={styles.row}>
        <Icon name="email" size={16} color={Colors.gray} />
        <Spacer width={4} />
        <Text style={styles.text}>{data.email}</Text>
      </View>

      <Spacer height={4} />

      <View style={styles.row}>
        <Icon
          name="badge-account-horizontal-outline"
          size={16}
          color={Colors.gray}
        />
        <Spacer width={4} />
        <Text style={styles.text}>{data.division}</Text>
      </View>
      <Spacer height={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  avatar: {
    paddingVertical: 16,
    justifyContent: "center",
  },
  name: {
    ...Fonts.xl,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    color: Colors.gray,
  },
});
