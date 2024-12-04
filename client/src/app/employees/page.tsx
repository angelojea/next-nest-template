import { EmployeesList } from "@/components/employees-list";
import { ssrSignedIn } from "@/ssr/ssrSignedIn";
import useServerActions, { RoutingParams } from "@/utils/useServerActions";
import { PropsWithChildren } from "react";

export default async function Page(props: RoutingParams & PropsWithChildren) {
  const { getEmployees } = useServerActions();
  const user = ssrSignedIn();
  const { searchParams } = props;

  const page = Number(searchParams?.page || 1);
  const pageSize = Number(searchParams?.pageSize || 10);

  const employees = (await getEmployees(page, pageSize)) as any[];
  return <EmployeesList page={page} pageSize={pageSize} employees={employees} />;
}
