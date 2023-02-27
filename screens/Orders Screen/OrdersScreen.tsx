import { useEffect, useRef } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Header from "../../Layouts/Header";
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card";
import IconFilled from "../../components/Icons/IconFilled";
import ProductCardHorizontal from "../../components/Product Card Horizontal";
import Textfield from "../../components/Textfield";
import Typography from "../../components/Typography";

//Hooks
import useAnimateStatusbarOnScroll from "../../hooks/useAnimateStatusbarOnScroll";

//Types
import { DeliveryStatus } from "../../components/Product Card Horizontal/ProductCardHorizontal";
import mapstyle from "./mapstyle";

//Orders Screen Props
interface OrdersScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [OrderScreen]
 ** ============================================================================
 */
const OrdersScreen = ({ navigation }: OrdersScreenProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [statusbarBgColorStatus, setStatusbarBgColorStatus] =
    useAnimateStatusbarOnScroll(120);
  const { height } = useWindowDimensions();

  //Ref
  const scrollY = useRef(new Animated.Value(0)).current;

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      setStatusbarBgColorStatus(Number.parseInt(JSON.stringify(scrollY)));
    });

    return unsubscribe;
  }, [navigation]);

  //ScrollHandler
  const onScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setStatusbarBgColorStatus(e.nativeEvent.contentOffset.y);
  };

  /**
   ** **
   ** ** ** OrdersScreens Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContent: {
      marginTop: -AppTheme.spacer(23) as number,
      flex: 1,
      minHeight: height - (300 - 180) - 55,
    },
    titleHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: AppTheme.spacer(3) as number,
    },
    buttonWrapper: {
      width: 100,
    },
    productWrapper: {
      height: 120,
    },
    map: {
      width: "100%",
      height: 100,
      marginTop: -37,
    },
    mapOverlay: {
      padding: AppTheme.spacer(1) as number,
      height: 30,
      backgroundColor: AppTheme.pallete.ui.gray.dark,
      borderRadius: 100,
      position: "absolute",
      bottom: AppTheme.spacer(1) as number,
      left: 0,
      zIndex: 10,
    },
  });

  /**
   ** **
   ** ** ** Dummy data
   ** **
   */
  //Products
  const products = [
    {
      id: 1,
      title: 'Apple 13"in Macbook Pro',
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 124.99,
      deliveryStatus: "PENDING" as DeliveryStatus,
      isStaffPicked: false,
    },
    {
      id: 2,
      title: "Apple Iphone 14 Plus Pro",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 999.0,
      deletedPrice: 1100.0,
      deliveryStatus: "DELIVERED" as DeliveryStatus,
      isStaffPicked: false,
    },
    {
      id: 3,
      title: "Apple Iphone 14 Plus Pro",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 999.0,
      deletedPrice: 1100.0,
      deliveryStatus: "CANCELED" as DeliveryStatus,
      isStaffPicked: false,
    },
    {
      id: 4,
      title: "Apple Iphone 14 Plus Pro",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 999.0,
      deletedPrice: 1100.0,
      deliveryStatus: "PENDING" as DeliveryStatus,
      isStaffPicked: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: false,
            listener: onScrollHandler,
          }
        )}
      >
        <StatusBar
          style="auto"
          backgroundColor={
            statusbarBgColorStatus
              ? AppTheme.pallete.primary.main
              : AppTheme.pallete.ui.white
          }
          animated={true}
          translucent={true}
        />
        <Header
          title="Orders"
          isLoggedIn={true}
          avatar="https://pbs.twimg.com/media/FkgquzMXgAIcsih?format=jpg&name=large"
        />
        <View style={styles.mainContent}>
          <Card fullWidth={true} color="light" disabled={true}>
            <Textfield
              size="sm"
              variant="outlined"
              color="dark"
              placeholder="Search for your orders"
              iconStart={<IconFilled size="sm" name="search" color="dark" />}
            />
            <View style={styles.titleHeader}>
              <Typography variant="h5">Filtered List</Typography>
              <View style={styles.buttonWrapper}>
                <Button
                  variant="outlined"
                  roundedCorners="full"
                  title="Filters"
                  size="sm"
                  onPress={() => navigation.navigate("OrdersFilterScreen")}
                />
              </View>
            </View>
            <View>
              {products.map((product) => (
                <View
                  style={[
                    styles.productWrapper,
                    {
                      height: product.deliveryStatus === "PENDING" ? 240 : 120,
                    },
                  ]}
                  key={product.id}
                >
                  <ProductCardHorizontal {...product} />
                  {product.deliveryStatus === "PENDING" && (
                    <>
                      <MapView
                        scrollEnabled={false}
                        mapType="standard"
                        style={styles.map}
                        initialRegion={{
                          latitude: 24.88390877673009,
                          longitude: 67.35650407499405,
                          latitudeDelta: 0.04,
                          longitudeDelta: 0.05,
                        }}
                        maxZoomLevel={20}
                        customMapStyle={mapstyle}
                      >
                        <Marker
                          coordinate={{
                            latitude: 24.88390877673009,
                            longitude: 67.35650407499405,
                          }}
                          title={"Gulshan-e-hadeed"}
                          description={"Ph-2"}
                        />
                      </MapView>
                      <View style={styles.mapOverlay}>
                        <Typography color="light" variant="bodySmAlt">
                          DELIVERY BY 08/08/21
                        </Typography>
                      </View>
                    </>
                  )}
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;
