import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "@navigation/index";
import { RecoilRoot } from "recoil";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import { View } from "@components/atoms/Themed";
import Colors from "@constants/Colors";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RecoilRoot>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <View style={styles.content}>
                <Navigation colorScheme={colorScheme} />
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </RecoilRoot>
      </RelayEnvironmentProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    maxWidth: 500,
    width: "100%",
    height: "100%",
  },
});
