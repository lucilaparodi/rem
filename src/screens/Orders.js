import OrderItem from "../components/OrderItem";
import colors from "../utils/globals/colors";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../app/services/orders";

const Orders = () => {
  const localId = useSelector((state) => state.auth.localId);
  const { data: orders } = useGetOrdersQuery(localId);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem order={item}></OrderItem>}
      ></FlatList>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.grey,
    paddingTop: 80,
  },
});
