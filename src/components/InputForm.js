import { StyleSheet, Text, View, TextInput } from "react-native";
import fonts from "../utils/globals/fonts";
import colors from "../utils/globals/colors";

const InputForm = ({
  label,
  value,
  onChangeText,
  isSecure,
  error,
  placeholder,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={isSecure}
      />
      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "90%",
    height: 40,
    padding: 10,
    borderWidth: 0,
    borderWidth: 1,
    borderColor: colors.darkgrey,
    padding: 2,
    backgroundColor: colors.grey,
    fontFamily: fonts.RobotoI,
    fontSize: 14,
    marginHorizontal: "5%",
    marginVertical: 10,
  },
  titleInput: {
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: fonts.RobotoB,
  },
  error: {
    fontSize: 11,
    color: colors.pink,
    fontFamily: fonts.RobotoI,
    fontStyle: "italic",
    marginLeft: 20,
  },
});
