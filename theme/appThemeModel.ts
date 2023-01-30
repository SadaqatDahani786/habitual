//Color Pallete
export interface ColorPallete {
  light: string;
  main: string;
  dark: string;
}

// Color Pallete Options
export interface ColorPalleteOptions {
  color?: "primary" | "secondary" | "error" | "success" | "warn" | "info";
}

//App Theme Text
export interface Text {
  fontSize: number;
  fontWeight: ("normal" | "bold" | "bolder") | number;
  fontHeight: number;
}

//Space
export interface Space {
  horizontal: number;
  vertical: number;
}

//Spacing Options
export interface SpacingOptions {
  size: "sm" | "md" | "lg";
  space: Space;
}

//App Theme
export interface AppTheme {
  pallete: {
    primary: ColorPallete;
    secondary: ColorPallete;
    accent: {
      error: ColorPallete;
      success: ColorPallete;
      warn: ColorPallete;
      info: ColorPallete;
    };
    ui: {
      black: string;
      white: string;
      gray: ColorPallete;
    };
    background: {
      white: string;
      gray: string;
    };
    text: {
      white: string;
      black: string;
      gray: ColorPallete;
      primary: string;
      secondary: string;
      error: string;
      success: string;
      warn: string;
      info: string;
    };
  };
  typography: {
    fontFamily: string;
    headings: {
      h1: Text;
      h2: Text;
      h3: Text;
      h4: Text;
      h5: Text;
      h6: Text;
    };
    text: {
      bodyLg: Text;
      bodyMd: Text;
      bodySm: Text;
      bodySmAlt: Text;
      label: Text;
      Hint: Text;
    };
    interaction: {
      linkMd: Text;
      linkSm: Text;
      strikethroughMd: Text;
      strikethroughSm: Text;
      pillMd: Text;
      pillSm: Text;
    };
  };
  spacer(...args: number[]): number[] | number;
}
