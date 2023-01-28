//App Theme Color Pallete
interface ColorPallete {
  light: string;
  main: string;
  dark: string;
}

//App Theme
interface AppTheme {
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
}

//Theme Provider
const themeProvider: AppTheme = {
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
};

export default themeProvider;
