//App Theme Color Pallete
interface ColorPallete {
  light: string;
  main: string;
  dark: string;
}

//App Theme Text
interface Text {
  fontSize: number;
  fontWeight: ("normal" | "bold" | "bolder") | number;
  fontHeight: number;
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
};

export default themeProvider;
