"use-client";
import { useFormik } from "formik";
import { useAuth } from "@/contexts/auth";
import { loginSchema, loginSchemaType } from "@/schemas/login.schema";
import { useLoading } from "@/contexts/loading";

export const useLogin = () => {
  const { setLoading } = useLoading();
  const { login } = useAuth();

  const initialValues: loginSchemaType = {
    username: "aojea@test.com",
    password: "123456",
  };
  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);
      await login(values);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("An error occurred please contact sys admin");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  return formik;
};
