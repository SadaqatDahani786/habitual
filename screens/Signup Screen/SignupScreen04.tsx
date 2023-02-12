import { useState } from "react";
import { View, StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";

//SignupScreen04 Props
interface SignupScreen04Props {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [SignupScreen04]
 ** ============================================================================
 */
const SignupScreen04 = ({ navigation }: SignupScreen04Props) => {
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
          onPress={() => navigation.navigate("SignupScreen05")}
        />
        <Button
          title="Back"
          variant="outlined"
          color="primary"
          onPress={() => navigation.navigate("SignupScreen03")}
        />
      </View>
    </View>
  );
};

export default SignupScreen04;
