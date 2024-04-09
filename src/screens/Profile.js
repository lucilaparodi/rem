import { StyleSheet, Text, View, Image } from "react-native";
import AddButton from "../components/AddButton";
import { useSelector } from "react-redux";
import fonts from "../utils/globals/fonts";
import {
  useGetImageQuery,
  useGetUserLocationQuery,
} from "../app/services/profile";
import LoadingSpinner from "../components/LoadingSpinner";
import colors from "../utils/globals/colors";
import Error from "../components/Error";

const Profile = ({ navigation }) => {
  const localId = useSelector((state) => state.auth.localId);
  const { data: locationFormatted } = useGetUserLocationQuery(localId);
  const { data, isLoading, isError } = useGetImageQuery(localId);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <Error
        message="error 404"
        textButton="go back"
        onRetry={() => navigation.goBack()}
      />
    );
  return (
    <View style={styles.container}>
      <Image
        source={data ? { uri: data.image } : require("../../assets/user2.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.container2}>
        <Text style={styles.text}>{locationFormatted?.address}</Text>
        <AddButton
          title={"add photo"}
          onPress={() => navigation.navigate("ImageSelector")}
        />
        <AddButton
          title={"add adress"}
          onPress={() => navigation.navigate("LocationSelector")}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginVertical: 15,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: fonts.RobotoI,
    color: colors.darkgrey,
    textAlign: "center",
    marginVertical: 15,
  },
});
