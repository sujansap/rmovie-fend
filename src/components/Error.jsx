import { isAxiosError } from "axios";

export default function Error({ error }) {
  // 👈 1
  if (isAxiosError(error)) {
    // 👈 2
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Oops, something went wrong</h4>
        <p>
          {/* 👇 3 */}
          {error.response?.data?.message || error.message}
          {error.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </div>
    );
  }

  // 👇 4
  if (error) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null; // 👈 5
}
