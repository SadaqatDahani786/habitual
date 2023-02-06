import { useCallback, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
  Easing,
} from "react-native";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Button from "../Buttons/Button";
import CarouselSlide, { CarouselSlideI } from "./CarouselSlide";
import Circle from "../Circle/Circle";
import ButtonBase from "../Buttons/ButtonBase";
import Typography from "../Typography";

//Carousel Props
interface CarouselProps {
  slides: CarouselSlideI[];
  onSkip?: () => void;
  onOnboardingFinish?: () => void;
}

/**
 ** ============================================================================
 ** Component [Carousel]
 ** ============================================================================
 */
const Carousel = ({ slides, onOnboardingFinish, onSkip }: CarouselProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [currIndex, setCurrIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const refScroll = useRef<FlatList>(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 0 }).current;

  const colorPrimary = AppTheme.pallete.primary.main;
  const colorSecondary = AppTheme.pallete.secondary.main;
  const colorWarn = AppTheme.pallete.accent.warn.main;
  const colorSuccess = AppTheme.pallete.accent.success.main;

  const { width } = useWindowDimensions();

  /**
   ** **
   ** ** ** Carousel Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonSkip: {
      position: "absolute",
      top: AppTheme.spacer(6) as number,
      right: AppTheme.spacer(3) as number,
      zIndex: 10,
    },
    footer: {
      width: "100%",
      paddingHorizontal: AppTheme.spacer(3) as number,
    },
    indicator: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: AppTheme.spacer(3) as number,
    },
    indicatorItem: {
      width: 8,
      height: 8,
      borderRadius: 100,
      backgroundColor: AppTheme.pallete.primary.main,
      marginHorizontal: (AppTheme.spacer(1) as number) / 2,
    },
  });

  //Input Range
  const inputRange = slides.map((_, i) => i * width);

  //Interpolate to get circle position
  const circlePosX = scrollX.interpolate<number>({
    inputRange,
    outputRange: [-200, 100, -200, 100],
    extrapolate: "clamp",
    easing: Easing.quad,
  });

  //Interpolate to get circle color
  const circleBgColor = scrollX.interpolate<string>({
    inputRange,
    outputRange: [colorPrimary, colorSecondary, colorWarn, colorSuccess],
    extrapolate: "clamp",
    easing: Easing.quad,
  });

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Interface Info
  interface info {
    viewableItems?: Array<ViewToken>;
    changed?: Array<ViewToken>;
  }

  //Viewable Item Change Handler
  const viewableItemsChangedHandler = useCallback(({ viewableItems }: info) => {
    if (viewableItems) setCurrIndex(viewableItems[0].index as number);
  }, []);

  //Press Next Button Handler
  const pressNextHandler = () => {
    if (!refScroll.current) return;

    //Go next if more slides there to move
    if (currIndex < slides.length - 1)
      return refScroll.current.scrollToIndex({ index: currIndex + 1 });

    //No more slides to move, call onboardingFinish
    if (onOnboardingFinish) onOnboardingFinish();
  };

  return (
    <View style={styles.container}>
      <Circle
        top={-200}
        animatedProps={{ left: circlePosX, backgroundColor: circleBgColor }}
      />
      <View style={styles.buttonSkip}>
        <ButtonBase showRipple="false" onPress={onSkip}>
          <Typography variant="h5" color="dark">
            Skip
          </Typography>
        </ButtonBase>
      </View>
      <Animated.FlatList
        ref={refScroll}
        data={slides}
        renderItem={({ item }) => <CarouselSlide slide={item} />}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        scrollEventThrottle={100}
        onViewableItemsChanged={viewableItemsChangedHandler}
        viewabilityConfig={viewConfig}
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
      />
      <View style={styles.footer}>
        <View style={styles.indicator}>
          {slides.map((x, ind) => {
            const inputRange = [
              (ind - 1) * width,
              ind * width,
              (ind + 1) * width,
            ];
            //Interpolate Indicator Width
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: "clamp",
            });
            //Interpolate Indicator Opacity
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={x.id}
                style={[styles.indicatorItem, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>
        <Button
          title={currIndex <= slides.length - 2 ? "Next" : "Sign me up"}
          variant="solid"
          fullWidth="true"
          onPress={pressNextHandler}
        />
      </View>
    </View>
  );
};

export default Carousel;
