import { StyleSheet } from "react-native";
import React from "react";
import colors from "../utils/globals/colors";
import Categories from "../components/Categories";

const Home = ({ navigation }) => {
  return (
    <>
      <Categories style={styles.container} navigation={navigation} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
});
