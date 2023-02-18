import { useState } from "react";
import { Image, StyleSheet, View, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card/Card";
import Typography from "../../components/Typography";

//SignupScreen05 Props
interface SignupScreen05Props {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [SignupScreen05]
 ** ============================================================================
 */
const SignupScreen05 = ({ navigation }: SignupScreen05Props) => {
  /**
   ** **
   ** ** ** State & Vars
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

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  const checkboxHandler = (id: number) => {
    setInterests((state) =>
      state.map((cb) => {
        if (cb.id === id) cb.checked = !cb.checked;
        return cb;
      })
    );
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
          title="Get started"
          variant="solid"
          color="primary"
          onPress={() => navigation.navigate("HomeScreens")}
        />
        <Button
          title="Back"
          variant="outlined"
          color="primary"
          onPress={() => navigation.navigate("SignupScreen04")}
        />
      </View>
    </View>
  );
};

export default SignupScreen05;
