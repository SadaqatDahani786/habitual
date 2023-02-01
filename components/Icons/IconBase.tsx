import { FontAwesome, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import AppTheme, { getColorPallete, getSize } from "../../theme/appTheme";
import {
  ColorPalleteOptions,
  ColorPalleteOptionsAlt,
  sizes,
} from "../../theme/appThemeModel";

//Type Icons
export type Icons = "home" | "plus";

//Type Icons Filled
export type IconsFilled = "home" | "plus" | "google";

//Icon Base Props
export interface IconBaseProps<T = Icons> extends ColorPalleteOptionsAlt {
  size?: sizes;
  variant?: "outlined" | "filled";
  name: T;
  style?: { paddingRight?: number; paddingLeft?: number };
}

/**
 ** ============================================================================
 ** Component [IconBase]
 ** ============================================================================
 */
const IconBase = <T = Icons,>({
  name = "home" as T,
  color = "primary",
  size = "md",
  variant = "outlined",
  style,
}: IconBaseProps<T>) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  //Selected Color
  const selectedColor =
    color === "dark"
      ? AppTheme.pallete.ui.black
      : color === "light"
      ? AppTheme.pallete.ui.white
      : getColorPallete({ color } as ColorPalleteOptions).dark;

  //Selected Size
  const selectedSize = getSize(size, [2, 3, 4]);

  /**
   ** **
   ** ** ** Button Styles
   ** **
   */
  const styles = StyleSheet.create({
    icon: {
      ...style,
    },
  });

  return variant === "filled" ? (
    <FontAwesome
      style={styles.icon}
      name={name as IconsFilled}
      color={selectedColor}
      size={selectedSize}
    />
  ) : (
    <Feather
      style={styles.icon}
      name={name as Icons}
      color={selectedColor}
      size={selectedSize}
    />
  );
};

export default IconBase;
