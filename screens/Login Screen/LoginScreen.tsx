import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

//Nav
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

//LoginScreen Props
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
   ** ** ** State & Vars
   ** **
   */
  const [emailOrPass, setEmailOrPass] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Press Close Button Handler
  const pressCloseButtonHandler = () => {
    navigation.goBack();
  };

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
      <View style={styles.wrapper}>
        <Textfield
          value={emailOrPass}
          onTextChange={(text) => setEmailOrPass(text)}
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
          value={password}
          onTextChange={(text) => setPassword(text)}
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
          variant="solid"
          color="primary"
          fullWidth="true"
        />
      </View>
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
