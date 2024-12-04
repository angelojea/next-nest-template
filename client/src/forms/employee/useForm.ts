"use-client";
import { useFormik } from "formik";
import { employeeSchema, employeeSchemaType } from "@/schemas/employee.schema";
import useClientActions from "@/utils/useClientActions";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/loading";

type useAddressProps = {
  initialValues?: employeeSchemaType;
  id?: string;
};

export const useForm = (props?: useAddressProps) => {
  const { updateEmployee, createEmployee } = useClientActions();
  const { setLoading } = useLoading();
  const router = useRouter();

  const onSubmit = async (values: employeeSchemaType, { resetForm }: any) => {
    try {
      setLoading(true);
      if (values.id) {
        await updateEmployee(String(values.id), values);
      } else {
        await createEmployee(values);
      }
      router.push("/employees");
    } catch (error) {
      console.error(error);
      alert("An error occurred please contact sys admin");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: props?.initialValues || employeeSchema.getDefault(),
    validationSchema: employeeSchema,
    onSubmit,
  });
  return formik;
};
