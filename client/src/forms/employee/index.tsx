"use client";
import React from "react";
import { useForm } from "./useForm";
import { Button, Stack } from "@chakra-ui/react";
import { FormInputControl } from "@/controls/form-input-control";
import { employeeSchema, employeeSchemaType } from "@/schemas/employee.schema";

type EmployeeFormProps = {
  canEdit: boolean;
  initialValues?: employeeSchemaType;
  id?: string;
};

export const EmployeeForm = (props: EmployeeFormProps) => {
  const form = useForm(props);

  return (
    <form>
      <Stack gap={5}>
        {Object.keys(employeeSchema.fields)
          .filter((x) => x !== "id")
          .map((key, i) => (
            <FormInputControl
              key={i}
              form={form}
              field={employeeSchema.fields[key as keyof employeeSchemaType]}
              fieldName={key as keyof employeeSchemaType}
              disabled={!props.canEdit}
            />
          ))}
        {props.canEdit && (
          <Button colorScheme="blue" variant={"solid"} onClick={form.submitForm} disabled={!form.isValid}>
            Login
          </Button>
        )}
      </Stack>
    </form>
  );
};
