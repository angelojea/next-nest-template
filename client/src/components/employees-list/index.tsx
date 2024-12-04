"use client";
import React from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import page from "@/app/page";
import { LuTrash, LuArrowLeft, LuArrowRight, LuPlus } from "react-icons/lu";
import { PageHeader } from "../page-header/mobile";
import { ssrSignedIn } from "@/ssr/ssrSignedIn";
import useServerActions from "@/utils/useServerActions";
import { useAuth } from "@/contexts/auth";
import useClientActions from "@/utils/useClientActions";
import { useLoading } from "@/contexts/loading";

type EmployeesListProps = {
  page: number;
  pageSize: number;
  employees: any[];
};

export const EmployeesList = (props: EmployeesListProps) => {
  const { user, isAdmin } = useAuth();
  const { deleteEmployee } = useClientActions();
  const { setLoading } = useLoading();
  const { page, pageSize, employees } = props;

  return (
    <Stack gap={10}>
      <Box>
        <PageHeader title={"Employees"} backTo={"/employees"} />
      </Box>
      {isAdmin && (
        <Flex flexDirection={"row-reverse"}>
          <Link href={`/employees/new`}>
            <Button aria-label="left" rounded="full">
              <Flex gap={3}>
                <LuPlus />
                <Text>New Employee</Text>
              </Flex>
            </Button>
          </Link>
        </Flex>
      )}
      <Box>
        <TableContainer bg="color-neutrals.5">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Job Title</Th>
                <Th>Birth Date</Th>
                <Th>Start Date</Th>
                {isAdmin && <Th>Actions</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((x, i) => (
                <Tr key={i}>
                  <Td>
                    <b>
                      <Link href={`/employees/${x.id}`}>{x.firstname}</Link>
                    </b>
                    {x.id === user?.sub && <Text>(Me)</Text>}
                  </Td>
                  <Td>{x.lastname}</Td>
                  <Td>{x.jobtitle}</Td>
                  <Td>{new Date(x.birthdate).toLocaleDateString()}</Td>
                  <Td>{new Date(x.startdate).toLocaleDateString()}</Td>
                  {isAdmin && (
                    <Td>
                      <IconButton
                        aria-label="left"
                        rounded="full"
                        colorScheme={"red"}
                        icon={<LuTrash />}
                        onClick={async () => {
                          if (!confirm("Sure?")) return;
                          setLoading(true);
                          await deleteEmployee(x.id);
                          setLoading(false);
                        }}
                      />
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex w="100%" justifyContent={"space-between"}>
        {page > 1 ? (
          <Link href={`/employees?page=${page - 1}&pageSize=${pageSize}`}>
            <IconButton aria-label="left" rounded="full">
              <LuArrowLeft />
            </IconButton>
          </Link>
        ) : (
          <Box></Box>
        )}
        {employees.length <= 0 || employees.length < pageSize ? (
          <Box></Box>
        ) : (
          <Link href={`/employees?page=${page + 1}&pageSize=${pageSize}`}>
            <IconButton aria-label="left" rounded="full">
              <LuArrowRight />
            </IconButton>
          </Link>
        )}
      </Flex>
    </Stack>
  );
};
