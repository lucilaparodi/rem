import { FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useGetProductsByCategoryQuery } from "../app/services/shop";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import colors from "../utils/globals/colors";
import Error from "../components/Error";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsByCategory = ({ route, navigation }) => {
  const { categorySelected } = route.params;
  const {
    data: products,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetProductsByCategoryQuery(categorySelected);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handlerKeyword = (k) => {
    setKeyword(k);
  };
  useEffect(() => {
    setProductsFiltered(products);
    if (keyword)
      setProductsFiltered(
        products.filter((product) => {
          const productTitleLower = product.title.toLowerCase();
          const keywordLower = keyword.toLowerCase();
          return productTitleLower.includes(keywordLower);
        })
      );
  }, [categorySelected, keyword, products]);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <Error
        message="error 404"
        textButton="go back"
        onRetry={() => navigation.goBack()}
      />
    );
  return (
    <>
      <Search handlerKeyword={handlerKeyword}></Search>
      <FlatList
        style={styles.container}
        data={productsFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard navigation={navigation} item={item}></ProductCard>
        )}
      ></FlatList>
    </>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  text: {
    color: "black",
    fontSize: 50,
  },
});
