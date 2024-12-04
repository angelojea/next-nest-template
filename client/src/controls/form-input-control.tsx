import * as Yup from "yup";
import { Input, Stack, Text } from "@chakra-ui/react";
import { DatePicker } from "@orange_digital/chakra-datepicker";
import { SimpleDatePicker } from "simple-chakra-ui-datepicker";

type FormInputControlProps = {
  form: any;
  field: any;
  fieldName: string;
  disabled: boolean;
};

export function FormInputControl({ form, field, fieldName, disabled }: FormInputControlProps) {
  return (
    <Stack gap={2}>
      <label>{field.spec.label}</label>
      {field.type === "date" ? (
        <SimpleDatePicker
          {...(form.values[fieldName] ? { defaultValue: new Date(form.values[fieldName]) } : {})}
          closeOnClick={true}
          onChange={(date) => {
            if (date) form.setFieldValue(fieldName, date);
          }}
          isDisabled={disabled}
        />
      ) : (
        <Input
          name={fieldName}
          onChange={(ev) => form.setFieldValue(fieldName, ev.target.value)}
          onBlur={form.handleBlur}
          disabled={disabled}
          {...(form.values[fieldName] ? { value: form.values[fieldName] } : {})}
          {...(fieldName === "password" ? { type: fieldName } : {})}
        />
      )}
      <Text fontSize={"12px"} color={"color-feedback.red.50"}>
        {Boolean(form.touched[fieldName]) && Boolean(form.errors[fieldName]) && form.errors[fieldName]}
      </Text>
    </Stack>
  );
}
