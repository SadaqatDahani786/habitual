import { StyleSheet, View } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Component
import Button from "../../components/Buttons/Button";
import IconFilled from "../../components/Icons/IconFilled";
import Textfield from "../../components/Textfield";
import Typography from "../../components/Typography";
import Link from "../../components/Link";

/**
 ** ============================================================================
 ** Interface [SignupScreenProps]
 ** ============================================================================
 */
interface SignupScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [SignupScreen]
 ** ============================================================================
 */
const SignupScreen = ({ navigation }: SignupScreenProps) => {
  /*
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
      display: "flex",
      alignItems: "flex-end",
    },
    steps: {
      marginTop: AppTheme.spacer(5) as number,
    },
    signupForm: {
      width: "100%",
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainHeading: {
      paddingBottom: AppTheme.spacer(3) as number,
    },
    socialButtons: {
      width: "100%",
      height: 130,
      justifyContent: "space-between",
    },
    hr: {
      flex: 1,
      height: 2,
      borderRadius: 8,
      backgroundColor: AppTheme.pallete.ui.gray.light,
      marginVertical: AppTheme.spacer(2) as number,
    },
    text: {
      paddingHorizontal: AppTheme.spacer(1) as number,
    },
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: AppTheme.spacer(1) as number,
    },
    spacer: {
      width: "100%",
      paddingVertical: AppTheme.spacer(2) as number,
    },
    wrapperLogin: {
      paddingTop: AppTheme.spacer(2) as number,
    },
  });

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  const pressLoginHandler = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupForm}>
        <View style={styles.mainHeading}>
          <Typography variant="h1">Welcome!</Typography>
        </View>
        <Typography variant="h2">What should we call you?</Typography>
        <Formik
          initialValues={{
            displayName: "",
          }}
          onSubmit={({ displayName }) => {
            navigation.navigate("SignupScreen02", { displayName: displayName });
          }}
          validationSchema={Yup.object({
            displayName: Yup.string()
              .max(15, "Name must not be longer than 15 characters.")
              .required("Please tell us who you are?"),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <View style={styles.spacer}>
                <Textfield
                  size="sm"
                  variant="outlined"
                  color="dark"
                  placeholder="Your name"
                  value={values.displayName}
                  onTextChange={handleChange("displayName")}
                  onBlur={handleBlur("displayName")}
                  helperText={errors.displayName}
                  error={errors.displayName !== "" && touched.displayName}
                />
              </View>
              <Button
                color="primary"
                variant="solid"
                title="Get started"
                fullWidth="true"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.hr} />
        <View style={styles.text}>
          <Typography variant="bodySmAlt" color="dark">
            or
          </Typography>
        </View>
        <View style={styles.hr} />
      </View>
      <View style={styles.socialButtons}>
        <Button
          fullWidth="true"
          roundedCorners="full"
          variant="outlined"
          iconStart={<IconFilled color="primary" name="google" />}
          title="Continue with Google"
        />
        <Button
          fullWidth="true"
          roundedCorners="full"
          variant="outlined"
          iconStart={<IconFilled color="primary" name="apple" />}
          title="Continue with Apple"
        />
      </View>
      <View style={[styles.wrapper, styles.wrapperLogin]}>
        <Typography variant="bodySm">Already have an account?</Typography>
        <View style={styles.text}>
          <Link text="Log In" size="sm" onPress={pressLoginHandler} />
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
