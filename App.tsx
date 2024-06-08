import { useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import WelcomeScreen from "./screens/Welcome Screen";
import OnboardingScreen from "./screens/Onboarding Screen";
import LoginScreen from "./screens/Login Screen";
import {
  SignupScreen,
  SignupScreen02,
  SignupScreen03,
  SignupScreen04,
  SignupScreen05,
} from "./screens/Signup Screen";
import Home from "./screens/Home";
import WishlistScreen from "./screens/Wishlist/WishlistScreen";
import OrdersScreen from "./screens/Orders Screen";
import OrdersFilterScreen from "./screens/OrdersFilterScreen";

//UI Components
import IconOutlined from "./components/Icons/IconOutlined";

//Fonts
import Inter from "./assets/fonts/Inter.ttf";
import InterSemiBold from "./assets/fonts/Inter-SemiBold.ttf";

//Redux
import { Provider } from "react-redux";
import store from "./store/store";

/**
 ** ============================================================================
 ** Type [RootStackParamList]
 ** ============================================================================
 */
export type RootStackParamList = {
  WelcomeScreen: undefined;
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  SignupScreen02: { displayName: string };
  SignupScreen03: { email: string; password: string; displayName: string };
  SignupScreen04: {
    email: string;
    password: string;
    displayName: string;
    photo: string;
  };
  SignupScreen05: {
    email: string;
    password: string;
    displayName: string;
    photo: string;
    joiningReasons: string[];
  };
  HomeScreens: { photo?: string };
  OrdersFilterScreen: undefined;
};

/**
 ** ============================================================================
 ** Type [BottomTabParamList]
 ** ============================================================================
 */
export type BottomTabParamList = {
  WelcomeScreen: undefined;
  HomeScreen: { photo?: string };
  WishlistScreen: undefined;
  OrdersScreen: undefined;
};

//Navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

/**
 ** ============================================================================
 ** Component [BottomTabNavigation]
 ** ============================================================================
 */
const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: () => <IconOutlined name="home" color="dark" />,
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        options={{
          tabBarIcon: () => <IconOutlined name="heart" color="dark" />,
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          tabBarIcon: () => <IconOutlined name="package" color="dark" />,
          tabBarShowLabel: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 ** ============================================================================
 ** Component [App]
 ** ============================================================================
 */
const App = () => {
  /*
   ** **
   ** ** ** Start & Vars
   ** **
   */
  const [fontsLoaded] = useFonts({
    Inter,
    InterSemiBold,
  });

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  //Keep showing splash screen until fonts are loaded
  useEffect(() => {
    if (!fontsLoaded) preventAutoHideAsync();
    else hideAsync();
  }, [fontsLoaded]);

  //Font Loading
  if (!fontsLoaded) return;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen
            name="SignupScreen02"
            component={SignupScreen02}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="SignupScreen03"
            component={SignupScreen03}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="SignupScreen04"
            component={SignupScreen04}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="SignupScreen05"
            component={SignupScreen05}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="HomeScreens" component={BottomTabNavigation} />
          <Stack.Screen
            name="OrdersFilterScreen"
            component={OrdersFilterScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
