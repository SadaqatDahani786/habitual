import { FontAwesome, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import AppTheme, { getColorPallete, getSize } from "../../theme/appTheme";
import {
  ColorPalleteOptions,
  ColorPalleteOptionsAlt,
  sizes,
} from "../../theme/appThemeModel";

//Type Icons
export type Icons =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "check"
  | "check-circle"
  | "x"
  | "x-circle"
  | "bell"
  | "bell-off"
  | "home"
  | "settings"
  | "shopping-cart"
  | "shopping-bag"
  | "heart"
  | "star"
  | "user"
  | "lock"
  | "eye"
  | "eye-off"
  | "info"
  | "clock"
  | "calendar"
  | "compass"
  | "menu"
  | "search"
  | "more-horizontal"
  | "more-vertical"
  | "mail"
  | "message-square"
  | "phone"
  | "trash"
  | "edit"
  | "image"
  | "credit-card"
  | "dollar-sign"
  | "plus"
  | "minus"
  | "package";

//Type Icons Filled
export type IconsFilled =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "check"
  | "check-circle"
  | "times"
  | "times-circle"
  | "bell"
  | "bell-slash"
  | "home"
  | "cog"
  | "shopping-cart"
  | "shopping-bag"
  | "heart"
  | "star"
  | "user"
  | "lock"
  | "eye"
  | "eye-slash"
  | "info"
  | "clock-o"
  | "calendar"
  | "compass"
  | "bars"
  | "search"
  | "ellipsis-h"
  | "ellipsis-v"
  | "envelope"
  | "comment"
  | "phone"
  | "trash"
  | "edit"
  | "image"
  | "credit-card"
  | "google"
  | "apple"
  | "dollar"
  | "plus"
  | "minus";

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
      : getColorPallete({ color } as ColorPalleteOptions).main;

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
