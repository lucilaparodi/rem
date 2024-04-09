import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";
import { useLoginMutation } from "../app/services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { loginSchema } from "../utils/validations/authSchema";
import { deleteSession, insertSession } from "../utils/db";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerLogin] = useLoginMutation();

  const onSubmit = async () => {
    try {
      loginSchema.validateSync({ email, password });
      const { data } = await triggerLogin({ email, password });
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

      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.sub1}>sign in now to access rem beauty shopping</Text>
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
        <SubmitButton onPress={onSubmit} title="log in" />

        <Pressable
          style={styles.underline}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.sub}>don´t have an account? </Text>
          <Text style={styles.subLink}>create</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
    height: "100%",
  },
  underline: {
    flexDirection: "row",
  },
  container: {
    width: "90%",
    backgroundColor: colors.moregrey,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
