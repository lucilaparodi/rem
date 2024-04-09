import { StyleSheet, Image } from "react-native";
import colors from "../utils/globals/colors";

const MapPreview = ({ latitude, longitude }) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
  &zoom=15
  &size=600x300
  &maptype=roadmap
  &markers=color:blue%7Clabel:S%7C${latitude},${longitude}
  &key=AIzaSyBZqzZA0p5UcIOMFy1EPedsCjAJE5rrtPQ`;

  // const mapPreviewUrl2 = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
  // &markers=color:blue%7Clabel:S%7C${latitude},${longitude}
  // &key=AIzaSyBZqzZA0p5UcIOMFy1EPedsCjAJE5rrtPQ&signature=lucila`;

  return (
    <Image
      source={
        latitude ? { uri: mapPreviewUrl } : require("../../assets/map.png")
      }
      style={styles.image}
    />
  );
};

export default MapPreview;

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
    marginVertical: 15,
  },
});
