import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";

//UI Components
import Carousel from "../../components/Carousel/Carousel";

//SVG Illustrations
import Laptop from "../../components/Illustrations/Laptop";
import Rocket from "../../components/Illustrations/Rocket";
import Storefront from "../../components/Illustrations/Storefront";
import Women from "../../components/Illustrations/Women";

//Onboarding Props
interface OnboardingProps {
  navigation: NativeStackNavigationProp<any, any>;
}

/**
 ** ============================================================================
 ** Component [Onboarding]
 ** ============================================================================
 */
const Onboarding = ({ navigation }: OnboardingProps) => {
  /**
   ** **
   ** ** ** Start & Vars
   ** **
   */
  const slides = [
    {
      id: 1,
      title: "Welcome!",
      subtitle:
        "It’s a pleasure for us that you’ve decided to shopping with us, we wish you happy shopping, so let’s get started!",
      image: <Storefront width="100%" height={200} />,
    },
    {
      id: 2,
      title: "Irrelevant results again?",
      subtitle:
        "Say no more to irrelevant results again, Habitual gives accurate results based off of your habits and interests. ",
      image: <Laptop width="100%" height={200} />,
    },
    {
      id: 3,
      title: "Your interests working with you.",
      subtitle:
        "Keep using our app and we will start giving some great recommendations based off of your interests that makes you happy.",
      image: <Women width="100%" height={200} />,
    },
    {
      id: 4,
      title: "So what are you waiting for?",
      subtitle:
        "We offer free delivery, amazing customer service and 2 days return policy with no questions asked, so sign up now!",
      image: <Rocket width="100%" height={200} />,
    },
  ];

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Executed when button skip is pressed
  const onSkipHandler = () => {
    navigation.navigate("HomeScreens");
  };

  //Executed when onboarding is finished
  const onOnboardingFinishHandler = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Carousel
        slides={slides}
        onSkip={onSkipHandler}
        onOnboardingFinish={onOnboardingFinishHandler}
      />
    </View>
  );
};

export default Onboarding;
