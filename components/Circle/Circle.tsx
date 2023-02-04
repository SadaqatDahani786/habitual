import { Animated, StyleSheet } from "react-native";
import { getColorPallete } from "../../theme/appTheme";
import { ColorPalleteOptions } from "../../theme/appThemeModel";

//Circle Props
interface CircleProps extends ColorPalleteOptions {
  size?: "md" | "sm";
  top?: number | undefined;
  bottom?: number | undefined;
  left?: number | undefined;
  right?: number | undefined;
  animatedProps?: {
    backgroundColor?: Animated.AnimatedInterpolation<string>;
    top?: Animated.AnimatedInterpolation<number>;
    left?: Animated.AnimatedInterpolation<number>;
  };
}

/**
 ** ============================================================================
 ** Component [Circle]
 ** ============================================================================
 */
const Circle = ({
  size = "md",
  color = "primary",
  top = 0,
  bottom,
  left = 0,
  right,
  animatedProps,
}: CircleProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const selectedColor = getColorPallete({ color });

  /**
   ** **
   ** ** ** Circle Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: size === "md" ? 500 : 300,
      height: size === "md" ? 500 : 300,
      borderRadius: 1000,
      backgroundColor: selectedColor.main + 80,
      position: "absolute",
      top,
      left,
      bottom,
      right,
    },
  });

  return <Animated.View style={[styles.container, { ...animatedProps }]} />;
};

export default Circle;
