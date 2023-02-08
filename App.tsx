import { useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import WelcomeScreen from "./screens/Welcome Screen";
import OnboardingScreen from "./screens/Onboarding Screen";
import LoginScreen from "./screens/Login Screen";

//Fonts
import Inter from "./assets/fonts/Inter.ttf";
import InterSemiBold from "./assets/fonts/Inter-SemiBold.ttf";

//Navigators
const Stack = createNativeStackNavigator();

/**
 ** ============================================================================
 ** Component [App]
 ** ============================================================================
 */
const App = () => {
  /*
   ** **
   ** ** ** Start & Vars
   ** **
   */
  const [fontsLoaded] = useFonts({
    Inter,
    InterSemiBold,
  });

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  //Keep showing splash screen until fonts are loaded
  useEffect(() => {
    if (!fontsLoaded) preventAutoHideAsync();
    else hideAsync();
  }, [fontsLoaded]);

  //Font Loading
  if (!fontsLoaded) return;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
