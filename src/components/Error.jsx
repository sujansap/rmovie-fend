import { isAxiosError } from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import { useAuth } from "../contexts/Auth.context";
import { useEffect } from "react";

export default function Error({ error }) {
  const { logout, checkTokenExpiration } = useAuth();

  useEffect(() => {
    if (error && error.length >= 1) {
      if (error?.response?.data?.message.startsWith("jwt expired")) {
        if (!checkTokenExpiration()) {
          logout();
        }
      }
    }
  });

  if (isAxiosError(error)) {
    return (
      <>
        <Alert data-cy="axios_error_message" status="error">
          <AlertIcon />
          <AlertTitle>Oops, something went wrong!</AlertTitle>
          <AlertDescription>
            {error.response?.data?.message || error.message}
            {error.response?.data?.details && (
              <>
                :
                <br />
                {JSON.stringify(error.response.data.details)}
              </>
            )}
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>An unexpected error occured</AlertTitle>
        <AlertDescription>
          {error.message || JSON.stringify(error)}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
