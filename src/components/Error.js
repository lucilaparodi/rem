import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";
import ButtonPrimary from "./ButtonPrimary";

const Error = ({ message, textButton, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{message}</Text>
      <ButtonPrimary title={textButton} onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    fontFamily: fonts.SpaceMonoR,
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default Error;
