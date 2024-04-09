import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import fonts from "../utils/globals/fonts";
import CartItem from "../components/CartItem";
import colors from "../utils/globals/colors";
import { usePostOrderMutation } from "../app/services/orders";
import { deleteCart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const localId = useSelector((state) => state.auth.localId);
  const [triggerAddOrder] = usePostOrderMutation();

  const handlerAddOrder = async () => {
    const createdAt = new Date().toLocaleString();
    const order = {
      createdAt,
      ...cart,
    };
    await triggerAddOrder({ localId, order });
    dispatch(deleteCart());
    navigation.navigate("OrdersStack");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item}></CartItem>}
      ></FlatList>
      <View style={styles.confirmContainer}>
        <Text style={styles.confirmText}>Total: ${cart.total}</Text>
        <Pressable onPress={handlerAddOrder} style={styles.boton}>
          <Text style={styles.confirmText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.grey,
    paddingTop: 80,
  },
  confirmContainer: {
    flexDirection: "row",
    backgroundColor: colors.darkgrey,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boton: {
    borderWidth: 1,
    borderColor: colors.moregrey,
    padding: 13,
    paddingHorizontal: 25,
  },
  confirmText: {
    fontFamily: fonts.SpaceMonoR,
    fontSize: 18,
    color: colors.grey,
  },
});
