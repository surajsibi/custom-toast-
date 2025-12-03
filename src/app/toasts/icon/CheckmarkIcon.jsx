import "./checkmark.css";
export function CheckmarkIcon({ primary = "#61d345" }) {
  return <div className="checkmark" style={{ background: primary }} />;
}
