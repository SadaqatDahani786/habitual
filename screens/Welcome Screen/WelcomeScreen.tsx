import { StyleSheet, View } from "react-native";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Circle from "./../../components/Circle/Circle";
import Button from "../../components/Buttons/Button";
import Storefront from "../../components/Illustrations/Storefront";
import Link from "../../components/Link";
import Logo from "../../components/Logo";
import Typography from "../../components/Typography";

/**
 ** ============================================================================
 ** Component [WelcomeScreen]
 ** ============================================================================
 */
const WelcomeScreen = () => {
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
        />
        <View style={styles.buttonWrapper}>
          <Typography variant="bodyMd">Already have an account?</Typography>
          <Link color="dark" text="Log In" />
        </View>
      </View>
    </View>
  );
};
export default WelcomeScreen;
