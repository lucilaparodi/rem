import {
  Pressable,
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../utils/globals/colors";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import fonts from "../utils/globals/fonts";

const Search = ({ handlerKeyword }) => {
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const handlerInput = (t) => setInput(t);

  const search = () => {
    const expression = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (expression.test(input)) {
      setError("Caracteres no validos");
      return;
    }
    setError("");
    handlerKeyword(input);
    Keyboard.dismiss();
  };

  const resetSearch = () => {
    handlerKeyword("");
    handlerInput("");
    setError("");
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="looking for something?"
          style={styles.input}
          value={input}
          onChangeText={handlerInput}
        />

        <Pressable onPress={search}>
          <Ionicons name="search" size={22} color={colors.darkgrey}></Ionicons>
        </Pressable>

        <Pressable onPress={resetSearch}>
          <Ionicons name="close" size={22} color={colors.darkgrey}></Ionicons>
        </Pressable>
      </View>
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.moregrey,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "80%",
    marginHorizontal: 5,
    fontFamily: fonts.RobotoI,
  },
  container: {
    backgroundColor: colors.grey,
    flexDirection: "row",
    paddingTop: 80,
    padding: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
});
