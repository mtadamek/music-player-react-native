import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from "native-base";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import Playlists from "../screens/Playlists";

const TabNavigator = createBottomTabNavigator(
  {
    Search,
    Playlists,
    Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Search") {
          iconName = "search";
        } else if (routeName === "Playlists") {
          iconName = "list";
        } else if (routeName === "Settings") {
          iconName = "settings";
        }
        return <Icon name={iconName} style={{ color: "#ececec" }} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#e2e2e2",
      activeBackgroundColor: "#22327a",
      inactiveBackgroundColor: "#303030",
      style: {
        backgroundColor: "#303030"
      }
    }
  }
);

export default createAppContainer(TabNavigator);
