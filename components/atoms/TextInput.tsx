import React, { useState, useImperativeHandle } from "react";
import {
  TextInput as Input,
  TextStyle,
  Platform,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { Text, View } from "@components/atoms/Themed";
import Colors from "@constants/Colors";
import * as _ from "lodash";

type KeybordType = "text" | "email" | "password" | "numeric" | "phone" | "url";

const MaxHeight = 300;
const MinHeight = 40;
const PaddingVertical = 8;
const RowHeight = 17;
const KeyboardTypeMap: {
  [index in KeybordType]: {
    web: KeyboardTypeOptions;
    ios: KeyboardTypeOptions;
    android: KeyboardTypeOptions;
    windows: KeyboardTypeOptions;
    macos: KeyboardTypeOptions;
  };
} = {
  text: {
    web: "default",
    ios: "default",
    android: "default",
    windows: "default",
    macos: "default",
  },
  email: {
    web: "default",
    ios: "email-address",
    android: "email-address",
    windows: "default",
    macos: "default",
  },
  password: {
    web: "default",
    ios: "ascii-capable",
    android: "ascii-capable",
    windows: "default",
    macos: "default",
  },
  numeric: {
    web: "default",
    ios: "number-pad",
    android: "numeric",
    windows: "default",
    macos: "default",
  },
  phone: {
    web: "default",
    ios: "phone-pad",
    android: "phone-pad",
    windows: "default",
    macos: "default",
  },
  url: {
    web: "default",
    ios: "url",
    android: "ascii-capable",
    windows: "default",
    macos: "default",
  },
};

function covert(
  value: string | number,
  type: KeybordType = "text"
): string | number | null {
  switch (type) {
    case "numeric":
      if (value === 0 || value === "0" || value) {
        const trimed = _.trim(
          `${value}`.replace(/,/gi, "").replace(/[０-９]/g, (s: string) => {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
          })
        );
        const numberData = Number(trimed);
        if (!isNaN(numberData)) {
          return numberData;
        }
      }
      return null;
    case "url":
    case "email":
      const trimed = _.trim(`${value}`);
      return trimed;
    case "phone":
      return value;
    case "text":
      return `${value}`.replace(/\t|\"|\\|\b|\r|\f/gi, "");
    case "password":
    default:
      return _.trim(`${value}`);
  }
}

function initialHeightForMultipleLine(numberOfLines: number = 1): number {
  const baseHeight = RowHeight * numberOfLines;
  return baseHeight > MaxHeight
    ? MaxHeight
    : baseHeight < MinHeight + PaddingVertical
    ? MinHeight + PaddingVertical
    : baseHeight;
}

type Props = {
  onChange: Function;
  label?: string | null;
  type?: KeybordType;
  disabled?: boolean;
  initialValue?: string | number | null;
  placeholder?: string;
  maxLength?: number;
  style?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
  innerRef?: React.MutableRefObject<any>;
};

export type TextInputRef = {
  clear: () => void;
};

export default function TextInput({
  label,
  type = "text",
  disabled,
  initialValue,
  placeholder,
  onChange,
  maxLength,
  style,
  multiline = false,
  numberOfLines,
  innerRef,
}: Props): JSX.Element {
  const initialHeight = initialHeightForMultipleLine(numberOfLines);
  const [dynamicHeight, setHeight] = useState<number>(initialHeight);

  const [value, setValue] = useState<string>(
    initialValue ? String(initialValue) : ""
  );
  function change(changeValue: string): void {
    setValue(changeValue);
    onChange(covert(changeValue, type));
  }

  useImperativeHandle(innerRef, () => ({
    clear() {
      setValue("");
    },
  }));

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.label}>
          <Text>{label}</Text>
        </View>
      )}
      <Input
        ref={innerRef}
        keyboardType={KeyboardTypeMap[type][Platform.OS]}
        secureTextEntry={type === "password"}
        editable={!disabled}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={change}
        value={value}
        underlineColorAndroid="transparent"
        blurOnSubmit={false}
        style={[styles.form, style, multiline && { height: dynamicHeight }]}
        maxLength={maxLength}
        allowFontScaling={false}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onContentSizeChange={({ nativeEvent }) => {
          if (multiline && Platform.OS !== "web") {
            const updateHeight =
              nativeEvent.contentSize.height + PaddingVertical;
            if (updateHeight > MaxHeight) {
              setHeight(MaxHeight);
            } else if (updateHeight > initialHeight) {
              setHeight(updateHeight);
            } else if (dynamicHeight !== initialHeight) {
              setHeight(initialHeight);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 26,
    paddingLeft: 8,
    paddingRight: 8,
  },
  form: {
    paddingVertical: PaddingVertical / 2,
    minHeight: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grayLight,
    borderRadius: 4,
    width: "100%",
    backgroundColor: Colors.white,
  },
});
