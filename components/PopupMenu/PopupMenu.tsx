import React from "react";
import { StyleSheet, View } from "react-native";

//App Theme
import AppTheme from "../../theme/appTheme";
import { booleanAlt, ColorPalleteOptions } from "../../theme/appThemeModel";

//UI Components
import Button from "../Buttons/Button";
import IconFilled from "../Icons/IconFilled";
import { IconsFilled } from "../Icons/IconBase";

//PopupMenu Props
interface PopupMenuProps extends ColorPalleteOptions {
  isVisible: booleanAlt;
  uniqueIdentifier: number;
  options: Array<{
    title: string;
    icon?: IconsFilled;
    onPressOption?: (uniqueIdentified: number) => void;
  }>;
}

/**
 ** ============================================================================
 ** Component [PopupMenu]
 ** ============================================================================
 */
const PopupMenu = ({
  isVisible = "false",
  uniqueIdentifier,
  color = "primary",
  options = [],
}: PopupMenuProps) => {
  /**
   ** **
   ** ** ** PopupMenu Styles
   ** **
   */
  const styles = StyleSheet.create({
    options: {
      display: "flex",
      flexDirection: "column",
      width: 180,
      backgroundColor: "white",
      position: "absolute",
      top: 30,
      left: -200 + 50,
      zIndex: 10,
      elevation: 4,
      borderRadius: 8,
    },
    optionItem: {
      overflow: "hidden",
    },
    optionDivider: {
      width: "100%",
      height: 1,
      backgroundColor: AppTheme.pallete.ui.gray.light,
    },
  });

  return isVisible === "true" || isVisible === true ? (
    <View style={styles.options}>
      {options.map((option, i) => (
        <View key={i}>
          <View style={styles.optionItem}>
            {option.icon !== undefined ? (
              <Button
                title={option.title}
                onPress={() =>
                  option.onPressOption && option.onPressOption(uniqueIdentifier)
                }
                iconStart={<IconFilled color={color} name={option.icon} />}
                color={color}
              />
            ) : (
              <Button
                title={option.title}
                onPress={() =>
                  option.onPressOption && option.onPressOption(uniqueIdentifier)
                }
                color={color}
              />
            )}
          </View>
          {i !== options.length - 1 && <View style={styles.optionDivider} />}
        </View>
      ))}
    </View>
  ) : null;
};

export default PopupMenu;
