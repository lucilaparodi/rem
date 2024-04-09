import Header from "../components/Header";
import Profile from "../screens/Profile";
import ImageSelector from "./ImageSelector";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationSelector from "./LocationSelector";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => {
        return {
          header: () => {
            return <Header title="profile" navigation={navigation}></Header>;
          },
        };
      }}
    >
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen
        name="ImageSelector"
        component={ImageSelector}
      ></Stack.Screen>
      <Stack.Screen
        name="LocationSelector"
        component={LocationSelector}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;
