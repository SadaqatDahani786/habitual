import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

//Screens
import WelcomeScreen from "./screens/Welcome Screen";

//Fonts
import Inter from "./assets/fonts/Inter.ttf";
import InterSemiBold from "./assets/fonts/Inter-SemiBold.ttf";

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

  /**
   ** **
   ** ** ** WelcomeScreen Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 16,
      color: "black",
    },
  });

  //Font Loading
  if (!fontsLoaded) return;

  return (
    <View style={styles.container}>
      <WelcomeScreen />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
