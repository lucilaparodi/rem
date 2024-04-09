import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const CategoryCard = ({ item, navigation }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ProductsByCategory", { categorySelected: item })
      }
    >
      <View style={styles.container}>
        <Text style={styles.text}>{item}</Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: colors.white,
    marginVertical: "3%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.moregrey,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    color: colors.darkgrey,
    fontFamily: fonts.SpaceMonoR,
  },
});
