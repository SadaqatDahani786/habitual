import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

//App Theme & Types
import AppTheme from "../../theme/appTheme";
import { RootStackParamList } from "../../App";

//UI Components
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";

/**
 ** ============================================================================
 ** Interface [SignupScreen04Props]
 ** ============================================================================
 */

interface SignupScreen04Props
  extends NativeStackScreenProps<RootStackParamList, "SignupScreen04"> {}

/**
 ** ============================================================================
 ** Component [SignupScreen04]
 ** ============================================================================
 */
const SignupScreen04 = ({ route, navigation }: SignupScreen04Props) => {
  /*
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [buttonCheckboxes, setButtonCheckboxes] = useState([
    {
      id: 1,
      title: "discover new products",
      state: false,
      onPress: () => {
        updateCheckboxButtonState(0);
      },
    },
    {
      id: 2,
      title: "make monthly shopping easier",
      state: false,
      onPress: () => {
        updateCheckboxButtonState(1);
      },
    },
    {
      id: 3,
      title: "relevant recommendations",
      state: false,
      onPress: () => {
        updateCheckboxButtonState(2);
      },
    },
    {
      id: 4,
      title: "get notified deals",
      state: false,
      onPress: () => {
        updateCheckboxButtonState(3);
      },
    },
  ]);

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  //Update checkboxes status
  const updateCheckboxButtonState = (ind: number) => {
    const updatedState = buttonCheckboxes.map((btnChkbox, i) => {
      const updBtnChkbox = btnChkbox;
      if (i === ind) updBtnChkbox.state = !updBtnChkbox.state;
      return updBtnChkbox;
    });
    setButtonCheckboxes(updatedState);
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
      paddingBottom: AppTheme.spacer(2) as number,
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
        <Typography variant="h5">STEP 4 OF 5</Typography>
      </View>
      <View style={styles.header}>
        <View>
          <View style={styles.wrapper}>
            <Typography variant="h2">
              What's your main reason for joining?
            </Typography>
          </View>
          <View style={styles.wrapper}>
            <Typography variant="bodyMd">
              Select your choices, it will help us make great recommendations.
            </Typography>
          </View>
          {buttonCheckboxes.map((checkboxes) => (
            <View style={styles.wrapper} key={checkboxes.id}>
              <Button
                roundedCorners="full"
                onPress={checkboxes.onPress}
                title={checkboxes.title}
                variant={checkboxes.state ? "solid" : "outlined"}
                color="secondary"
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Continue"
          variant="solid"
          color="primary"
          onPress={() => {
            //1) If not any reason selected, return with alert message
            if (buttonCheckboxes.every((curr) => !curr.state))
              return Alert.alert(
                "No Reason Selected!",
                "Please pick atleast one reason for joining our app."
              );

            //2) Naviagate to next screen with props
            navigation.navigate("SignupScreen05", {
              ...route.params,
              joiningReasons: buttonCheckboxes
                .filter((curr) => curr.state)
                .map((curr) => curr.title),
            });
          }}
        />
        <Button
          title="Back"
          variant="outlined"
          color="primary"
          onPress={() =>
            navigation.navigate("SignupScreen03", { ...route.params })
          }
        />
      </View>
    </View>
  );
};

export default SignupScreen04;
