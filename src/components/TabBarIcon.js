import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const TabBarIcon = ({ title, nameIcon, focused }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={nameIcon}
        size={22}
        color={focused ? colors.darkgrey : colors.moregrey}
      ></Ionicons>

      <Text style={[styles.text, !focused && styles.textFocused]}>{title}</Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.darkgrey,
    textAlign: "center",
    fontSize: 12,
    fontFamily: fonts.RobotoR,
  },
  textFocused: {
    color: colors.moregrey,
    textAlign: "center",
    fontSize: 12,
  },
});
