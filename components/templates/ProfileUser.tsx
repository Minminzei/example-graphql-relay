import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import { useFragment, useMutation, graphql } from "react-relay/hooks";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import Spacer from "@components/atoms/Spacer";
import Avatar from "@components/atoms/Avatar";
import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";
import { ProfileUser_data$key } from "@generated/ProfileUser_data.graphql";
import { ProfileUserMutation } from "@generated/ProfileUserMutation.graphql";
import { isEmpty, isEmail } from "class-validator";

const profileUserQuery = graphql`
  fragment ProfileUser_data on User {
    id
    name
    image
    email
    division
  }
`;

const profileUserMutation = graphql`
  mutation ProfileUserMutation($input: ProfileInput!) {
    updateProfile(input: $input) {
      __typename
      ... on User {
        id
        name
        image
        email
        division
      }
      ... on ProfileUpdatedError {
        message
      }
    }
  }
`;

type ProfileInput = {
  name: string;
  email: string;
  image: string;
  division: string;
};

type ValidateError = {
  name: string | null;
  email: string | null;
  image: string | null;
  division: string | null;
};

export default function ProfileUser({
  userFragment,
}: {
  userFragment: ProfileUser_data$key;
}) {
  const data = useFragment<ProfileUser_data$key>(
    profileUserQuery,
    userFragment
  );

  const [commit] = useMutation<ProfileUserMutation>(profileUserMutation);
  const [loading, setLoading] = useState<boolean>(false);

  const [profileInput, setProfileInput] = useState<ProfileInput>({
    name: data.name,
    email: data.email,
    image: data.image,
    division: data.division,
  });

  const [validateError, setValidateError] = useState<ValidateError>({
    name: null,
    email: null,
    image: null,
    division: null,
  });

  function validateAndUpdate(
    column: string,
    value: string | number | null
  ): boolean {
    let error: string | null = null;
    switch (column) {
      case "name":
        if (isEmpty(value)) {
          error = "名前を入力してください";
        }
        break;
      case "email":
        if (isEmpty(value)) {
          error = "Emailを入力してください";
        } else if (!isEmail(value)) {
          error = "正しいEmailを入力してください";
        }
        break;
      case "image":
        if (isEmpty(value)) {
          error = "プロフィール写真を選択してください";
        }
        break;
      case "division":
        if (isEmpty(value)) {
          error = "所属を入力してください";
        }
        break;
    }
    setProfileInput((bankInput) => ({
      ...bankInput,
      [`${column}`]: value,
    }));
    setValidateError((errors) => ({
      ...errors,
      [`${column}`]: error,
    }));
    return !error;
  }

  async function save(): Promise<void> {
    setLoading(true);
    await new Promise<void>((resolve) => {
      commit({
        variables: {
          input: profileInput,
        },
        onCompleted({ updateProfile }) {
          if (updateProfile.__typename === "ProfileUpdatedError") {
            Alert.alert(updateProfile.message);
          }
          resolve();
        },
      });
    });
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar uri={data.image} size={120} />
      </View>

      <Spacer height={8} />

      <TextInput
        label="名前"
        initialValue={data.name}
        onChange={(value: string) => validateAndUpdate("name", value)}
      />

      {validateError.name && (
        <Text style={styles.error}>{validateError.name}</Text>
      )}

      <Spacer height={8} />

      <TextInput
        label="Email"
        initialValue={data.email}
        onChange={(value: string) => validateAndUpdate("email", value)}
        type="email"
      />

      {validateError.email && (
        <Text style={styles.error}>{validateError.email}</Text>
      )}

      <Spacer height={8} />

      <TextInput
        label="所属"
        initialValue={data.division}
        onChange={(value: string) => validateAndUpdate("division", value)}
      />

      {validateError.division && (
        <Text style={styles.error}>{validateError.division}</Text>
      )}

      <Spacer height={24} />

      <View style={styles.button}>
        <Button
          title="保存する"
          onPress={save}
          loading={loading}
          backgroundColor={Colors.primary}
          textStyle={styles.buttonText}
          disabled={
            Object.values(validateError).filter((row) => !!row).length !== 0
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatar: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
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
  error: {
    color: Colors.red,
    ...Fonts.sm,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
});
