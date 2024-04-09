import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../utils/globals/colors.js";
import fonts from "../utils/globals/fonts.js";
import { Ionicons } from "@expo/vector-icons";
import { useGetImagesQuery } from "../app/services/shop";
import { clearUser } from "../features/auth/authSlice";
import { deleteSession } from "../utils/db";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ title = "rem", navigation }) => {
  const [images, setImages] = useState([]);
  const { data } = useGetImagesQuery();
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.auth.idToken);

  const onLogout = () => {
    dispatch(clearUser());
    deleteSession();
  };

  useEffect(() => {
    setImages(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <Image style={styles.images} source={{ uri: images ? images[1] : "" }} />
      {navigation.canGoBack() && (
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.black}></Ionicons>
        </Pressable>
      )}
      <Text style={styles.text}>{title}</Text>
      {idToken && (
        <Pressable style={styles.logout} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.black} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    position: "relative",
  },
  images: {
    height: 35,
    width: 250,
    marginTop: 80,
    marginBotton: 50,
  },
  text: {
    fontSize: 25,
    color: colors.black,
    fontFamily: fonts.SpaceMonoR,
    paddingTop: 10,
  },
  goBack: {
    position: "absolute",
    left: 10,
    top: 113,
  },
  logout: {
    position: "absolute",
    right: 10,
    top: 113,
  },
});
