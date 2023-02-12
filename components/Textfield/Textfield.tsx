import { StyleSheet, TextInput, View } from "react-native";

//App Theme
import AppTheme, { getColorPallete, getSize } from "../../theme/appTheme";
import {
  ColorPalleteOptions,
  variants,
  sizes,
  ColorPalleteOptionsAlt,
  ColorPallete,
  booleanAlt,
} from "../../theme/appThemeModel";
import { assertUnreachable } from "../../utils/utils";

//UI Components
import Typography from "../Typography";

//Textfield Props
interface TextfieldProps extends ColorPalleteOptionsAlt {
  variant?: variants;
  size?: sizes;
  label?: string;
  placeholder?: string;
  inputType?: "text" | "email" | "number" | "password";
  error?: booleanAlt;
  helperText?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  showPassword?: booleanAlt;
  value?: string;
  onTextChange?: (text: string) => void;
}

/**
 ** ============================================================================
 ** Component [Textfield]
 ** ============================================================================
 */
const Textfield = ({
  variant = "solid",
  color = "primary",
  size = "md",
  label,
  placeholder,
  inputType = "text",
  error = "false",
  helperText,
  iconStart,
  iconEnd,
  showPassword = "false",
  value,
  onTextChange,
}: TextfieldProps) => {
  /*
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete =
    color === "dark"
      ? AppTheme.pallete.ui.gray
      : color === "light"
      ? ({
          dark: AppTheme.pallete.ui.white,
          main: AppTheme.pallete.ui.white,
          light: AppTheme.pallete.ui.white,
        } as ColorPallete)
      : getColorPallete({ color } as ColorPalleteOptions);
  const selectedSize = getSize(size, [1, 2, 3]);

  /*
   ** **
   ** ** ** Methods
   ** **
   */
  const selectedFontSize = (size: sizes = "md") => {
    switch (size) {
      case "sm":
        return AppTheme.typography.text.bodySm;
      case "md":
        return AppTheme.typography.text.bodyMd;
      case "lg":
        return AppTheme.typography.text.bodyLg;
      default:
        assertUnreachable(size);
    }
  };

  /*
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      borderRadius: 8,
      backgroundColor:
        variant === "soft" || variant === "solid"
          ? variant === "solid"
            ? colorPallete.main
            : colorPallete.light
          : variant === "plain"
          ? AppTheme.pallete.ui.white
          : undefined,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderColor: colorPallete.light,
    },
    textField: {
      flex: 1,
      paddingLeft: iconStart ? (AppTheme.spacer(1) as number) : 0,
      paddingRight: iconEnd ? (AppTheme.spacer(1) as number) : 0,
      paddingVertical: selectedSize,
      fontFamily: AppTheme.typography.fontFamily,
      fontSize: selectedFontSize(size)?.fontSize,
      fontWeight: selectedFontSize(size)?.fontWeight,
      lineHeight: selectedFontSize(size)?.fontHeight,
      color:
        variant === "solid"
          ? color === "light"
            ? AppTheme.pallete.text.gray.dark
            : AppTheme.pallete.text.white
          : colorPallete.dark,
    },
    helperTextWrapper: {
      paddingVertical: AppTheme.spacer(1) as number,
    },
  });

  return (
    <View style={styles.container}>
      {label ? (
        <Typography variant="label" color="dark">
          {label}
        </Typography>
      ) : (
        ""
      )}

      <View style={styles.wrapper}>
        {iconStart && iconStart}
        <TextInput
          value={value}
          onChangeText={onTextChange}
          style={styles.textField}
          keyboardType={
            inputType === "number"
              ? "decimal-pad"
              : inputType === "email"
              ? "email-address"
              : "default"
          }
          secureTextEntry={
            inputType === "password" &&
            (showPassword === "false" || showPassword === false)
          }
          placeholder={placeholder}
        />
        {iconEnd && iconEnd}
      </View>
      {helperText && (error === true || error === "true") ? (
        <View style={styles.helperTextWrapper}>
          <Typography color="error" variant="hint">
            {helperText}
          </Typography>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default Textfield;
