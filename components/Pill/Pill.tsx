import { StyleSheet, View } from "react-native";

//App Theme
import { getColorPallete } from "../../theme/appTheme";
import { ColorPalleteOptions } from "../../theme/appThemeModel";

//UI Component
import Typography from "../Typography";

//Pill Props
interface PillProps extends ColorPalleteOptions {
  text?: string;
}

/**
 ** ============================================================================
 ** Component [Pill]
 ** ============================================================================
 */
const Pill = ({ text, color = "primary" }: PillProps) => {
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
      paddingVertical: 8,
      paddingHorizontal: 16,
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
