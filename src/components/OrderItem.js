import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const OrderItem = ({ order }) => {
  console.log(order.createdAt);
  return (
    <>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          {/* Comentario: En la expo me dice invalid date pero en la web anda bien */}
          <Text style={styles.text}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>
          <Text style={styles.text2}>${order.total}</Text>
        </View>
        <View style={styles.container}>
          <Ionicons name="search" size={30} color={colors.darkgrey}></Ionicons>
          <Text style={styles.text1}>
            {order.items ? order.items.length : "0"}{" "}
            {order.items?.length == 1 ? " item" : " items"}
          </Text>
        </View>
      </View>
    </>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.moregrey,
    padding: 20,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    alignItems: "center",
    height: 100,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  textContainer: {
    width: "70%",
    justifyContent: "space-between",

    padding: 10,
    alignItems: "start",
  },
  image: {
    width: "20%",
    height: 75,
  },
  text: {
    color: colors.darkgrey,
    fontFamily: fonts.SpaceMonoR,
    fontSize: 16,
  },
  remove: {
    fontFamily: fonts.SpaceMonoB,
    fontSize: 13,
    textDecorationLine: "underline",
  },
  text1: {
    color: colors.darkgrey,
    fontFamily: fonts.RobotoI,
    fontSize: 14,
  },
  text2: {
    color: colors.black,
    fontFamily: fonts.SpaceMonoR,
    fontSize: 20,
  },
});
