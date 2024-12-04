import { Stack } from "@chakra-ui/react";
import { NavbarAvatar, NavbarButtons } from "./common";

export function DesktopNavbar() {
  return (
    <Stack h={"100%"} p={6} justifyContent={"space-between"} bg="color-neutrals.10">
      <Stack gap={3}>
        <NavbarButtons />
      </Stack>
      <Stack gap={3}>
        <NavbarAvatar />
      </Stack>
    </Stack>
  );
}
