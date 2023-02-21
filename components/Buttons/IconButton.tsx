import { View, StyleSheet, Pressable } from "react-native";
import AppTheme, { getColorPallete, getSize } from "../../theme/appTheme";
import {
  ColorPalleteOptionsAlt,
  disabled,
  sizes,
  variants,
} from "../../theme/appThemeModel";

//IconButton Props
interface IconButtonProps extends ColorPalleteOptionsAlt {
  size?: sizes;
  variant?: variants;
  icon: React.ReactNode;
  disabled?: disabled;
  onPress?: () => void;
}

/**
 ** ============================================================================
 ** Component [IconButton]
 ** ============================================================================
 */
const IconButton = ({
  variant = "plain",
  color = "primary",
  size = "lg",
  icon,
  disabled = "DEFAULT",
  onPress,
}: IconButtonProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete =
    color === "dark"
      ? AppTheme.pallete.ui.gray
      : color === "light"
      ? {
          dark: AppTheme.pallete.ui.white,
          light: AppTheme.pallete.ui.white,
          main: AppTheme.pallete.ui.white,
        }
      : getColorPallete({ color });
  const selectedSize =
    getSize(size, [2, 3, 4]) + (AppTheme.spacer(3) as number);

  /**
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    iconButton: {
      width: selectedSize,
      height: selectedSize,
      backgroundColor:
        variant === "soft" || variant === "solid"
          ? variant === "solid"
            ? colorPallete.main
            : colorPallete.light
          : undefined,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderColor: colorPallete.main,
      borderRadius: 100,
      opacity: disabled === "DISABLED" ? 0.6 : 1,
      overflow: "hidden",
    },
    pressable: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.iconButton}>
      <Pressable
        disabled={disabled === "DISABLED" || disabled === "DEACTIVATED"}
        android_ripple={{
          color:
            color === "light"
              ? AppTheme.pallete.ui.gray.light
              : variant === "soft"
              ? colorPallete.dark
              : colorPallete.light,
        }}
        style={styles.pressable}
        onPress={onPress}
      >
        {icon}
      </Pressable>
    </View>
  );
};

export default IconButton;
