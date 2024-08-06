"use client";

import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { forwardRef } from "react";

const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: { main: "#DC7A73" },
    secondary: { main: "#B8C8E0" },
    tertiary: { main: "#D9D9D9", second: "#f5f5f5" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FFFFFF", // Set the background color here
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h6: {
      fontFamily: inter.style.fontFamily,
    },
    subtitle1: {
      fontFamily: inter.style.fontFamily,
    },
    button: {
      fontFamily: inter.style.fontFamily,
    },
  },
});

export default theme;
