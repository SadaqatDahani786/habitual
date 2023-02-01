import { StyleSheet, Text } from "react-native";

import AppTheme, { getColorPallete } from "../../theme/appTheme";
import { ColorPalleteOptions } from "../../theme/appThemeModel";
import { assertUnreachable } from "../../utils/utils";

import ButtonBase, { ButtonBaseProps } from "./ButtonBase";
import { IconBaseProps } from "../Icons/IconBase";
import IconFilled from "../Icons/IconFilled";

//Button Props
interface ButtonProps extends ButtonBaseProps {
  title: string;
  iconStart?: React.ReactElement<IconBaseProps, typeof IconFilled>;
  iconEnd?: React.ReactElement;
}

/**
 ** ============================================================================
 ** Component [Button]
 ** ============================================================================
 */
const Button = ({
  title,
  color,
  variant,
  size,
  roundedCorners,
  disabled,
  fullWidth,
  iconStart,
  iconEnd,
  onPress,
}: ButtonProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete = getColorPallete({ color } as ColorPalleteOptions);
  const selectedColor =
    variant == "solid"
      ? disabled === "true" || disabled === true
        ? AppTheme.pallete.ui.gray.dark
        : "white"
      : colorPallete.dark;
  const padding = (AppTheme.spacer(1) as number) / 2;

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Get selected size
  const getSelectedSize = ({ size = "md" }: ButtonProps): number => {
    const text = AppTheme.typography.text;
    switch (size) {
      case "sm":
        return text.bodySm.fontSize;
      case "md":
        return text.bodyMd.fontSize;
      case "lg":
        return text.bodyLg.fontSize;
      default:
        return assertUnreachable(size);
    }
  };

  /**
   ** **
   ** ** ** Button Styles
   ** **
   */
  const styles = StyleSheet.create({
    text: {
      fontSize: getSelectedSize({ size } as ButtonProps),
      fontWeight: "bold",
      color: selectedColor,
      textTransform: "capitalize",
      paddingHorizontal: padding,
    },
    iconStart: {
      paddingRight: AppTheme.spacer(1) as number,
    },
    iconEnd: {
      paddingLeft: AppTheme.spacer(1) as number,
    },
  });
  return (
    <ButtonBase
      color={color}
      variant={variant}
      size={size}
      roundedCorners={roundedCorners}
      disabled={disabled}
      onPress={onPress}
      fullWidth={fullWidth}
    >
      {iconStart && iconStart}
      <Text style={styles.text}>{title}</Text>
      {iconEnd && iconEnd}
    </ButtonBase>
  );
};

export default Button;
