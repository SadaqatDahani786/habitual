import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Logo from "../../components/Logo";
import ButtonBase from "../../components/Buttons/ButtonBase";
import IconOutlined from "../../components/Icons/IconOutlined";
import Textfield from "../../components/Textfield";
import Button from "../../components/Buttons/Button";
import Link from "../../components/Link";
import Typography from "../../components/Typography";
import IconFilled from "../../components/Icons/IconFilled";

//Firebase & Auth
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import useFirebase from "../../hooks/useFirebase";

/**
 ** ============================================================================
 ** Interface [LoginScreenProps]
 ** ============================================================================
 */
interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [LoginScreen]
 ** ============================================================================
 */
const LoginScreen = ({ navigation }: LoginScreenProps) => {
  /**
   ** **
   ** ** ** State & Hooks
   ** **
   */
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailAuthLoading, setIsEmailAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [isAppleAuthLoading, setIsAppleAuthLoading] = useState(false);

  const { auth } = useFirebase();

  /**
   ** **
   ** ** ** Effects
   ** **
   */
  //Navigate to home screen when login
  useEffect(() => {
    //1) Subscribe and listen to auth change
    const unsubscribe = auth.onAuthStateChanged(
      (user) =>
        user &&
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "HomeScreens" }],
          })
        )
    );

    //2) Clean up
    return unsubscribe;
  }, []);

  //Set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Login",
      headerShown: true,
      animation: "slide_from_bottom",
      headerLeft: () => (
        <View style={{ paddingRight: 40 }}>
          <ButtonBase showRipple="false" onPress={pressCloseButtonHandler}>
            <IconOutlined color="dark" name="x" size="md" />
          </ButtonBase>
        </View>
      ),
    });
  }, []);

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Press sign in with google
  const pressSignInWithGoole = async () => {
    if (process.env.EXPO_PUBLIC_ENVIRONMENT === "PRODUCTION") {
      try {
        //1) Set loading to true
        setIsGoogleAuthLoading(true);

        //2) Dynimally import GoogleSignin module or it won't work in expo go
        const { GoogleSignin } = await import(
          "@react-native-google-signin/google-signin"
        );

        //3) Configure google client id
        GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        });

        //4) Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });

        //5) Get the user id token
        const { idToken } = await GoogleSignin.signIn();

        //6) Create a Google credential with the token|
        const googleCredential = GoogleAuthProvider.credential(idToken);

        //7) SignIn with credentials to firebase
        await signInWithCredential(auth, googleCredential);
      } catch (error: unknown) {
        //=> Show error to user
        Alert.alert(
          "Login Failed!",
          "Failed to login with Google sign-in for unknown reason, please try again."
        );
      } finally {
        //=> Set loading to false
        setIsGoogleAuthLoading(false);
      }
    } else
      Alert.alert(
        "Unsupported!",
        "Google sign-in is only supported in production, run the app in production environment."
      );
  };

  //Handle login form submission
  const handleLoginFormSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      //1) Set loading to true
      setIsEmailAuthLoading(true);

      //2) Try to login with firebase
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      //=> Firebase error
      if (error instanceof FirebaseError) {
        //=> Inavlid login details
        if (error.code === "auth/invalid-credential")
          return Alert.alert(
            "Login Failed!",
            "Username or password is incorrect, please try again with correct login details."
          );

        //=> Unknown error
        Alert.alert(
          "Error Occured!",
          "Something went wrong, please try again once more."
        );
      }
    } finally {
      //=> Set loading to false
      setIsEmailAuthLoading(false);
    }
  };

  //Press close button handler
  const pressCloseButtonHandler = () => {
    navigation.goBack();
  };

  //Press signup button handler
  const pressSignupButtonHandler = () => {
    navigation.navigate("SignupScreen");
  };

  /**
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      padding: AppTheme.spacer(3) as number,
    },
    logoWrapper: {
      paddingVertical: AppTheme.spacer(4) as number,
    },
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: AppTheme.spacer(1) as number,
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo color="primary" variant="full" />
      </View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLoginFormSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Please enter a valid email address.")
            .required("What's your email address?"),
          password: Yup.string().required("What's your account password?"),
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
            <View style={styles.wrapper}>
              <Textfield
                value={values.email}
                onTextChange={handleChange("email")}
                onBlur={handleBlur("email")}
                helperText={errors.email}
                error={errors.email !== "" && touched.email}
                variant="outlined"
                color="dark"
                label="Username or email"
                inputType="email"
                size="sm"
                iconStart={<IconOutlined name="user" color="dark" />}
              />
            </View>
            <View style={styles.wrapper}>
              <Textfield
                value={values.password}
                onTextChange={handleChange("password")}
                onBlur={handleBlur("password")}
                helperText={errors.password}
                error={errors.password !== "" && touched.password}
                variant="outlined"
                color="dark"
                label="Password"
                inputType="password"
                showPassword={showPassword}
                size="sm"
                iconStart={<IconOutlined name="lock" color="dark" />}
                iconEnd={
                  <ButtonBase
                    showRipple="false"
                    onPress={() => setShowPassword((state) => !state)}
                  >
                    <IconOutlined
                      color="dark"
                      name={showPassword ? "eye" : "eye-off"}
                      size="sm"
                    />
                  </ButtonBase>
                }
              />
            </View>
            <View style={styles.wrapper}>
              <Button
                title="Login"
                disabled={
                  isGoogleAuthLoading || isAppleAuthLoading
                    ? "DISABLED"
                    : "DEFAULT"
                }
                loading={isEmailAuthLoading}
                variant="solid"
                color="primary"
                fullWidth="true"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
      <View style={styles.wrapper}>
        <Link text="Forgot password?" size="sm" />
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
      <View style={styles.wrapper}>
        <Button
          roundedCorners="full"
          fullWidth="true"
          iconStart={<IconFilled name="google" />}
          title="Continue with Google"
          disabled={
            isEmailAuthLoading || isAppleAuthLoading ? "DISABLED" : "DEFAULT"
          }
          loading={isGoogleAuthLoading}
          onPress={pressSignInWithGoole}
          variant="outlined"
          color="primary"
        />
      </View>
      <View style={styles.wrapper}>
        <Button
          roundedCorners="full"
          fullWidth="true"
          iconStart={<IconFilled name="apple" />}
          title="Continue with Apple"
          disabled={
            isEmailAuthLoading || isGoogleAuthLoading ? "DISABLED" : "DEFAULT"
          }
          loading={isAppleAuthLoading}
          variant="outlined"
          color="primary"
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.wrapper}>
          <Typography variant="bodySm">New to habitual?</Typography>
          <View style={styles.text}>
            <Link text="Sign up" size="sm" onPress={pressSignupButtonHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
