import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "@navigation/index";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Navigation colorScheme={colorScheme} />
          </SafeAreaView>
        </SafeAreaProvider>
      </RelayEnvironmentProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
