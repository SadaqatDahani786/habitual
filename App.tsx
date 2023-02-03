import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

//Screens
import WelcomeScreen from "./screens/Welcome Screen";

/**
 ** ============================================================================
 ** Component [App]
 ** ============================================================================
 */
const App = () => {
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

  return (
    <View style={styles.container}>
      <WelcomeScreen />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
