"use client";

import { Box } from "@chakra-ui/react";

export function CheckButton(props: any) {
  const { checked, children } = props;

  return (
    <Box
      border={"1px"}
      borderColor={!checked ? "whiteAlpha.200" : "purple.100"}
      bgColor={!checked ? "whiteAlpha.200" : "whiteAlpha.300"}
      padding={"10px"}
      borderRadius={"lg"}
      flexGrow={1}
      _hover={
        !checked
          ? {
              bgColor: "whiteAlpha.100",
              cursor: "pointer",
            }
          : {
              cursor: "pointer",
            }
      }
      {...props}
    >
      {children}
    </Box>
  );
}
