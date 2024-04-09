import { StyleSheet, Text, View, Pressable } from "react-native";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const AddButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    backgroundColor: colors.white,
    borderColor: colors.darkgrey,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    margin: 10,
  },
  text: {
    textAlign: "center",
    color: colors.darkgrey,
    fontSize: 13,
    fontFamily: fonts.SpaceMonoR,
  },
});
