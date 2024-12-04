"use client";
import { useAuth } from "@/contexts/auth";
import { Heading, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Home(props: PropsWithChildren) {
  const { user } = useAuth();
  return (
    <Stack gap={5}>
      <Heading as="h1">Hi there, this is the AOJ Next App</Heading>
      {user ? (
        <p>please select the page you want to naviate to on the navbar</p>
      ) : (
        <p>
          please hit the <b>Login</b> button to authenticate
        </p>
      )}
    </Stack>
  );
}
