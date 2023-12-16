import { Button, Box } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const validationRules = {
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: "test1@test.com",
      password: "verydifficult",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    console.log("here....");
    //reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password); // 👈 2

      if (loggedIn) {
        navigate({
          pathname: "/",
          replace: true,
        });
      } // 👈 3
    },
    [login, navigate] // 👈 2 en 3
  );

  return (
    <FormProvider {...methods}>
      <Error error={error} />
      <form onSubmit={handleSubmit(handleLogin)} onClick={handleCancel}>
        <Box margin={5} padding={5} rounded="md" boxShadow="xl">
          <LabelInput
            label="email"
            type="text"
            name="email"
            placeholder="your@email.com"
            data-cy="email_input"
            validationRules={validationRules.email}
          />

          <LabelInput
            label="password"
            type="password"
            name="password"
            data-cy="password_input"
            validationRules={validationRules.password}
          />
          <Box mt="3">
            <Button
              type="submit"
              disabled={loading}
              bg="blue.500"
              data-cy="submit_btn"
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
