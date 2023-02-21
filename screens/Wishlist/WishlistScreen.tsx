import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//App theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Header from "../../Layouts/Header";
import Button from "../../components/Buttons/Button";
import Typography from "../../components/Typography";
import IconButton from "../../components/Buttons/IconButton";
import IconFilled from "../../components/Icons/IconFilled";
import Card from "../../components/Card";
import ProductCard from "../../components/Product Card";
import ProductCardHorizontal from "../../components/Product Card Horizontal";
import PopupMenu from "../../components/PopupMenu";

//Custom Hooks
import useAnimateStatusbarOnScroll from "../../hooks/useAnimateStatusbarOnScroll";

//Wishlist Screen Props
interface WishlistScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [WishlistScreen]
 ** ============================================================================
 */
const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [showOptions, setShowOptions] = useState([
    {
      uniqueIdentifier: 1,
      state: false,
    },
    {
      uniqueIdentifier: 2,
      state: false,
    },
  ]);
  const [statusbarBgColorStatus, setStatusbarBgColorStatus] =
    useAnimateStatusbarOnScroll();

  //Ref
  const scrollY = useRef(new Animated.Value(0)).current;

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
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 124.99,
      isStaffPicked: false,
      isWishlisted: true,
      showAddToCartButton: true,
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
      isStaffPicked: false,
      isWishlisted: true,
      showAddToCartButton: true,
    },
    {
      id: 3,
      title: "Apple Iphone 14 Plus Pro",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      price: 999.0,
      deletedPrice: 1100.0,
      isStaffPicked: false,
      isWishlisted: true,
      showAddToCartButton: true,
    },
  ];

  /**
   ** **
   ** ** ** WishlistScreen Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: { flex: 1 },
    containerListStyle: { paddingRight: 24 },
    wishlists: {
      margin: 24,
      marginBottom: 0,
      marginTop: -180,
    },
    wishlistItem: {
      height: 400,
      marginBottom: 24,
    },
    titleHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    productList: {
      // height: 300,
    },
    productWrapper: {
      height: 130,
    },
    buttonWrapper: {
      paddingHorizontal: 24,
    },
    recommendedProducts: {
      padding: 24,
      paddingRight: 0,
    },
    titleRecommend: {
      paddingVertical: 24,
    },
  });

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

  //Delete wishlist
  const onPressDeleteHandler = (uniqueIdentifier: number) => {
    Alert.alert(
      "Delete Wishlist!",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive" },
      ]
    );
    setShowOptions((state) =>
      state.map((option) => {
        option.state = false;
        return option;
      })
    );
  };

  //Edit wishlist
  const onPressEditHandler = (uniqueIdentifier: number) => {
    setShowOptions((state) =>
      state.map((option) => {
        option.state = false;
        return option;
      })
    );
  };

  return (
    <Pressable
      style={styles.container}
      disabled={showOptions.every((option) => option.state === false)}
      onPress={() =>
        setShowOptions((state) =>
          state.map((option) => {
            option.state = false;
            return option;
          })
        )
      }
    >
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
          <Header
            title="Wishlist"
            isLoggedIn={true}
            avatar="https://pbs.twimg.com/media/FkgquzMXgAIcsih?format=jpg&name=large"
          />
          <View style={styles.wishlists}>
            <View style={styles.wishlistItem}>
              <Card fullWidth="true" color="light" disabled={true}>
                <View style={styles.titleHeader}>
                  <Typography variant="h5">Personal</Typography>
                  <View>
                    <IconButton
                      onPress={() =>
                        setShowOptions((state) =>
                          state.map((option) => {
                            if (option.uniqueIdentifier === 1)
                              option.state = !option.state;
                            else option.state = false;
                            return option;
                          })
                        )
                      }
                      size="sm"
                      icon={
                        <IconFilled color="dark" size="sm" name="ellipsis-h" />
                      }
                    />
                    <PopupMenu
                      uniqueIdentifier={showOptions[0].uniqueIdentifier}
                      options={[
                        {
                          title: "Edit",
                          icon: "edit",
                          onPressOption: onPressEditHandler,
                        },
                        {
                          title: "Delete",
                          icon: "trash",
                          onPressOption: onPressDeleteHandler,
                        },
                      ]}
                      isVisible={showOptions[0].state}
                      color="secondary"
                    />
                  </View>
                </View>
                <ScrollView
                  style={styles.productList}
                  nestedScrollEnabled={true}
                >
                  {products.map((product) => (
                    <View style={styles.productWrapper} key={product.id}>
                      <ProductCardHorizontal
                        disabled={showOptions.some(
                          (option) => option.state === true
                        )}
                        {...product}
                      />
                    </View>
                  ))}
                </ScrollView>
              </Card>
            </View>
            <View style={styles.wishlistItem}>
              <Card fullWidth="true" color="light" disabled={true}>
                <View style={styles.titleHeader}>
                  <Typography variant="h5">Work + Home</Typography>
                  <View>
                    <IconButton
                      onPress={() =>
                        setShowOptions((state) =>
                          state.map((option) => {
                            if (option.uniqueIdentifier === 2)
                              option.state = !option.state;
                            else option.state = false;
                            return option;
                          })
                        )
                      }
                      size="sm"
                      icon={
                        <IconFilled color="dark" size="sm" name="ellipsis-h" />
                      }
                    />
                    <PopupMenu
                      uniqueIdentifier={showOptions[1].uniqueIdentifier}
                      options={[
                        {
                          title: "Edit",
                          icon: "edit",
                          onPressOption: onPressEditHandler,
                        },
                        {
                          title: "Delete",
                          icon: "trash",
                          onPressOption: onPressDeleteHandler,
                        },
                      ]}
                      isVisible={showOptions[1].state}
                      color="secondary"
                    />
                  </View>
                </View>
                <ScrollView
                  style={styles.productList}
                  nestedScrollEnabled={true}
                >
                  {products.map((product) => (
                    <View style={styles.productWrapper} key={product.id}>
                      <ProductCardHorizontal
                        disabled={showOptions.some(
                          (option) => option.state === true
                        )}
                        {...product}
                      />
                    </View>
                  ))}
                </ScrollView>
              </Card>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              disabled={
                showOptions.some((option) => option.state === true)
                  ? "DEACTIVATED"
                  : "DEFAULT"
              }
              variant="outlined"
              iconStart={<IconFilled size="sm" name="plus" />}
              title="Create a new wishlist"
            />
          </View>
          <View style={styles.recommendedProducts}>
            <Typography style={styles.titleRecommend} variant="h5">
              OUR RECOMMENDED PRODUCTS
            </Typography>
            <FlatList
              contentContainerStyle={styles.containerListStyle}
              horizontal={true}
              ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
              data={products}
              renderItem={({ item }) => (
                <ProductCard
                  ratings={4.5}
                  numOfReviews={24}
                  categories={["Tech"]}
                  {...item}
                  isWishlisted={false}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Pressable>
  );
};

export default WishlistScreen;
