"use client";
import { DesktopNavbar } from "@/components/layout-navbar/desktop";
import { MobileNavbar } from "@/components/layout-navbar/mobile";
import useScreenSize from "../utils/useScreenSize";
import { Flex, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { MobileMainContent } from "@/components/layout-main-content/mobile";
import { DesktopMainContent } from "@/components/layout-main-content/desktop";

type RootLayoutProps = {
  ssrMobile: boolean;
} & PropsWithChildren;

export function RootLayout(props: RootLayoutProps) {
  const { isMobile } = useScreenSize(props.ssrMobile);

  // Mobile Layout
  return isMobile ? (
    <Stack gap={0} width={"100%"} height={"100%"} position={"absolute"}>
      <MobileNavbar />
      <MobileMainContent>{props.children}</MobileMainContent>
    </Stack>
  ) : (
    // Desktop Layout
    <Flex width={"100%"} height={"100%"} position={"absolute"}>
      <DesktopNavbar />
      <DesktopMainContent>{props.children}</DesktopMainContent>
    </Flex>
  );
}
