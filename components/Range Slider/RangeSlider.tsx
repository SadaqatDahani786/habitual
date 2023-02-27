import { useRef, memo, useCallback, useEffect } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

//App Theme
import AppTheme, { getColorPallete } from "../../theme/appTheme";
import { ColorPalleteOptions } from "../../theme/appThemeModel";

//RangeSlider Props
interface RangeSliderProps extends ColorPalleteOptions {
  min?: number;
  max?: number;
  step?: number;
  variant?: "one_handle" | "two_handles";
  width?: number;
  onChange?: (values: Array<number>) => void;
}

/**
 ** ============================================================================
 ** Component [RangeSlider]
 ** ============================================================================
 */
const RangeSlider = ({
  variant = "one_handle",
  color = "primary",
  min = 0,
  max = 100,
  step = 1,
  width = 200,
  onChange = (values) => {},
}: RangeSliderProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const selectedColorPallete = getColorPallete({ color });

  //Width/Height of range slider handle
  const handleSize = 30;

  //Bounds of our range slider
  const MaxDistance = width - handleSize;
  const MinDistance = 0;

  //Slider Handle Position
  const sliderHandleXPos = useRef(new Animated.Value(MinDistance)).current;
  const sliderHandle2XPos = useRef(new Animated.Value(MaxDistance));

  //Slider Handle Prev Postion
  const prevSliderHandleXPos = useRef(MinDistance);
  const prevSliderHandle2XPos = useRef(MaxDistance);

  //Slider handler outer rings
  const sliderHandleRingXPos = useRef(new Animated.Value(MinDistance)).current;
  const sliderHandleRing2XPos = useRef(new Animated.Value(MaxDistance)).current;

  //Animation
  const opacityOuterRing = useRef(new Animated.Value(0)).current;
  const opacityOuterRing2 = useRef(new Animated.Value(0)).current;

  //Slider value that will show up in UI
  const sliderValue = useRef(0);
  const sliderValue2 = useRef(max);

  /**
   ** **
   ** ** ** RangeSlider Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 40,
      display: "flex",
      justifyContent: "center",
    },
    draggable: {
      width: handleSize,
      height: handleSize,
      borderRadius: 100,
      backgroundColor: AppTheme.pallete.ui.white,
      borderWidth: 1,
      borderColor: selectedColorPallete.main,
      position: "absolute",
    },
    line: {
      width: MaxDistance,
      height: 5,
      borderRadius: 8,
      backgroundColor: selectedColorPallete.dark,
      left: handleSize / 2,
      top: handleSize / 2,
    },
    outerRing: {
      position: "absolute",
      zIndex: -1,
      width: 70,
      height: 70,
      borderWidth: 1,
      borderColor: selectedColorPallete.main + 30,
      top: -(70 / 2) + handleSize / 2,
      borderRadius: 1000,
      left: -(70 / 2) + handleSize / 2,
    },
    counter: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  /**
   ** **
   ** ** ** Methods
   ** **
   */

  //Slider left side handle
  const panResponder = useCallback(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          //1) Remove all previously set listener from animated value
          sliderHandleXPos.removeAllListeners();

          //2) Capp gesture.dx between our range slider bounds (MinDistance/MaxDistance)
          let dxCapped = Math.min(
            Math.max(
              gestureState.dx + prevSliderHandleXPos.current,
              MinDistance
            ),
            MaxDistance
          );

          //3) Don't let left and right handles overlap on each other
          if (
            gestureState.dx + prevSliderHandleXPos.current >=
              prevSliderHandle2XPos.current - handleSize &&
            variant === "two_handles"
          ) {
            dxCapped = prevSliderHandle2XPos.current - handleSize;
          }

          //4) Calc slider value and curr step
          const sliderVal = (dxCapped * (max - min)) / MaxDistance + min; // Get a value between our (min/max)
          const currStep = Math.ceil(sliderVal / step); //Curr step in which range slider is now
          let sliderValStepWise = min; //Holds the value based on increment of (step)

          //5) Determine slider value (step) wise
          if (sliderVal >= step * currStep) sliderValStepWise = step * currStep;
          else sliderValStepWise = step * (currStep - 1);

          //6) Set slider pos X value and slide UI value
          sliderValue.current = Math.round(sliderValStepWise);
          variant === "one_handle"
            ? onChange([sliderValue.current])
            : onChange([sliderValue.current, sliderValue2.current]);

          //7) Run Animations
          Animated.spring(sliderHandleXPos, {
            //anim slider handle pos
            toValue: dxCapped,
            useNativeDriver: false,
          }).start();

          Animated.spring(sliderHandleRingXPos, {
            //anim slider handle outer ring pos
            toValue: dxCapped,
            speed: 8,
            useNativeDriver: false,
          }).start();

          Animated.spring(opacityOuterRing, {
            //anim slider handle outer ring opacity
            toValue: 1,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderRelease: (evt, gestureState) => {
          //1) Save current slider x postion for next interation of interaction
          sliderHandleXPos.addListener(({ value }) => {
            prevSliderHandleXPos.current = value;
          });

          //2) Fade out outer right on touch release
          Animated.spring(opacityOuterRing, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        },
      }),
    [width]
  );

  //Slider right side handle
  const panResponder2 = useCallback(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          //1) Remove all previously set listener from animated value
          sliderHandle2XPos.current.removeAllListeners();

          //2) Capp gesture.dx between our range slider bounds (MinDistance/MaxDistance)
          let dxCapped = Math.min(
            Math.max(
              gestureState.dx + prevSliderHandle2XPos.current,
              MinDistance
            ),
            MaxDistance
          );

          //3) Don't let left and right handles overlap on each other
          if (
            gestureState.dx + prevSliderHandle2XPos.current <=
            prevSliderHandleXPos.current + handleSize
          ) {
            dxCapped = prevSliderHandleXPos.current + handleSize;
          }

          //4) Calc slider value and curr step
          const sliderVal = (dxCapped * (max - min)) / MaxDistance + min; // Get a value between our (min/max)
          const currStep = Math.ceil(sliderVal / step); //Curr step in which range slider is now
          let sliderValStepWise = min; //Holds the value based on increment of (step)

          //5) Determine slider value (step) wise
          if (sliderVal >= step * currStep) sliderValStepWise = step * currStep;
          else sliderValStepWise = step * (currStep - 1);

          //6) Set slider pos X value and slide UI value
          sliderValue2.current = Math.round(sliderValStepWise);
          onChange([sliderValue.current, sliderValue2.current]);

          //7) Run  Animations
          Animated.spring(sliderHandle2XPos.current, {
            //anim slider handle pos
            toValue: dxCapped,
            useNativeDriver: false,
          }).start();

          Animated.spring(sliderHandleRing2XPos, {
            //anim slider handle outer ring pos
            toValue: dxCapped,
            speed: 8,
            useNativeDriver: false,
          }).start();

          Animated.spring(opacityOuterRing2, {
            //anim slider handle outer ring opacity
            toValue: 1,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderRelease: (evt, gestureState) => {
          //1) Save current slider x postion for next interation of interaction
          sliderHandle2XPos.current.addListener(({ value }) => {
            prevSliderHandle2XPos.current = value;
          });

          //2) Fade out outer right on touch release
          Animated.spring(opacityOuterRing2, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        },
      }),
    [width]
  );

  //Reset handle postion valuus when width prop changes
  useEffect(() => {
    Animated.timing(sliderHandle2XPos.current, {
      toValue: width - handleSize,
      useNativeDriver: false,
      duration: 0,
    }).start();
    prevSliderHandle2XPos.current = width;
  }, [width]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <View style={styles.line} />
        <Animated.View
          style={[
            styles.draggable,
            {
              backgroundColor: opacityOuterRing.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  AppTheme.pallete.ui.white,
                  selectedColorPallete.light,
                ],
                extrapolate: "clamp",
              }),
              transform: [
                {
                  translateX: sliderHandleXPos,
                },
              ],
            },
          ]}
          {...panResponder().panHandlers}
        />
        {variant === "two_handles" && (
          <Animated.View
            style={[
              styles.draggable,
              {
                backgroundColor: opacityOuterRing2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    AppTheme.pallete.ui.white,
                    selectedColorPallete.light,
                  ],
                  extrapolate: "clamp",
                }),
                transform: [
                  {
                    translateX: sliderHandle2XPos.current,
                  },
                ],
              },
            ]}
            {...panResponder2().panHandlers}
          />
        )}
        <Animated.View
          style={[
            styles.outerRing,
            {
              opacity: opacityOuterRing,
              transform: [
                {
                  translateX: sliderHandleRingXPos,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.outerRing,
            {
              opacity: opacityOuterRing2,
              transform: [
                {
                  translateX: sliderHandleRing2XPos,
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

export default memo(RangeSlider);
