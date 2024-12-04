import { PageHeader } from "@/components/page-header/mobile";
import { EmployeeForm } from "@/forms/employee";
import { employeeSchemaType } from "@/schemas/employee.schema";
import { ssrSignedIn } from "@/ssr/ssrSignedIn";
import useServerActions, { RoutingParams } from "@/utils/useServerActions";
import { Stack, Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default async function Page(props: RoutingParams & PropsWithChildren) {
  return (
    <>
      <Stack gap={10}>
        <Box>
          <PageHeader title={`New Employee`} backTo={"/employees"} />
        </Box>
        <Box bg="color-neutrals.10" p={15} borderRadius={"border-radius.1"}>
          <EmployeeForm canEdit={true} />
        </Box>
      </Stack>
    </>
  );
}