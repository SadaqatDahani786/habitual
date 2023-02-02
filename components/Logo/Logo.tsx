import { Image } from "react-native";
import { assertUnreachable } from "../../utils/utils";

//Full Logo
import FullLogoPrimary from "../../assets/Logos/Full_Logo/primary.png";
import FullLogoDark from "../../assets/Logos/Full_Logo/secondary.png";
import FullLogoLight from "../../assets/Logos/Full_Logo/tertiary.png";

//Icon Logo
import IconLogoPrimary from "../../assets/Logos/Icon_Logo/primary.png";
import IconLogoDark from "../../assets/Logos/Icon_Logo/secondary.png";
import IconLogoLight from "../../assets/Logos/Icon_Logo/tertiary.png";

//Text Logo
import TextLogoPrimary from "../../assets/Logos/Text_Logo/primary.png";
import TextLogoDark from "../../assets/Logos/Text_Logo/secondary.png";
import TextLogoLight from "../../assets/Logos/Text_Logo/tertiary.png";

//Logo Props
interface LogoProps {
  variant?: "full" | "icon" | "text";
  color?: "primary" | "dark" | "light";
}

/**
 ** ============================================================================
 ** Component [Logo]
 ** ============================================================================
 */
const Logo = ({ variant = "full", color = "primary" }: LogoProps) => {
  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //Get Logo URL
  const getLogoURL = ({ variant = "full", color = "primary" }: LogoProps) => {
    if (color === "primary") {
      if (variant === "full") return FullLogoPrimary;
      else if (variant === "icon") return IconLogoPrimary;
      else if (variant === "text") return TextLogoPrimary;
      else return assertUnreachable(variant);
    } else if (color === "dark") {
      if (variant === "full") return FullLogoDark;
      else if (variant === "icon") return IconLogoDark;
      else if (variant === "text") return TextLogoDark;
      else return assertUnreachable(variant);
    } else if (color === "light") {
      if (variant === "full") return FullLogoLight;
      else if (variant === "icon") return IconLogoLight;
      else if (variant === "text") return TextLogoLight;
      else return assertUnreachable(variant);
    } else assertUnreachable(color);
  };

  return <Image source={getLogoURL({ variant: variant, color: color })} />;
};

export default Logo;
