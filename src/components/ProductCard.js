import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import colors from "../utils/globals/colors.js";
import fonts from "../utils/globals/fonts.js";

const ProductCard = ({ item, navigation }) => {
  const dimensios = useWindowDimensions();
  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate("ProductDetail", { productId: item.id })
        }
        style={styles.container}
      >
        <Image style={styles.image} source={{ uri: item.image }}></Image>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    width: "100%",
    marginVertical: 2,
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },
  image: {
    width: "35%",
    minHeight: 150,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  text: {
    padding: 10,
    width: "60%",
    fontSize: 1,
    fontFamily: fonts.RobotoB,
  },
  textContainer: {
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "60%",
    flexWrap: "wrap",
    display: "flex",
  },
  title: {
    fontFamily: fonts.SpaceMonoR,
    fontSize: 13,
    flexWrap: "wrap",
    display: "flex",
  },
  price: { fontFamily: fonts.RobotoI, fontSize: 13 },
});
