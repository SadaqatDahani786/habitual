import { StyleSheet, Text } from "react-native";
import AppTheme, { getColorPallete } from "../../theme/appTheme";
import {
  ColorPalleteOptions,
  ColorPalleteOptionsAlt,
} from "../../theme/appThemeModel";
import { assertUnreachable } from "../../utils/utils";

//Typograpy Props
interface TypographyProps extends ColorPalleteOptionsAlt {
  children?: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "bodyLg"
    | "bodyMd"
    | "bodySm"
    | "bodySmAlt"
    | "label"
    | "hint"
    | "linkMd"
    | "linkSm"
    | "label"
    | "strikethroughMd"
    | "strikethroughSm"
    | "pillMd"
    | "pillSm";
}

/**
 ** ============================================================================
 ** Component [Typograpy]
 ** ============================================================================
 */
const Typography = ({
  variant = "bodyMd",
  color = "dark",
  children,
}: TypographyProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const selectedColor =
    color === "dark"
      ? AppTheme.pallete.text.gray.dark
      : color === "light"
      ? AppTheme.pallete.text.gray.light
      : getColorPallete({ color } as ColorPalleteOptions).main;

  /**
   ** **
   ** ** ** Methods
   ** **
   */

  //Get Font Variant
  const getFontVariant = ({ variant = "bodyMd" }: TypographyProps) => {
    switch (variant) {
      case "h1":
        return AppTheme.typography.headings.h1;
      case "h2":
        return AppTheme.typography.headings.h2;
      case "h3":
        return AppTheme.typography.headings.h3;
      case "h4":
        return AppTheme.typography.headings.h4;
      case "h5":
        return AppTheme.typography.headings.h5;
      case "h6":
        return AppTheme.typography.headings.h6;
      case "bodyLg":
        return AppTheme.typography.text.bodyLg;
      case "bodyMd":
        return AppTheme.typography.text.bodyMd;
      case "bodySm":
        return AppTheme.typography.text.bodySm;
      case "bodySmAlt":
        return AppTheme.typography.text.bodySmAlt;
      case "hint":
        return AppTheme.typography.text.Hint;
      case "label":
        return AppTheme.typography.text.label;
      case "linkMd":
        return AppTheme.typography.interaction.linkMd;
      case "linkSm":
        return AppTheme.typography.interaction.linkSm;
      case "strikethroughMd":
        return AppTheme.typography.interaction.strikethroughMd;
      case "strikethroughSm":
        return AppTheme.typography.interaction.strikethroughSm;
      case "pillMd":
        return AppTheme.typography.interaction.pillMd;
      case "pillSm":
        return AppTheme.typography.interaction.pillSm;
      default:
        return assertUnreachable(variant);
    }
  };

  /**
   ** **
   ** ** ** Typograpy Styles
   ** **
   */
  const styles = StyleSheet.create({
    text: {
      fontSize: getFontVariant({ variant } as TypographyProps).fontSize,
      fontWeight: getFontVariant({ variant } as TypographyProps).fontWeight,
      fontHeight: getFontVariant({ variant } as TypographyProps).fontHeight,
      color: selectedColor,
      textDecorationLine:
        variant === "strikethroughMd" || variant === "strikethroughSm"
          ? "line-through"
          : variant === "linkMd" || variant === "linkSm"
          ? "underline"
          : "none",
    },
  });
  return <Text style={styles.text}>{children}</Text>;
};

export default Typography;
