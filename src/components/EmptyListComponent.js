import { View, Text, StyleSheet } from "react-native";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";

const EmptyListComponent = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
  },
  errorMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: fonts.RobotoI,
  },
});

export default EmptyListComponent;
