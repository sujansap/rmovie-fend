export default function Loader() {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="spinner-border">
        <span data-cy="loader" className="visually-hidden">
          Loading...
        </span>
      </div>
    </div>
  );
}
