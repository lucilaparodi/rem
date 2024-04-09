import { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import AddButton from "../components/AddButton";
import * as ImagePicker from "expo-image-picker";
import { useGetImageQuery, usePutImageMutation } from "../app/services/profile";
import { useSelector } from "react-redux";
import colors from "../utils/globals/colors";
import Error from "../components/Error";

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [triggerImage] = usePutImageMutation();
  const localId = useSelector((state) => state.auth.localId);
  const { data, isSuccess, isLoading, isError } = useGetImageQuery(localId);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <Error
        message="error 404"
        textButton="go back"
        onRetry={() => navigation.goBack()}
      />
    );

  useEffect(() => {
    if (isSuccess && data) setImage(data.image);
  }, [isSuccess, data]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [6, 4],
        quality: 0.3,
        base64: true,
      });

      if (!result.canceled) {
        setImage("data:image/jpeg;base64," + result.assets[0].base64);
      }
    }
  };

  const confirmImage = () => {
    triggerImage({ image, localId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require("../../assets/user2.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <AddButton title="take a photo" onPress={pickImage} />
      <AddButton title="confirm" onPress={confirmImage} />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginVertical: 15,
  },
});
