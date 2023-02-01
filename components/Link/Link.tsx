import { ColorPalleteOptionsAlt } from "../../theme/appThemeModel";
import ButtonBase from "../Buttons/ButtonBase";
import Typography from "../Typography";

//Link Props
interface LinkProps extends ColorPalleteOptionsAlt {
  size?: "Sm" | "Md";
  text: string;
  onPress?(): void;
}

/**
 ** ============================================================================
 ** Component [Link]
 ** ============================================================================
 */
const Link = ({ text, size = "Md", color, onPress }: LinkProps) => {
  return (
    <ButtonBase variant="plain" showRipple="false" onPress={onPress}>
      <Typography color={color} variant={size === "Sm" ? "linkSm" : "linkMd"}>
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default Link;
