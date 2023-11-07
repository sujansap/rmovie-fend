import Loader from "./Loader"; // 👈 1
import Error from "./Error"; // 👈 1

export default function AsyncData({
  loading, // 👈 2
  error, // 👈 3
  children, // 👈 4
}) {
  // 👇 2
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Error error={error} /> {/* 👈 3 */}
      {children} {/* 👈 4 */}
    </>
  );
}
