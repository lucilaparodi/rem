import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: item.image ? item.image : "" }}
        resizeMode="cover"
      />
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text2}>${item.price}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>
            {item.quantity}
            {item.quantity == 1 ? " item" : " items"}
          </Text>
          <Pressable onPress={() => dispatch(deleteCartItem(item.id))}>
            <Text style={styles.remove}>remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.moregrey,
    padding: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    alignItems: "center",
    height: 100,
  },
  textContainer: {
    width: "70%",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "20%",
    height: 75,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.SpaceMonoR,
    fontSize: 17,
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
    color: colors.darkgrey,
    fontFamily: fonts.SpaceMonoR,
    fontSize: 14,
  },
});
