import { View, StyleSheet, Pressable } from "react-native";
import AppTheme, { getColorPallete, getSize } from "../../theme/appTheme";
import {
  ColorPalleteOptions,
  sizes,
  variants,
} from "../../theme/appThemeModel";

//IconBase Props
interface IconBaseProps extends ColorPalleteOptions {
  size?: sizes;
  variant?: variants;
  icon: React.ReactNode;
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
  onPress,
}: IconBaseProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete = getColorPallete({ color });
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
        android_ripple={{
          color: variant === "soft" ? colorPallete.dark : colorPallete.light,
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
