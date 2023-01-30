import { assertUnreachable } from "../utils/utils";
import {
  ColorPallete,
  ColorPalleteOptions,
  Space,
  SpacingOptions,
  AppTheme as AppThemeI,
} from "./appThemeModel";

//Theme Provider
const AppTheme: AppThemeI = {
  pallete: {
    primary: {
      light: "#FFE7C3",
      main: "#FFA825",
      dark: "#FCBA56",
    },
    secondary: {
      light: "#DFF5FF",
      main: "#25BEFF",
      dark: "#72C9EF",
    },
    accent: {
      error: {
        light: "#FFACA7",
        main: "#FF6B62",
        dark: "#FF3528",
      },
      success: {
        light: "#8CFFBA",
        main: "#53FA96",
        dark: "#1DFF77",
      },
      warn: {
        light: "#FFE790",
        main: "#FFD84D",
        dark: "#FECC1A",
      },
      info: {
        light: "#C7ACFF",
        main: "#864DFF",
        dark: "#641BFF",
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
    fontFamily: "Arial",
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
        fontWeight: "normal",
      },
      linkSm: {
        fontSize: 12,
        fontHeight: 16,
        fontWeight: "normal",
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

  switch (size) {
    case "sm":
      return {
        horizontal,
        vertical,
      };
    case "md":
      return {
        horizontal: horizontal * 2,
        vertical: vertical * 2,
      };
    case "lg":
      return {
        horizontal: horizontal * 3,
        vertical: vertical * 3,
      };
    default:
      return assertUnreachable(size);
  }
};

export default AppTheme;
