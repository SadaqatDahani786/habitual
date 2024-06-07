import { useState } from "react";
import { Image, StyleSheet, View, FlatList, Alert } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { FirebaseError } from "firebase/app";
import useFirebase from "../../hooks/useFirebase";

//App Theme & Types
import AppTheme from "../../theme/appTheme";
import { RootStackParamList } from "../../App";

//UI Components
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card/Card";
import Typography from "../../components/Typography";

/**
 ** ============================================================================
 ** Interface [SignupScreen05Props]
 ** ============================================================================
 */
interface SignupScreen05Props
  extends NativeStackScreenProps<RootStackParamList, "SignupScreen05"> {}
{
}

/**
 ** ============================================================================
 ** Component [SignupScreen05]
 ** ============================================================================
 */
const SignupScreen05 = ({ route, navigation }: SignupScreen05Props) => {
  /**
   ** **
   ** ** ** State & Hooks
   ** **
   */
  const [interests, setInterests] = useState([
    {
      id: 1,
      title: "Books",
      image:
        "https://www.transparentpng.com/thumb/book/hfU1gl-book-transparent-background.png",
      checked: false,
    },
    {
      id: 2,
      title: "Electronics",
      image:
        "https://www.transparentpng.com/thumb/-iphone-x/DTctGB-iphone-transparent-shop.png",
      checked: false,
    },
    {
      id: 3,
      title: "Fashion",
      image:
        "https://www.transparentpng.com/thumb/fashion/fashion-clipart-hd-3.png",
      checked: false,
    },
    {
      id: 4,
      title: "Gaming",
      image:
        "https://www.transparentpng.com/thumb/xbox/xbox-transparent-19.png",
      checked: false,
    },
    {
      id: 5,
      title: "Music",
      image: "https://www.transparentpng.com/thumb/music/gold-music-png-19.png",
      checked: false,
    },
  ]);
  const { auth, db } = useFirebase();
  const [loadingState, setLoadingState] = useState(false);

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
      flex: 4,
      display: "flex",
      justifyContent: "center",
      paddingBottom: AppTheme.spacer(2) as number,
    },
    skipButton: {
      flex: 1,
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
    wr: {
      margin: AppTheme.spacer(1) as number,
      height: 200,
    },
  });

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  //Handle checkboxes state
  const checkboxHandler = (id: number) => {
    setInterests((state) =>
      state.map((cb) => {
        if (cb.id === id) cb.checked = !cb.checked;
        return cb;
      })
    );
  };

  //Handle user signup
  const handleUserSignup = async (
    userProfile: {
      email: string;
      password: string;
      photo: string;
      displayName: string;
      joiningReasons: string[];
      interests: string[];
    } = {
      email: "",
      password: "",
      displayName: "",
      joiningReasons: [],
      photo: "",
      interests: [],
    }
  ) => {
    try {
      //1) Set loading state to true
      setLoadingState(true);

      //2) Signup user with email and password
      const user = await createUserWithEmailAndPassword(
        auth,
        userProfile.email,
        userProfile.password
      );

      //3) Update displayName and profile photo
      await updateProfile(user.user, {
        displayName: userProfile.displayName,
        photoURL: userProfile.photo,
      });

      //4) Create user reasons to join the app object
      const reasons: Record<number, { reason: string }> = {};
      userProfile.joiningReasons.map((reason, ind) => {
        reasons[ind] = { reason: reason };
      });

      //5) Create user picked interests object
      const interests: Record<number, { category: string }> = {};
      userProfile.interests.map((cat, ind) => {
        interests[ind] = { category: cat };
      });

      //6) Set reasons and interests on users collection
      await set(ref(db, "users/" + user.user.uid + "/"), {
        joiningReasons: reasons,
        interests: interests,
      });

      //7) Navigate to home screen
      navigation.navigate("HomeScreens");
    } catch (error: unknown) {
      //==> Set loading state to false
      setLoadingState(false);

      //=> Duplicate email
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        return Alert.alert(
          "Error Occured!",
          `Please use a different email address, email "${userProfile.email}" already exist.`
        );
      }

      //=> Unknown error
      Alert.alert(
        "Error Occured!",
        "Something went wrong with creating account, please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.skipButton}>
        <Typography variant="h5">STEP 5 OF 5</Typography>
      </View>
      <View style={styles.header}>
        <View style={styles.wrapper}>
          <Typography variant="h2">
            Get started by picking some interests.
          </Typography>
        </View>
        <FlatList
          numColumns={2}
          style={styles.wrapper}
          data={interests}
          renderItem={({ item }) => (
            <View style={styles.wr}>
              <Card
                onPress={() => checkboxHandler(item.id)}
                color="secondary"
                variant={item.checked ? "solid" : "outlined"}
                size="md"
              >
                <Typography variant="h4">{item.title}</Typography>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    resizeMode: "contain",
                  }}
                />
              </Card>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Let's get started"
          variant="solid"
          color="primary"
          loading={loadingState}
          onPress={() => {
            //1) Don't go furher, unless interests are picked
            if (interests.filter((interest) => interest.checked).length < 3) {
              return Alert.alert(
                "No Interests Picked!",
                `Please pick few interest, so we can give better recommendations to your likings.`
              );
            }

            //2) Handle user signup
            handleUserSignup({
              ...route.params,
              interests: interests
                .filter((interest) => interest.checked)
                .map((interest) => interest.title),
            });
          }}
        />
        <Button
          title="Back"
          variant="outlined"
          color="primary"
          onPress={() =>
            navigation.navigate("SignupScreen04", { ...route.params })
          }
        />
      </View>
    </View>
  );
};

export default SignupScreen05;
