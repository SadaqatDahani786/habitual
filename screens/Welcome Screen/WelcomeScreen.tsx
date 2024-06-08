import { StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Circle from "./../../components/Circle/Circle";
import Button from "../../components/Buttons/Button";
import Storefront from "../../components/Illustrations/Storefront";
import Link from "../../components/Link";
import Logo from "../../components/Logo";
import Typography from "../../components/Typography";

//Firebase
import useFirebase from "../../hooks/useFirebase";
import { useEffect } from "react";

//WelcomeScreen Props
interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [WelcomeScreen]
 ** ============================================================================
 */
const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  /**
   ** **
   ** ** ** State & Hooks
   ** **
   */
  const { auth } = useFirebase();

  /**
   ** **
   ** ** ** Events & Callbacks
   ** **
   */
  //Navigate to Home Screen if user logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => user && navigation.replace("HomeScreens")
    );

    return unsubscribe;
  }, []);

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Press Signup Button Handler
  const onPressSignupHandler = () => {
    navigation.navigate("OnboardingScreen");
  };

  //Press Login Button Handler
  const onPressLoginHandler = () => {
    navigation.navigate("LoginScreen");
  };

  /**
   ** **
   ** ** ** WelcomeScreen Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainContent: {
      flex: 1,
      alignSelf: "stretch",
      width: "100%",
      height: 300,
      justifyContent: "center",
      alignItems: "center",
    },
    textContent: {
      height: 70,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: AppTheme.spacer(4) as number,
    },
    buttonGroup: {
      paddingHorizontal: AppTheme.spacer(3) as number,
      width: "100%",
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: AppTheme.spacer(6) as number,
    },
    linkWrapper: {
      paddingLeft: AppTheme.spacer(1) as number,
    },
  });

  return (
    <View style={styles.container}>
      <Circle top={-200} right={-200} />
      <Circle top={50} left={-100} size="sm" color="success" />
      <Circle top={-100} left={-120} size="sm" color="secondary" />
      <View style={styles.mainContent}>
        <Storefront width="100%" height={200} />
        <View style={styles.textContent}>
          <Logo />
          <Typography variant="bodyLg">Whatever you love, we've it.</Typography>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          fullWidth="true"
          color="primary"
          variant="solid"
          title="Sign up"
          onPress={onPressSignupHandler}
        />
        <View style={styles.buttonWrapper}>
          <Typography variant="bodyMd">Already have an account?</Typography>
          <View style={styles.linkWrapper}>
            <Link color="dark" text="Log In" onPress={onPressLoginHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default WelcomeScreen;
