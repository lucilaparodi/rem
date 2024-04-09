import { StyleSheet, Text, Pressable } from "react-native";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const SubmitButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    width: "50%",
    backgroundColor: colors.grey,
    borderColor: colors.darkgrey,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: colors.darkgrey,
    fontSize: 13,
    fontFamily: fonts.SpaceMonoR,
  },
});
