"use client";
import { PropsWithChildren } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { fontSizes } from "./font-size";
import { fontWeights } from "./font-weight";
import { lineHeights } from "./line-height";
import { breakpoints } from "./breakpoints";
import { spacings } from "./spacings";
import { borderRadius } from "./border-radius";
import { colors } from "./colors";

const themeConfig = extendTheme({
  fontSizes: fontSizes,
  fontWeights: fontWeights,
  lineHeights: lineHeights,
  breakpoints,
  space: {
    spacings,
  },
  radii: {
    "border-radius": borderRadius,
  },
  colors,
  styles: {
    global: {
      body: {},
    },
  },
});

export function ChakraThemeProvider(props: PropsWithChildren) {
  return <ChakraProvider theme={themeConfig}>{props.children}</ChakraProvider>;
}
