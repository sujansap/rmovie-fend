import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Button, Box, Heading } from "@chakra-ui/react";

import { useLanguage } from "../contexts/Language.context";

import translations from "../translation/translation";

export default function Register() {
  const { error, loading, register } = useAuth();
  const { language } = useLanguage();
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
        required:
          translations[language].username +
          " " +
          translations[language].isRequired,
      },
      email: {
        required: "Email " + translations[language].isRequired,
      },
      password: {
        required:
          translations[language].password +
          " " +
          translations[language].isRequired,
      },
      confirmPassword: {
        required:
          translations[language].password +
          " " +
          translations[language].confirmation +
          " " +
          translations[language].isRequired,
        validate: (value) => {
          const password = getValues("password");
          return password === value || translations[language].passDonotMatch;
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
              label={translations[language].username}
              type="text"
              name="username"
              placeholder={translations[language].username}
              validationRules={validationRules.username}
            />

            <LabelInput
              label="email"
              type="text"
              name="email"
              placeholder="your@email.com"
              validationRules={validationRules.email}
            />

            <LabelInput
              label={translations[language].password}
              type="password"
              name={translations[language].password}
              placeholder={translations[language].password}
              validationRules={validationRules.password}
            />

            <LabelInput
              label={
                translations[language].confirm +
                " " +
                translations[language].password
              }
              type="password"
              name="confirmPassword"
              placeholder={
                translations[language].confirm +
                " " +
                translations[language].password
              }
              validationRules={validationRules.confirmPassword}
            />
            <Box mt="3">
              <Button mr="3" type="submit" disabled={loading} bg="blue.500">
                {translations[language].register}
              </Button>

              <Button onClick={handleCancel}>Cancel</Button>
            </Box>
          </form>
        </Box>
      </FormProvider>
    </>
  );
}
