import React from "react";
import { Text, View } from "@components/atoms/Themed";
import Spacer from "@components/atoms/Spacer";
import Fonts from "@constants/Fonts";
import Colors from "@constants/Colors";
import { StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import Button from "@components/atoms/Button";

type Props = {
  message: string;
  subline?: string;
  closeText?: string;
  onClose: () => void;
  confirmText?: string;
  onConfirm?: () => void;
};

export default function Dialog({
  message,
  subline,
  closeText = "閉じる",
  onClose,
  confirmText = "確認する",
  onConfirm,
}: Props): JSX.Element {
  return (
    <Modal animationType="none" visible onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.message}>
            <Text style={styles.title}>{message}</Text>
            {subline && (
              <>
                <Spacer height={16} />
                <Text style={styles.text}>{subline}</Text>
              </>
            )}
            <Spacer height={24} />
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button
                  title={closeText}
                  onPress={onClose}
                  width="100%"
                  height={48}
                />
              </View>
              {onConfirm && (
                <>
                  <Spacer width={16} />
                  <View style={styles.button}>
                    <Button
                      title={confirmText}
                      onPress={onConfirm}
                      backgroundColor={Colors.primary}
                      width="100%"
                      height={48}
                      textStyle={styles.buttonText}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundLayer} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 10,
    backgroundColor: Colors.transparent,
  },
  backgroundLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: Colors.overlayDark,
  },
  wrapper: {
    padding: 24,
    backgroundColor: Colors.transparent,
  },
  message: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 6,
    maxWidth: 345,
    minWidth: "90%",
  },
  title: {
    ...Fonts.md,
    textAlign: "center",
  },
  text: {
    ...Fonts.sm,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  buttonText: {
    color: Colors.white,
  },
});
