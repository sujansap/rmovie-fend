import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/movies/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";

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
      } // 👈 3
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
    <FormProvider {...methods}>
      <div>
        <form
          className="d-flex flex-column"
          onSubmit={handleSubmit(handleRegister)}
        >
          <h1>Register</h1>

          <Error error={error} />

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
            validationRules={validationRules.password}
          />

          <LabelInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
          />

          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Register
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
