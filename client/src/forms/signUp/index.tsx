"use client";
import React from "react";
import { useSignUp } from "./useSignUp";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useLoading } from "@/contexts/loading";
import { signupSchema, signupSchemaType } from "@/schemas/signUp.schema";
import { FormInputControl } from "@/controls/form-input-control";

export const SignUpForm = () => {
  const form = useSignUp();

  return (
    <form>
      <Stack gap={5}>
        {Object.keys(signupSchema.fields).map((key, i) => (
          <FormInputControl
            key={i}
            form={form}
            field={signupSchema.fields[key as keyof signupSchemaType]}
            fieldName={key as keyof signupSchemaType}
          />
        ))}
        <Button variant={"solid"} onClick={form.submitForm} disabled={!form.isValid}>
          SignUp
        </Button>
      </Stack>
    </form>
  );
};
