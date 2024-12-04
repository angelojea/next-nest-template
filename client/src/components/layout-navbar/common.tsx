import { useAuth } from "@/contexts/auth";
import { useLoading } from "@/contexts/loading";
import { Stack, IconButton, Flex, Button, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { LuHome, LuPersonStanding, LuBuilding, LuType, LuLogOut } from "react-icons/lu";
import { Login } from "../login";

export function NavbarButtons() {
  const { user, logout, isAdmin } = useAuth();
  const { setLoading } = useLoading();

  return (
    <>
      {user && (
        <>
          <Link href={"/"}>
            <IconButton aria-label="Logout" rounded="full">
              <Flex gap={2}>
                <LuHome />
                <span>Home</span>
              </Flex>
            </IconButton>
          </Link>
          <Link href={"/employees"}>
            <IconButton aria-label="Logout" rounded="full">
              <Flex gap={2}>
                <LuPersonStanding />
                <span>Employees</span>
              </Flex>
            </IconButton>
          </Link>
          {isAdmin && (
            <>
              <Link href={"/address"}>
                <IconButton aria-label="Logout" rounded="full">
                  <Flex gap={2}>
                    <LuBuilding />
                    <span>Addresses</span>
                  </Flex>
                </IconButton>
              </Link>
              <Link href={"/address-type"}>
                <IconButton aria-label="Logout" rounded="full">
                  <Flex gap={2}>
                    <LuType />
                    <span>Addresse Types</span>
                  </Flex>
                </IconButton>
              </Link>
            </>
          )}
          <IconButton
            aria-label="Logout"
            rounded="full"
            onClick={() => {
              logout();
              setLoading(true);
            }}
          >
            <Flex gap={2}>
              <LuLogOut />
              <span>Logout</span>
            </Flex>
          </IconButton>
        </>
      )}
    </>
  );
}

export function NavbarAvatar() {
  const { user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {!user ? (
        <>
          <Button variant={"ghost"} h={"fit-content"} onClick={() => setShowSignIn(true)}>
            <Flex gap={2} alignItems={"center"}>
              <Avatar size="lg" />
              <span>Login</span>
            </Flex>
          </Button>
          <Login isOpen={showSignIn} onClose={() => setShowSignIn(false)} children={undefined} />
        </>
      ) : (
        <>
          <Flex gap={2} alignItems={"center"} h={"fit-content"}>
            <Avatar size="lg" name={`${user.firstname} ${user.lastname}`.trim() || "User"} />
            <span>{`${user.firstname} ${user.lastname}`.trim() || "User"}</span>
          </Flex>
        </>
      )}
    </>
  );
}
