"use-client";
import { useFormik } from "formik";
import { addressSchema, addressSchemaType } from "@/schemas/address.schema";

type useAddressProps = {
  initialValues?: addressSchemaType;
};

export const useForm = (props?: useAddressProps) => {
  const onSubmit = async (values: addressSchemaType, { resetForm }: any) => {
    try {
    } catch (error) {
      console.error(error);
      alert("An error occurred please contact sys admin");
    }
  };

  const formik = useFormik({
    initialValues: props?.initialValues || addressSchema.getDefault(),
    validationSchema: addressSchema,
    onSubmit,
  });

  return formik;
};
