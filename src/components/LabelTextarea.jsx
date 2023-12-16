import { FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function LabelTextarea({
  label,
  name,
  placeholder,
  validationRules,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        {...register(name, validationRules)}
        placeholder={placeholder}
        disabled={isSubmitting}
        {...rest}
      ></Textarea>
      {hasError ? (
        <Text data-cy="label_input_error" color="red">
          {errors[name].message}
        </Text>
      ) : null}
    </FormControl>
  );
}
