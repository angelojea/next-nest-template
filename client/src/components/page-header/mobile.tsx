import { Flex, Heading, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

type PageHeaderProps = {
  title: string;
  backTo: string;
};

export function PageHeader({ title = "Page", backTo = "/" }: PageHeaderProps) {
  return (
    <Flex gap={3}>
      <Link href={backTo}>
        <IconButton aria-label="Logout" rounded="full" variant={"oulined"}>
          <LuArrowLeft />
        </IconButton>
      </Link>
      <Heading as={"h1"}>{title}</Heading>
    </Flex>
  );
}
