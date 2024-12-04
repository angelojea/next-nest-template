"use-client";
import { useFormik } from "formik";
import { useAuth } from "@/contexts/auth";
import { signupSchema, signupSchemaType } from "@/schemas/signUp.schema";
import { useLoading } from "@/contexts/loading";

export const useSignUp = () => {
  const { setLoading } = useLoading();
  const { signUp } = useAuth();

  const initialValues: signupSchemaType = {
    firstname: "AOJEA",
    lastname: `Test ${Date.now()}`,
    email: `aojea${Date.now()}@test.com`,
    password: "123456",
  };
  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);
      await signUp(values);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("An error occurred please contact sys admin");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit,
  });

  return formik;
};
