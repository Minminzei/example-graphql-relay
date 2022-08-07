/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Ripple from "react-native-material-ripple";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import { View, Text } from "@components/atoms/Themed";
import Colors from "@constants/Colors";
import Icons from "@constants/Icons";
import ChatsScreen from "@screens/ChatsScreen";
import ChatScreen from "@screens/ChatScreen";
import ChatCreateScreen from "@screens/ChatCreateScreen";
import UserScreen from "@screens/UserScreen";
import ProfileUserScreen from "@screens/ProfileUserScreen";
import ProfileChatsScreen from "@screens/ProfileChatsScreen";
import {
  RootStackParamList,
  RootTabParamList,
  initialRouteName,
  ProfileTabParamList,
  RootTabScreenProps,
} from "@navigation/types";
import LinkingConfiguration from "@navigation/LinkingConfiguration";
import { navigationRef } from "@navigation/navigator";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatCreate"
        component={ChatCreateScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Chats" tabBar={TabBar}>
      <BottomTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: Icons.home,
          headerShown: false,
          title: "チャット",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabNavigator}
        options={{
          tabBarLabel: Icons.prfofile,
          headerShown: false,
          title: "プロフィール",
        }}
      />
    </BottomTab.Navigator>
  );
}

const ProfileTab = createMaterialTopTabNavigator<ProfileTabParamList>();

function ProfileTabNavigator(data: RootTabScreenProps<"Profile">) {
  return (
    <ProfileTab.Navigator
      // tabBar={TodoTabBar}
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.gray,
      }}
    >
      <ProfileTab.Screen
        name="User"
        component={ProfileUserScreen}
        options={{
          title: "プロフィール編集",
        }}
      />
      <ProfileTab.Screen
        name="Chat"
        component={ProfileChatsScreen}
        options={{
          title: "チャット",
        }}
      />
    </ProfileTab.Navigator>
  );
}

// function TodoTabBar(params: MaterialTopTabBarProps) {
//   const { state, descriptors, navigation } = params;
//   return (
//     <View style={styles.favoriteTabBarViews}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const isFocused = state.index === index;

//         return (
//           <Ripple
//             onPress={() => navigation.navigate(route.name)}
//             style={[
//               styles.favoriteTabBarView,
//               isFocused
//                 ? {
//                     borderColor: Colors.black0,
//                     borderBottomColor: Colors.green,
//                     borderWidth: 2,
//                   }
//                 : null,
//             ]}
//             key={`tabbr-${index}`}
//           >
//             <Text
//               style={[
//                 styles.favoriteTabBarText,
//                 isFocused
//                   ? {
//                       ...Fonts.xlb100,
//                       color: Colors.green,
//                     }
//                   : null,
//               ]}
//             >
//               {options.title}
//             </Text>
//           </Ripple>
//         );
//       })}
//     </View>
//   );
// }

function TabBar(params: BottomTabBarProps): JSX.Element {
  const { state, descriptors, navigation } = params;
  return (
    <View style={styles.menus}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        return (
          <Ripple
            style={styles.menu}
            onPress={() => navigation.navigate("Root", { screen: route.name })}
            key={`menu-${route.name}`}
          >
            <Icon
              name={options.tabBarLabel as any}
              size={40}
              color={isFocused ? Colors.primary : Colors.black}
            />
            <Text
              style={[
                styles.label,
                isFocused ? { color: Colors.primary } : null,
              ]}
            >
              {options.title}
            </Text>
          </Ripple>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menus: {
    height: 74,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderColor: Colors.grayLight,
    borderStyle: "solid",
  },
  menu: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.black,
    fontSize: 10,
    lineHeight: 10,
    marginTop: 4,
  },
});
