import { Box, Container, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function DesktopMainContent(props: PropsWithChildren) {
  return (
    <Stack minH={"100%"} w={"100%"} flexGrow={1} bg="color-neutrals.20" py={10} px={10} overflow={"auto"}>
      {props.children}
    </Stack>
  );
}
