import { StyleSheet, View } from "react-native";

//App Theme
import { getColorPallete } from "../../theme/appTheme";
import { ColorPalleteOptions } from "../../theme/appThemeModel";

//UI Component
import Typography from "../Typography";

//Pill Props
interface PillProps extends ColorPalleteOptions {
  text?: string;
  size?: "sm" | "md";
}

/**
 ** ============================================================================
 ** Component [Pill]
 ** ============================================================================
 */
const Pill = ({ text, color = "primary", size = "md" }: PillProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const colorPallete = getColorPallete({ color });

  /**
   ** **
   ** ** ** Pill Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorPallete.light,
      paddingVertical: size === "sm" ? 4 : 8,
      paddingHorizontal: size === "sm" ? 8 : 16,
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <Typography variant="h6" color={color}>
        {text}
      </Typography>
    </View>
  );
};

export default Pill;
