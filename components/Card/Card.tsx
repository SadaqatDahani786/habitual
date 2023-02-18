import { Pressable, StyleSheet, View } from "react-native";

//App Theme
import AppTheme, { getColorPallete, getSize } from "../../theme/appTheme";
import {
  booleanAlt,
  ColorPalleteOptions,
  ColorPalleteOptionsAlt,
  sizes,
  variants,
} from "../../theme/appThemeModel";

//Card Props
interface CardProps extends ColorPalleteOptionsAlt {
  size?: sizes;
  variant?: variants;
  fullWidth?: booleanAlt;
  children?: React.ReactNode;
  onPress?: () => void;
}

/**
 ** ============================================================================
 ** Component [Card]
 ** ============================================================================
 */
const Card = ({
  children,
  size = "md",
  color = "primary",
  variant = "solid",
  fullWidth = "false",
  onPress,
}: CardProps) => {
  /*
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete =
    color === "dark"
      ? AppTheme.pallete.ui.gray
      : color === "light"
      ? {
          dark: AppTheme.pallete.ui.gray.light,
          light: AppTheme.pallete.ui.gray.light,
          main: AppTheme.pallete.ui.white,
        }
      : getColorPallete({ color } as ColorPalleteOptions);
  const selectedSize = getSize(size, [16, 18, 20]);

  /*
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: fullWidth === "true" || fullWidth === true ? "100%" : selectedSize,
      backgroundColor:
        variant === "solid"
          ? colorPallete.main
          : variant === "soft"
          ? colorPallete.light
          : AppTheme.pallete.ui.white,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderColor: variant === "outlined" ? colorPallete.main : undefined,
      borderRadius: 8,
      elevation: 1,
    },
    pressable: {
      height: "100%",
      padding: AppTheme.spacer(2) as number,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={styles.pressable}
        android_ripple={{
          color: variant === "soft" ? colorPallete.dark : colorPallete.light,
        }}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default Card;
