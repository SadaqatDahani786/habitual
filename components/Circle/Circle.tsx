import { StyleSheet, View } from "react-native";
import { getColorPallete } from "../../theme/appTheme";
import { ColorPalleteOptions } from "../../theme/appThemeModel";

//Circle Props
interface CircleProps extends ColorPalleteOptions {
  size?: "md" | "sm";
  top?: number | undefined;
  bottom?: number | undefined;
  left?: number | undefined;
  right?: number | undefined;
}

/**
 ** ============================================================================
 ** Component [Circle]
 ** ============================================================================
 */
const Circle = ({
  size = "md",
  color = "primary",
  top,
  bottom,
  left,
  right,
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
      backgroundColor: selectedColor.light,
      position: "absolute",
      top,
      right,
      left,
      bottom,
    },
  });
  return <View style={styles.container} />;
};

export default Circle;
