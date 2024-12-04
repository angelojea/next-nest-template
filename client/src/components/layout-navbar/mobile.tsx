import { Flex } from "@chakra-ui/react";
import { NavbarAvatar, NavbarButtons } from "./common";

export function MobileNavbar() {
  return (
    <Flex w={"100%"} p={6} justifyContent={"space-between"} bg="color-neutrals.10">
      <Flex gap={3}>
        <NavbarButtons />
      </Flex>
      <Flex>
        <NavbarAvatar />
      </Flex>
    </Flex>
  );
}
