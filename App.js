import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { fontCollection } from "./src/utils/globals/fonts";
import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

export default function App() {
  const [fontsLoaded] = useFonts(fontCollection);

  if (!fontsLoaded) return null;
  return (
    <>
      <Provider store={store}>
        <MainNavigator></MainNavigator>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
