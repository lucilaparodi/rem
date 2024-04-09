import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import MapPreview from "../components/MapPreview";
import AddButton from "../components/AddButton";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import colors from "../utils/globals/colors";
import fonts from "../utils/globals/fonts";
import { usePutUserLocationMutation } from "../app/services/profile";
import LoadingSpinner from "../components/LoadingSpinner";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [address, setAddress] = useState("");
  const localId = useSelector((state) => state.auth.localId);
  const [loading, setLoading] = useState(false);
  const [triggerUserLocation] = usePutUserLocationMutation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("error");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (location.latitude) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyBZqzZA0p5UcIOMFy1EPedsCjAJE5rrtPQ`
        );
        const data = await response.json();
        setAddress(data.results[0].formatted_address);
      }
    })();
  }, [location]);

  const onConfirmAddress = async () => {
    const locationFormatted = {
      address,
      location,
    };
    await triggerUserLocation({ localId, locationFormatted });
    navigation.goBack();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text}>{address}</Text>
        <MapPreview
          latitude={location.latitude}
          longitude={location.longitude}
        />
        <AddButton title="confirm location" onPress={onConfirmAddress} />
      </View>
    </View>
  );
};

export default LocationSelector;

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
