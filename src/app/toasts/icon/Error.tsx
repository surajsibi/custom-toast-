import "./error.css";

export function ErrorIcon({ primary = "#ff4b4b", secondary = "#fff" }) {
  return (
    <div
      className="error-icon"
      style={{
        background: primary,
      }}
    />
  );
}
