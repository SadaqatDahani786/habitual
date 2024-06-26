import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { User, signOut } from "firebase/auth";

//App Theme & Types
import AppTheme from "../../theme/appTheme";
import { colors } from "../../theme/appThemeModel";
import { BottomTabParamList } from "../../App";

//UI Components
import Header from "../../Layouts/Header";
import Button from "../../components/Buttons/Button";
import IconButton from "../../components/Buttons/IconButton";
import IconFilled from "../../components/Icons/IconFilled";
import Link from "../../components/Link";
import Typography from "../../components/Typography";
import Card from "../../components/Card";
import ProductCard from "../../components/Product Card";
import ProductCardHorizontal from "../../components/Product Card Horizontal/ProductCardHorizontal";

//Custom Hooks
import useAnimateStatusbarOnScroll from "../../hooks/useAnimateStatusbarOnScroll";
import useFirebase from "../../hooks/useFirebase";

/**
 ** ============================================================================
 ** Interface [HomeProps]
 ** ============================================================================
 */
interface HomeProps
  extends BottomTabScreenProps<BottomTabParamList, "HomeScreen"> {}

/**
 ** ============================================================================
 ** Component [Home]
 ** ============================================================================
 */
const Home = ({ route, navigation }: HomeProps) => {
  /**
   ** **
   ** ** ** Dummy Data
   ** **
   */
  //Interests
  const interests = ["Gaming", "Tech", "Fashion", "Sports", "Music"];

  //Products
  const products = [
    {
      id: 1,
      title: 'Apple 13"in Macbook Pro',
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 124.99,
      // deletedPrice: 135.0,
      ratings: 5.0,
      numOfReviews: 245,
      isStaffPicked: true,
      categories: ["Tech", "Apple", "Electronics"],
      isWishlisted: true,
    },
    {
      id: 2,
      title: "Apple Iphone 14 Plus Pro",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 999.0,
      deletedPrice: 1100.0,
      ratings: 4.9,
      numOfReviews: 124,
      isStaffPicked: false,
      categories: ["Tech", "Apple", "Electronics"],
    },
  ];

  //Temp items in categories
  const productInCategories = [
    [
      {
        id: 1,
        title: "Sony Playstation 5 ",
        image:
          "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBsYXlzdGF0aW9uJTIwY29udHJvbGxlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 669.99,
        deletedPrice: 779.99,
        ratings: 4.9,
        isStaffPicked: true,
        isWishlisted: false,
      },
      {
        id: 2,
        title: "Nintendo Switch",
        image:
          "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        price: 136.99,
        deletedPrice: 149.99,
        ratings: 4.1,
        isStaffPicked: true,
        isWishlisted: false,
      },
      {
        id: 3,
        title: "Audionic Headphones",
        image:
          "https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        price: 69.99,
        deletedPrice: 75.99,
        ratings: 4.0,
        isStaffPicked: false,
        isWishlisted: false,
      },
    ],
    [
      {
        id: 4,
        title: "NFL Football",
        image:
          "https://plus.unsplash.com/premium_photo-1675706185690-ec1df49e6e34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        price: 44.99,
        ratings: 4.1,
        isStaffPicked: false,
        isWishlisted: false,
      },
      {
        id: 5,
        title: "T Boxing Gloves",
        image:
          "https://images.unsplash.com/photo-1509255929945-586a420363cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=697&q=80",
        price: 146.99,
        deletedPrice: 156.99,
        ratings: 4.2,
        isStaffPicked: true,
        isWishlisted: false,
      },
      {
        id: 6,
        title: "Cricket Bat & Ball",
        image:
          "https://plus.unsplash.com/premium_photo-1664304648020-9a7c78707186?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80",
        price: 44.99,
        deletedPrice: 49.99,
        ratings: 4.0,
        isStaffPicked: false,
        isWishlisted: false,
      },
    ],
    [
      {
        id: 7,
        title: "Iphone 14 Pro Max",
        image:
          "https://images.unsplash.com/photo-1663314326587-1c78fe2b7d5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        price: 1499.99,
        ratings: 4.9,
        isStaffPicked: true,
        isWishlisted: false,
      },
      {
        id: 8,
        title: "Airpods",
        image:
          "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        price: 299.99,
        deletedPrice: 345.99,
        ratings: 4.2,
        isStaffPicked: false,
        isWishlisted: false,
      },
      {
        id: 9,
        title: "Apple Smart Watch",
        image:
          "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
        price: 455.99,
        deletedPrice: 499.99,
        ratings: 4.6,
        isStaffPicked: true,
        isWishlisted: false,
      },
    ],
    [
      {
        id: 10,
        title: "Man Dark Blue Suit",
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fG1lbiUyMHN1aXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 99.99,
        ratings: 4.0,
        isStaffPicked: false,
        isWishlisted: false,
      },
      {
        id: 11,
        title: "Black Full Skirt Dress",
        image:
          "https://images.unsplash.com/photo-1599662875272-64de8289f6d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBkcmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 145.99,
        deletedPrice: 159.99,
        ratings: 4.1,
        isStaffPicked: false,
        isWishlisted: false,
      },
      {
        id: 12,
        title: "Nike Red Sneaker Shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        price: 345.0,
        deletedPrice: 375.99,
        ratings: 4.8,
        isStaffPicked: true,
        isWishlisted: false,
      },
    ],
    [
      {
        id: 13,
        title: "The Act Music Record",
        image:
          "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        price: 24.65,
        deletedPrice: 28.86,
        ratings: 4.0,
        isStaffPicked: false,
        isWishlisted: false,
      },
      {
        id: 14,
        title: "Leaon Bridges Coming Home",
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        price: 35.99,
        deletedPrice: 49.99,
        ratings: 4.4,
        isStaffPicked: true,
        isWishlisted: false,
      },
      {
        id: 15,
        title: "Dr Dre The Chronic",
        image:
          "https://images.unsplash.com/photo-1584679109594-56fffe50d527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
        price: 25.0,
        ratings: 3.6,
        isStaffPicked: false,
        isWishlisted: false,
      },
    ],
  ];

  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  //State
  const [pageIndex, setPageIndex] = useState(0);
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });
  const [user, setUser] = useState<User | undefined>();

  //Refs
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const refScroll = useRef<FlatList>(null);
  const refView = useRef<View>(null);

  //Custom Hooks
  const [statusbarBgColorStatus, setStatusbarBgColorStatus] =
    useAnimateStatusbarOnScroll();
  const { auth } = useFirebase();

  //Custom snap to offsets
  const customSnapToOffset = interests.map((_, i) => {
    return i * 90;
  });

  //Cards
  const cards = [
    {
      title: "Shopping habits and interests",
      color: "primary",
    },
    {
      title: "Today's trending items",
      color: "error",
    },
    {
      title: "Incoming! Flash deals",
      color: "warn",
    },
    {
      title: "Browse our categories",
      color: "success",
    },
  ];

  /**
   ** **
   ** ** ** Home Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainerStyle: {
      paddingRight: AppTheme.spacer(3) as number,
    },
    productList: {
      marginTop: -100,
      paddingLeft: AppTheme.spacer(3) as number,
    },
    dealsList: {
      marginTop: AppTheme.spacer(1) as number,
    },
    wrapper: {
      paddingHorizontal: AppTheme.spacer(3) as number,
      paddingVertical: AppTheme.spacer(2) as number,
    },
    interests: {
      padding: AppTheme.spacer(3) as number,
      paddingRight: AppTheme.spacer(3) as number,
    },
    headerTitle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: AppTheme.spacer(1) as number,
      paddingBottom: AppTheme.spacer(2) as number,
      paddingRight: AppTheme.spacer(3) as number,
    },
    interestsList: {
      elevation: 1,
      borderRadius: 8,
      backgroundColor: AppTheme.pallete.ui.white,
      overflow: "hidden",
      height: 400,
    },
    tag: {
      width: 90,
      height: 40,
    },
    sv: {
      width: "100%",
      marginTop: AppTheme.spacer(1) as number,
    },
    indicator: {
      width: 90 * 6,
      height: 2,
    },
    activeMarker: {
      width: 45,
      height: 1,
      backgroundColor: AppTheme.pallete.ui.gray.light,
    },
    cardGrid: {
      padding: AppTheme.spacer(3) as number,
    },
    cardGridRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    cardWrapper: {
      height: 180,
      marginBottom: AppTheme.spacer(3) as number,
      display: "flex",
    },
    iconWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  });

  /**
   ** **
   ** ** ** Side Effects
   ** **
   */
  //=> Set user, if logged in, else navigate to WelcomeScreen
  useEffect(() => {
    //1) Subscribe
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "WelcomeScreen" }],
          })
        );
    });

    //2) Clean up
    return unsubscribe;
  }, []);

  //=> Set statusbar bg color when "this" tab gets focused
  useEffect(() => {
    //1) Subscribe
    const unsubscribe = navigation.addListener("focus", (e) => {
      setStatusbarBgColorStatus(Number.parseInt(JSON.stringify(scrollY)));
    });

    //2) Clean up
    return unsubscribe;
  }, [navigation]);

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //OnPress interest item, scroll to it's position
  const scrollToItem = (ind: number): void => {
    const pos = customSnapToOffset[ind] - layout.width / 2 + 45;
    refScroll.current?.scrollToOffset({ offset: pos });

    setPageIndex(ind);
  };

  //Move active interests marker to it's right position
  const marginAnim = scrollX.interpolate({
    inputRange: customSnapToOffset,
    outputRange: customSnapToOffset.map(
      (c) => -(c - customSnapToOffset[pageIndex] - 20)
    ),
    extrapolate: "clamp",
  });

  //ScrollHandler
  const onScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setStatusbarBgColorStatus(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="auto"
        backgroundColor={
          statusbarBgColorStatus ? AppTheme.pallete.primary.main : undefined
        }
        animated={true}
        translucent={true}
      />
      <ScrollView
        bounces={false}
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
        style={[styles.container, { zIndex: 100, position: "relative" }]}
        nestedScrollEnabled={true}
      >
        <Header
          title="Find the stuff you love!"
          subtitle={"Take a look what we've found for you."}
          avatar={route.params?.photo || (user?.photoURL as string)}
          isLoggedIn={user ? true : false}
          onPressAvatar={() => signOut(auth)}
        />
        <View style={styles.productList}>
          <FlatList
            contentContainerStyle={styles.listContainerStyle}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            horizontal={true}
            data={products}
            renderItem={(item) => <ProductCard variant="reg" {...item.item} />}
          />
        </View>
        <View style={styles.wrapper}>
          <Button title="Discover More" variant="solid" />
        </View>
        <View style={styles.interests}>
          <View style={styles.headerTitle}>
            <Typography variant="bodySmAlt">{"YOUR INTERESTS"}</Typography>
            <Link size="sm" text="SEE MORE" />
          </View>
          {
            <View style={styles.interestsList}>
              <FlatList
                style={{ flexGrow: 0, paddingVertical: 8 }}
                snapToOffsets={customSnapToOffset}
                pagingEnabled={true}
                onLayout={(e) => setLayout(e.nativeEvent.layout)}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: { contentOffset: { x: scrollX } },
                    },
                  ],
                  {
                    useNativeDriver: false,
                  }
                )}
                horizontal={true}
                decelerationRate="fast"
                ref={refScroll}
                data={interests}
                renderItem={({ item, index }) => (
                  <View style={styles.tag}>
                    <Button
                      size="sm"
                      onPress={() => scrollToItem(index)}
                      fullWidth={true}
                      variant="plain"
                      title={item}
                    />
                  </View>
                )}
              />
              <View style={styles.indicator}>
                <Animated.View
                  ref={refView}
                  style={[
                    styles.activeMarker,
                    {
                      left: marginAnim,
                    },
                  ]}
                />
              </View>
              <ScrollView nestedScrollEnabled={true} style={styles.sv}>
                {productInCategories[pageIndex].map((item) => (
                  <View
                    style={{
                      height: 120,
                      paddingHorizontal: AppTheme.spacer(1) as number,
                    }}
                    key={item.id}
                  >
                    <ProductCardHorizontal {...item} />
                  </View>
                ))}
              </ScrollView>
            </View>
          }
        </View>
        <View style={styles.cardGrid}>
          <View style={styles.cardGridRow}>
            {cards.map((card, i) => (
              <View key={i} style={styles.cardWrapper}>
                <Card color={card.color as colors}>
                  <Typography variant="h4">{card.title}</Typography>
                  <View style={styles.iconWrapper}>
                    <IconButton
                      size="sm"
                      variant="solid"
                      color="light"
                      icon={
                        <IconFilled
                          size="sm"
                          color="dark"
                          name="chevron-right"
                        />
                      }
                    />
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
