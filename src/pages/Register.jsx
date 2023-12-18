import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Button, Box, Heading } from "@chakra-ui/react";

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ username, email, password }) => {
      const loggedIn = await register({ username, email, password });

      if (loggedIn) {
        navigate({
          pathname: "/",
          replace: true,
        });
      }
    },
    [register, navigate]
  );

  const validationRules = useMemo(
    () => ({
      username: {
        required: "Name is required",
      },
      email: {
        required: "Email is required",
      },
      password: {
        required: "Password is required",
      },
      confirmPassword: {
        required: "Password confirmation is required",
        validate: (value) => {
          const password = getValues("password");
          return password === value || "Passwords do not match";
        },
      },
    }),
    [getValues]
  );

  return (
    <>
      <Error error={error} />
      <FormProvider {...methods}>
        <Box margin={5} padding={5} rounded="md" boxShadow="xl">
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Heading>Register</Heading>

            <LabelInput
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              validationRules={validationRules.username}
            />

            <LabelInput
              label="Email"
              type="text"
              name="email"
              placeholder="your@email.com"
              validationRules={validationRules.email}
            />

            <LabelInput
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              validationRules={validationRules.password}
            />

            <LabelInput
              label="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              validationRules={validationRules.confirmPassword}
            />
            <Box mt="3">
              <Button mr="3" type="submit" disabled={loading} bg="blue.500">
                Register
              </Button>

              <Button onClick={handleCancel}>Cancel</Button>
            </Box>
          </form>
        </Box>
      </FormProvider>
    </>
  );
}
