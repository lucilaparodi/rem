import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";
import { useRegisterMutation } from "../app/services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { registerSchema } from "../utils/validations/authSchema";
import { deleteSession, insertSession } from "../utils/db";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [triggerRegister] = useRegisterMutation();

  const onSubmit = async () => {
    try {
      registerSchema.validateSync({ email, password, confirmPassword });
      const { data } = await triggerRegister({ email, password });
      deleteSession();
      insertSession(data);
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
    } catch (error) {
      setErrorEmail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.sub1}>enter your information</Text>
      <View style={styles.container}>
        <InputForm
          placeholder="  email adress*"
          label="Email"
          value={email}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error={errorEmail}
        />
        <InputForm
          placeholder="  password*"
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error={errorPassword}
        />
        <InputForm
          placeholder="  confirm password*"
          label="Confirmar Password"
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
          isSecure={true}
          error={errorConfirmPassword}
        />
        <SubmitButton onPress={onSubmit} title="create account" />
        <Pressable
          style={styles.underline}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.sub}>already have an account? </Text>
          <Text style={styles.subLink}>log in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
  },
  container: {
    width: "90%",
    backgroundColor: colors.moregrey,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  underline: {
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.SpaceMonoR,
  },
  sub: {
    fontSize: 12,
    fontFamily: fonts.RobotoI,
    color: colors.darkgrey,
  },
  sub1: {
    fontSize: 12,
    fontFamily: fonts.RobotoI,
    color: colors.darkgrey,
    paddingBottom: 10,
  },
  subLink: {
    fontSize: 12,
    fontFamily: fonts.RobotoR,
    color: colors.black,
    textDecorationLine: "underline",
  },
});
