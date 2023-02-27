import { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//UI Componsnts
import Button from "../../components/Buttons/Button";
import ButtonBase from "../../components/Buttons/ButtonBase";
import Typography from "../../components/Typography";
import IconOutlined from "../../components/Icons/IconOutlined";
import { Picker } from "@react-native-picker/picker";
import AppTheme from "../../theme/appTheme";
import RangeSliderPrice from "../../components/RangeSliderPrice";
import Card from "../../components/Card";

//OrdersFilterScreen Props
interface OrdersFilterScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [OrdersFilterScreen]
 ** ============================================================================
 */
const OrdersFilterScreen = ({ navigation }: OrdersFilterScreenProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [selectedTimeframe, setSelectedTimeframe] = useState("all-time");
  const [checkboxButtons, setCheckboxButtons] = useState([
    {
      title: "All Orders",
      status: true,
    },
    {
      title: "In Transit",
      status: false,
    },
    {
      title: "Delivered",
      status: false,
    },
    {
      title: "Canceled",
      status: false,
    },
  ]);
  const priceRangeMin = useRef(0);
  const priceRangeMax = useRef(1000);

  /**
   ** **
   ** ** ** OrdersFilterScreen Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: AppTheme.spacer(3) as number,
      width: "100%",
      height: "100%",
    },
    filter: {
      width: "100%",
      height: 180,
      paddingVertical: AppTheme.spacer(3) as number,
    },
    title: {
      paddingBottom: AppTheme.spacer(1) as number,
    },
    cardInnerWrapper: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    buttonWrapper: {
      width: 140,
      paddingRight: AppTheme.spacer(1) as number,
      paddingBottom: AppTheme.spacer(1) as number,
    },
    button: {
      width: "100%",
      paddingBottom: AppTheme.spacer(3) as number,
      paddingTop: AppTheme.spacer(8) as number,
    },
    pickerWrapper: {
      marginVertical: AppTheme.spacer(1) as number,
      borderWidth: 1,
      borderColor: AppTheme.pallete.ui.gray.light,
    },
  });

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Close Button Hander
  const pressCloseButtonHandler = () => {
    navigation.goBack();
  };

  //Set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Filters",
      headerShown: true,
      animation: "slide_from_bottom",
      headerLeft: () => (
        <View style={{ paddingRight: AppTheme.spacer(5) as number }}>
          <ButtonBase showRipple="false" onPress={pressCloseButtonHandler}>
            <IconOutlined color="dark" name="x" size="md" />
          </ButtonBase>
        </View>
      ),
    });
  }, []);

  //Checkbox Button Select Handler
  const checkboxButtonSelectHandler = (index: number) => {
    //1) Make changes w/o mutating state
    const updState = checkboxButtons.map((cb, i) => {
      if (i === index) cb.status = true;
      else cb.status = false;
      return cb;
    });

    //2) Set new state
    setCheckboxButtons(updState);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" backgroundColor={undefined} />
      <View style={styles.filter}>
        <Typography style={styles.title} variant="h5">
          TIMEFRAME
        </Typography>
        <Card fullWidth="true" disabled={true} color="light">
          <View style={styles.cardInnerWrapper}>
            <View style={styles.pickerWrapper}>
              <Picker
                mode="dialog"
                prompt="Select Option"
                selectedValue={selectedTimeframe}
                onValueChange={(val) => setSelectedTimeframe(val)}
              >
                <Picker.Item label="All time" value="all-time" />
                <Picker.Item label="Today" value="today" />
                <Picker.Item label="Past 7 days" value="past-7-days" />
                <Picker.Item label="This month" value="this-month" />
                <Picker.Item label="Past 3 months" value="past-3-months" />
                <Picker.Item label="Past 6 months" value="past-6-months" />
                <Picker.Item label="This year" value="this-year" />
              </Picker>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.filter}>
        <Typography style={styles.title} variant="h5">
          CATEGORY
        </Typography>
        <Card fullWidth="true" disabled={true} color="light">
          <View style={styles.cardInnerWrapper}>
            <View style={styles.row}>
              {checkboxButtons.map((btn, i) => (
                <View key={i} style={styles.buttonWrapper}>
                  <Button
                    roundedCorners="full"
                    fullWidth={true}
                    variant={btn.status ? "solid" : "outlined"}
                    size="sm"
                    title={btn.title}
                    onPress={() => checkboxButtonSelectHandler(i)}
                  />
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.filter}>
        <Typography style={styles.title} variant="h5">
          PRICE PAID
        </Typography>
        <Card fullWidth="true" disabled={true} color="light">
          <View style={styles.cardInnerWrapper}>
            <RangeSliderPrice
              min={[priceRangeMin.current][0]}
              max={[priceRangeMax.current][0]}
              onChange={(values) => {
                priceRangeMin.current = values[0];
                priceRangeMax.current = values[1];
              }}
            />
          </View>
        </Card>
      </View>
      <View style={styles.button}>
        <Button variant="solid" title="Show Results" fullWidth="true" />
      </View>
    </ScrollView>
  );
};

export default OrdersFilterScreen;
