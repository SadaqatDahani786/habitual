import { StyleSheet, Pressable, View } from "react-native";

//Theme
import { getColorPallete, getSpacing } from "../../theme/appTheme";
import {
  booleanAlt,
  ColorPalleteOptions,
  cornerRadius,
  sizes,
  variants,
} from "../../theme/appThemeModel";

//Utils
import { assertUnreachable } from "../../utils/utils";

//Button Base Props
export interface ButtonBaseProps extends ColorPalleteOptions {
  children?: React.ReactNode;
  variant?: variants;
  size?: sizes;
  roundedCorners?: cornerRadius;
  disabled?: booleanAlt;
  showRipple?: booleanAlt;
  fullWidth?: booleanAlt;
  onPress?(): void;
}

/**
 ** ============================================================================
 ** Component [ButtonBase]
 ** ============================================================================
 */
const ButtonBase = ({
  variant = "plain",
  color = "primary",
  size = "md",
  roundedCorners = "md",
  disabled = false,
  fullWidth = false,
  showRipple = true,
  onPress,
  children,
}: ButtonBaseProps): JSX.Element => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete = getColorPallete({ color } as ColorPalleteOptions);
  const padding = getSpacing({
    size,
    space: { horizontal: 2, vertical: 1 },
  });

  /**
   ** **
   ** ** ** Methods
   ** **
   */

  //Get Selected Rounded Corners
  const getSelectedRoundedCorners = ({
    roundedCorners = "md",
  }: ButtonBaseProps): number => {
    switch (roundedCorners) {
      case "full":
        return 1000;
      case "lg":
        return 16;
      case "md":
        return 8;
      case "sm":
        return 4;
      case "none":
        return 0;
      default:
        return assertUnreachable(roundedCorners);
    }
  };

  /**
   ** **
   ** ** ** ButtonBase Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: fullWidth === "true" || fullWidth === true ? "100%" : "auto",
      backgroundColor:
        variant === "soft" || variant === "solid"
          ? variant === "solid"
            ? colorPallete.main
            : colorPallete.light
          : undefined,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderColor: colorPallete.main,
      borderRadius: getSelectedRoundedCorners({
        roundedCorners,
      } as ButtonBaseProps),
      opacity: disabled === "true" || disabled === true ? 0.2 : 1,
      overflow: "hidden",
    },
    pressable: {
      paddingHorizontal: padding.horizontal,
      paddingVertical: padding.vertical,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color:
            (!disabled || disabled === "false") &&
            showRipple &&
            showRipple === "true"
              ? variant === "soft"
                ? colorPallete.dark
                : colorPallete.light
              : undefined,
        }}
        onPress={onPress}
        style={styles.pressable}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default ButtonBase;
