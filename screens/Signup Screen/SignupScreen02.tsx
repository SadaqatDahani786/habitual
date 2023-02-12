import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Button from "../../components/Buttons/Button";
import Textfield from "../../components/Textfield";
import Typography from "../../components/Typography";

//SignupScreen02 Props
interface SignupScreen02Props {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [SignupScreen02]
 ** ============================================================================
 */
const SignupScreen02 = ({ navigation }: SignupScreen02Props) => {
  /*
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      padding: AppTheme.spacer(3) as number,
    },
    wrapper: {
      paddingBottom: 16,
    },
    header: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    skipButton: {
      marginTop: 24,
      display: "flex",
      alignItems: "flex-end",
    },
    buttonGroup: {
      width: "100%",
      display: "flex",
      height: 120,
      justifyContent: "space-between",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.skipButton}>
        <Typography variant="h5">STEP 2 OF 5</Typography>
      </View>
      <View style={styles.header}>
        <View>
          <View style={styles.wrapper}>
            <Typography variant="h2">Hey Leslie, nice to meet you!</Typography>
          </View>
          <View style={styles.wrapper}>
            <Typography variant="bodyMd">
              Please fill in your login details to continue
            </Typography>
          </View>
          <View style={styles.wrapper}>
            <Textfield variant="outlined" color="dark" size="sm" label="Emai" />
          </View>
          <View style={styles.wrapper}>
            <Textfield
              variant="outlined"
              color="dark"
              size="sm"
              label="Password"
            />
          </View>
          <View style={styles.wrapper}>
            <Textfield
              variant="outlined"
              color="dark"
              size="sm"
              label="Confirm Password"
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Continue"
          variant="solid"
          color="primary"
          onPress={() => navigation.navigate("SignupScreen03")}
        />
        <Button
          title="Back"
          variant="outlined"
          color="primary"
          onPress={() => navigation.navigate("SignupScreen")}
        />
      </View>
    </View>
  );
};

export default SignupScreen02;
