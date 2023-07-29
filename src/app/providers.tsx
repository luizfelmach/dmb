"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: "#101010",
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript
          initialColorMode={theme.config.initialColorMode}
        ></ColorModeScript>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
