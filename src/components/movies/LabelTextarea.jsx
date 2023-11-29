import { FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function LabelTextarea({
  label,
  name,
  placeholder,
  validationRules,
}) {
  const { register, errors } = useFormContext();

  const hasError = name in errors;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        {...register(name, validationRules)}
        placeholder={placeholder}
      ></Textarea>
      {hasError ? <Text color="red">{errors[name].message}</Text> : null}
    </FormControl>
  );
}
