import { ColorPalleteOptionsAlt } from "../../theme/appThemeModel";
import ButtonBase from "../Buttons/ButtonBase";
import Typography from "../Typography";

//Link Props
interface LinkProps extends ColorPalleteOptionsAlt {
  size?: "sm" | "md";
  text: string;
  style?: {};
  onPress?(): void;
}

/**
 ** ============================================================================
 ** Component [Link]
 ** ============================================================================
 */
const Link = ({ text, size = "md", style = {}, color, onPress }: LinkProps) => {
  return (
    <ButtonBase variant="plain" showRipple="false" onPress={onPress}>
      <Typography
        style={style}
        color={color}
        variant={size === "sm" ? "linkSm" : "linkMd"}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default Link;
