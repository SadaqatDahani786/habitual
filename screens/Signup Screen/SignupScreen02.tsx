import { View, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";

//App Theme & Types
import AppTheme from "../../theme/appTheme";
import { RootStackParamList } from "../../App";

//UI Components
import Button from "../../components/Buttons/Button";
import Textfield from "../../components/Textfield";
import Typography from "../../components/Typography";

/**
 ** ============================================================================
 ** Interface [SignupScreen02Props]
 ** ============================================================================
 */
interface SignupScreen02Props
  extends NativeStackScreenProps<RootStackParamList, "SignupScreen02"> {}

/**
 ** ============================================================================
 ** Component [SignupScreen02]
 ** ============================================================================
 */
const SignupScreen02 = ({ route, navigation }: SignupScreen02Props) => {
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
    <Formik
      initialValues={{
        email: "",
        password: "",
        password_confirm: "",
      }}
      onSubmit={({ email, password }) => {
        navigation.navigate("SignupScreen03", {
          email,
          password,
          displayName: route.params.displayName,
        });
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Please provide a valid email address.")
          .required("What's your email address"),
        password: Yup.string()
          .min(8, "Password must be 8 characters or more.")
          .required("Please provide a password."),
        password_confirm: Yup.string()
          .required("Please confirm your password")
          .oneOf([Yup.ref("password")], "Password must match"),
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
        <View style={styles.container}>
          <View style={styles.skipButton}>
            <Typography variant="h5">STEP 2 OF 5</Typography>
          </View>
          <View style={styles.header}>
            <View>
              <View style={styles.wrapper}>
                <Typography variant="h2">
                  Hey {route.params.displayName}, nice to meet you!
                </Typography>
              </View>
              <View style={styles.wrapper}>
                <Typography variant="bodyMd">
                  Please fill in your account details to continue
                </Typography>
              </View>
              <View style={styles.wrapper}>
                <Textfield
                  variant="outlined"
                  color="dark"
                  size="sm"
                  label="Email"
                  value={values.email}
                  onTextChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  helperText={errors.email}
                  error={errors.email !== "" && touched.email}
                />
              </View>
              <View style={styles.wrapper}>
                <Textfield
                  variant="outlined"
                  color="dark"
                  size="sm"
                  label="Password"
                  inputType="password"
                  value={values.password}
                  onTextChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  helperText={errors.password}
                  error={errors.password !== "" && touched.password}
                />
              </View>
              <View style={styles.wrapper}>
                <Textfield
                  variant="outlined"
                  color="dark"
                  size="sm"
                  label="Confirm Password"
                  inputType="password"
                  value={values.password_confirm}
                  onTextChange={handleChange("password_confirm")}
                  onBlur={handleBlur("password_confirm")}
                  helperText={errors.password_confirm}
                  error={
                    errors.password_confirm !== "" && touched.password_confirm
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <Button
              title="Continue"
              variant="solid"
              color="primary"
              onPress={handleSubmit}
            />
            <Button
              title="Back"
              variant="outlined"
              color="primary"
              onPress={() => navigation.navigate("SignupScreen")}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignupScreen02;
