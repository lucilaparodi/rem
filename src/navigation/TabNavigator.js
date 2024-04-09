import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./ShopStack";
import OrdersStack from "./OrdersStack";
import CartStack from "./CartStack";
import TabBarIcon from "../components/TabBarIcon";
import ProfileStack from "./ProfileStack";
import colors from "../utils/globals/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ShopStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="ShopStack"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon nameIcon="home" title="home" focused={focused} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon nameIcon="cart" title="cart" focused={focused} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="OrdersStack"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon nameIcon="list" title="orders" focused={focused} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon nameIcon="person" title="profile" focused={focused} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    height: 90,
    borderColor: "transparent",
  },
});
