import { assertUnreachable } from "../utils/utils";
import {
  ColorPallete,
  ColorPalleteOptions,
  Space,
  SpacingOptions,
  AppTheme as AppThemeI,
  sizes,
} from "./appThemeModel";

//Theme Provider
const AppTheme: AppThemeI = {
  pallete: {
    primary: {
      light: "#FDE8CA",
      main: "#FFA825",
      dark: "#DD8B0F",
    },
    secondary: {
      light: "#DFF5FF",
      main: "#25BEFF",
      dark: "#3AA1CE",
    },
    accent: {
      error: {
        light: "#FBCBC8",
        main: "#FF6B62",
        dark: "#D51309",
      },
      success: {
        light: "#C0FFD9",
        main: "#2FE879",
        dark: "#02973d",
      },
      warn: {
        light: "#FBEEC0",
        main: "#FFD84D",
        dark: "#DDB00E",
      },
      info: {
        light: "#D9C8FF",
        main: "#864DFF",
        dark: "#5114D2",
      },
    },
    ui: {
      black: "#000",
      white: "#fff",
      gray: {
        light: "#D8D5D2",
        main: "#5E5852",
        dark: "#35312C",
      },
    },
    background: {
      white: "#fff",
      gray: "#D8D5D2",
    },
    text: {
      black: "#000",
      white: "#fff",
      gray: {
        light: "#D8D5D2",
        main: "#5E5852",
        dark: "#35312C",
      },
      primary: "#FFA825",
      secondary: "#25BEFF",
      error: "#FF6B62",
      success: "#53FA96",
      warn: "#FFD84D",
      info: "#864DFF",
    },
  },
  typography: {
    fontFamily: "sans-serif",
    headings: {
      h1: {
        fontSize: 40,
        fontHeight: 40,
        fontWeight: "bold",
      },
      h2: {
        fontSize: 32,
        fontHeight: 36,
        fontWeight: "bold",
      },
      h3: {
        fontSize: 28,
        fontHeight: 32,
        fontWeight: "bold",
      },
      h4: {
        fontSize: 20,
        fontHeight: 24,
        fontWeight: "bold",
      },
      h5: {
        fontSize: 16,
        fontHeight: 24,
        fontWeight: "bold",
      },
      h6: {
        fontSize: 12,
        fontHeight: 12,
        fontWeight: "bold",
      },
    },
    text: {
      bodyLg: {
        fontSize: 20,
        fontHeight: 24,
        fontWeight: "normal",
      },
      bodyMd: {
        fontSize: 16,
        fontHeight: 20,
        fontWeight: "normal",
      },
      bodySm: {
        fontSize: 12,
        fontHeight: 16,
        fontWeight: "normal",
      },
      bodySmAlt: {
        fontSize: 12,
        fontHeight: 16,
        fontWeight: "bold",
      },
      label: {
        fontSize: 12,
        fontHeight: 12,
        fontWeight: "normal",
      },
      Hint: {
        fontSize: 10,
        fontHeight: 16,
        fontWeight: "normal",
      },
    },
    interaction: {
      linkMd: {
        fontSize: 16,
        fontHeight: 20,
        fontWeight: "bold",
      },
      linkSm: {
        fontSize: 12,
        fontHeight: 16,
        fontWeight: "bold",
      },
      strikethroughMd: {
        fontSize: 16,
        fontHeight: 16,
        fontWeight: "normal",
      },
      strikethroughSm: {
        fontSize: 12,
        fontHeight: 12,
        fontWeight: "normal",
      },
      pillMd: {
        fontSize: 16,
        fontHeight: 16,
        fontWeight: "normal",
      },
      pillSm: {
        fontSize: 12,
        fontHeight: 12,
        fontWeight: "normal",
      },
    },
  },
  spacer(...args: number[]): number[] | number {
    const base = 8;
    const arr = args.map((arg) => arg * base);
    if (arr.length === 1) return arr[0];
    return arr;
  },
};

//Get Color Pallete
export const getColorPallete = ({
  color = "primary",
}: ColorPalleteOptions): ColorPallete => {
  switch (color) {
    case "primary":
      return AppTheme.pallete.primary;
    case "secondary":
      return AppTheme.pallete.secondary;
    case "error":
      return AppTheme.pallete.accent.error;
    case "success":
      return AppTheme.pallete.accent.success;
    case "warn":
      return AppTheme.pallete.accent.warn;
    case "info":
      return AppTheme.pallete.accent.info;
    default:
      return assertUnreachable(color);
  }
};

//Get Spacing
export const getSpacing = ({ size, space }: SpacingOptions): Space => {
  const [horizontal, vertical] = AppTheme.spacer(
    space.horizontal,
    space.vertical
  ) as number[];

  const space1x = AppTheme.spacer(1) as number;
  const space2x = AppTheme.spacer(2) as number;

  switch (size) {
    case "sm":
      return {
        horizontal,
        vertical,
      };
    case "md":
      return {
        horizontal: horizontal + space1x,
        vertical: vertical + space1x,
      };
    case "lg":
      return {
        horizontal: horizontal + space2x,
        vertical: vertical + space2x,
      };
    default:
      return assertUnreachable(size);
  }
};

//Get Size
export const getSize = (
  size: sizes,
  sizeIncrements: [number, number, number]
): number => {
  switch (size) {
    case "sm":
      return AppTheme.spacer(sizeIncrements[0]) as number;
    case "md":
      return AppTheme.spacer(sizeIncrements[1]) as number;
    case "lg":
      return AppTheme.spacer(sizeIncrements[2]) as number;
    default:
      return assertUnreachable(size);
  }
};

export default AppTheme;
