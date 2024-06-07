import { StyleSheet, Pressable, View, ActivityIndicator } from "react-native";

//Theme
import { getColorPallete, getSpacing } from "../../theme/appTheme";
import {
  booleanAlt,
  ColorPalleteOptions,
  cornerRadius,
  disabled,
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
  disabled?: disabled;
  loading?: booleanAlt;
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
  disabled = "DEFAULT",
  loading = "false",
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
  const selectedColor = variant == "solid" ? "white" : colorPallete.dark;
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
      opacity: disabled === "DISABLED" ? 0.2 : 1,
      overflow: "hidden",
    },
    pressable: {
      paddingHorizontal:
        (!showRipple || showRipple === "false") && variant === "plain"
          ? 0
          : padding.horizontal,
      paddingVertical:
        (!showRipple || showRipple === "false") && variant === "plain"
          ? 0
          : padding.vertical,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        disabled={
          disabled === "DEACTIVATED" ||
          disabled === "DISABLED" ||
          loading === "true" ||
          loading === true
        }
        android_ripple={{
          color: variant === "soft" ? colorPallete.dark : colorPallete.light,
        }}
        onPress={onPress}
        style={styles.pressable}
      >
        {loading === true || loading === "true" ? (
          <ActivityIndicator size="small" color={selectedColor} />
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
};

export default ButtonBase;
