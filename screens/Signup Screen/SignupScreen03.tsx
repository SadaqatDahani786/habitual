import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";
import IconButton from "../../components/Buttons/IconButton";
import IconOutlined from "../../components/Icons/IconOutlined";
import Link from "../../components/Link";

//SignupScreen03 Props
interface SignupScreen03Props {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [SignupScreen03]
 ** ============================================================================
 */
const SignupScreen03 = ({ navigation }: SignupScreen03Props) => {
  /*
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [profileImage, setProfileImage] = useState("");

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  const imagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
    image: { width: "100%", height: "100%" },
    textOrWrapper: {
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
    linkSkip: {
      marginTop: AppTheme.spacer(4) as number,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.skipButton}>
        <Typography variant="h5">STEP 3 OF 5</Typography>
      </View>
      <View style={styles.header}>
        <View style={styles.wrapper}>
          <Typography variant="h2">
            Let other members know who you are.
          </Typography>
        </View>
        <View style={styles.wrapper}>
          <Typography variant="bodyMd">
            Please upload a photo so people can recognise you.
          </Typography>
        </View>
        <View style={styles.wrapper}>
          <IconButton
            onPress={imagePicker}
            icon={
              profileImage ? (
                <Image style={styles.image} source={{ uri: profileImage }} />
              ) : (
                <IconOutlined color="secondary" name="user" />
              )
            }
            color="secondary"
            variant="outlined"
          />
          <Typography variant="bodySm">Select photo</Typography>
        </View>
        <View style={styles.linkSkip}>
          <Link text="Skip this step for now" />
        </View>
      </View>
      <View style={styles.textOrWrapper}>
        <View style={styles.hr} />
        <View style={styles.text}>
          <Typography variant="bodySmAlt" color="dark">
            or
          </Typography>
        </View>
        <View style={styles.hr} />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Continue"
          variant="solid"
          color="primary"
          onPress={() => navigation.navigate("SignupScreen04")}
        />
        <Button
          title="Back"
          variant="outlined"
          color="primary"
          onPress={() => navigation.navigate("SignupScreen02")}
        />
      </View>
    </View>
  );
};

export default SignupScreen03;
