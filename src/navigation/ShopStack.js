import React from "react";
import ProductsByCategory from "../screens/ProductsByCategory";
import Header from "../components/Header";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        return {
          header: () => {
            return (
              <Header
                navigation={navigation}
                title={
                  route.name === "Home"
                    ? "shop by"
                    : route.name === "ProductsByCategory"
                    ? route.params.categorySelected
                    : "detail"
                }
              ></Header>
            );
          },
        };
      }}
    >
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen
        name="ProductsByCategory"
        component={ProductsByCategory}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ShopStack;
