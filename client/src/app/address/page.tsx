import { PageHeader } from "@/components/page-header/mobile";
import { RoutingParams } from "@/utils/useServerActions";
import { Stack, Box, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default async function Page(props: RoutingParams & PropsWithChildren) {
  return (
    <>
      <Stack gap={10}>
        <Box>
          <PageHeader title={`Address Types`} backTo={"/"} />
        </Box>
        <Box bg="color-neutrals.10" p={15} borderRadius={"border-radius.1"}>
          <Text>To be implmented</Text>
        </Box>
      </Stack>
    </>
  );
}
