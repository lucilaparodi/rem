import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useGetProductDetailQuery } from "../app/services/shop";
import colors from "../utils/globals/colors";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyListComponent from "../components/EmptyListComponent";
import fonts from "../utils/globals/fonts";
import Error from "../components/Error";

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { productId } = route.params;
  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductDetailQuery(productId);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <Error
        message="error 404"
        textButton="go back"
        onRetry={() => navigation.goBack()}
      />
    );
  if (isSuccess && product === null)
    return <EmptyListComponent message="this product is not available" />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{ uri: product.image ? product.image : "" }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <View style={styles.containerDesc}>
        <Text style={styles.description}>{product?.description}</Text>
        <Pressable style={styles.buyNow}>
          <Text
            style={styles.buyNowText}
            onPress={() => dispatch(addCartItem(product))}
          >
            add to cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
    paddingTop: 10,
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 300,
  },
  containerText: {
    gap: 25,
    paddingHorizontal: 5,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  containerDesc: {
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.SpaceMonoR,
    color: colors.black,
  },
  price: {
    fontSize: 20,
    fontFamily: fonts.SpaceMonoB,
  },
  description: {
    fontSize: 15,
    fontFamily: fonts.RobotoI,
    color: colors.darkgrey,
  },
  buyNow: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: colors.darkgrey,
    borderWidth: 1,
    width: 200,
    alignItems: "center",
    marginVertical: 10,
  },
  buyNowText: {
    color: colors.darkgrey,
    fontFamily: fonts.SpaceMonoR,
    fontSize: 20,
  },
});
