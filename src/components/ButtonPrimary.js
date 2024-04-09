import { StyleSheet, Text, Pressable } from "react-native";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const ButtonPrimary = ({ title, onPress, style = {} }) => {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    width: "40%",
    backgroundColor: colors.white,
    borderColor: colors.darkgrey,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    margin: 10,
    fontSize: 15,
  },
  text: {
    color: colors.darkgrey,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.SpaceMonoB,
  },
});
