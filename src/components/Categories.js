import { StyleSheet, View, FlatList, Image } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import colors from "../utils/globals/colors";
import { useGetCategoriesQuery } from "../app/services/shop";
import LoadingSpinner from "./LoadingSpinner";
import { useGetImagesQuery } from "../app/services/shop";
import { useEffect, useState } from "react";
import Error from "./Error";
import EmptyListComponent from "./EmptyListComponent";

const Categories = ({ navigation }) => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
  } = useGetCategoriesQuery();
  const [images, setImages] = useState([]);
  const { data } = useGetImagesQuery();
  useEffect(() => {
    setImages(data);
  }, [data]);

  const onRetry = () => {
    navigation.reset({ idex: 0, routes: [{ name: "Home" }] });
  };

  const renderCategoryCard = ({ item }) => (
    <CategoryCard navigation={navigation} item={item}></CategoryCard>
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <Error message="error 404" textButton="reload" onRetry={onRetry} />;
  if (isSuccess && categories === null)
    return <EmptyListComponent message="no categories yet" />;
  return (
    <>
      <View style={styles.hola}>
        <Image
          style={styles.images}
          source={{ uri: images ? images[7] : "" }}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderCategoryCard}
        numColumns={1}
      />
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grey,
    height: "100%",
  },
  hola: {
    display: "flex",
    paddingTop: 80,
    width: "100%",
    backgroundColor: colors.grey,
  },
  text: {
    color: "black",
    fontSize: 50,
  },
  cont2: {
    flex: 1,
  },
  images: {
    height: 80,
    width: "100%",
  },
});
