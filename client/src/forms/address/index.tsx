"use client";
import React from "react";
import { useForm } from "./useForm";
import { Button, Stack } from "@chakra-ui/react";
import { loginSchema, loginSchemaType } from "@/schemas/login.schema";
import { FormInputControl } from "@/controls/form-input-control";

export const LoginForm = () => {
  const form = useForm();

  return (
    <form>
      <Stack gap={5}>
        {Object.keys(loginSchema.fields).map((key, i) => (
          <FormInputControl
            key={i}
            form={form}
            field={loginSchema.fields[key as keyof loginSchemaType]}
            fieldName={key as keyof loginSchemaType}
          />
        ))}
        <Button variant={"solid"} onClick={form.submitForm} disabled={!form.isValid}>
          Login
        </Button>
      </Stack>
    </form>
  );
};
