import { useFormContext } from "react-hook-form";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  ...rest
}) {
  const { register, errors } = useFormContext();

  const hasError = name in errors;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name, validationRules)}
        id={name}
        type={type}
        placeholder={label}
        {...rest}
      />
      {hasError ? <Text color="red">{errors[name].message}</Text> : null}
    </FormControl>
  );
}
