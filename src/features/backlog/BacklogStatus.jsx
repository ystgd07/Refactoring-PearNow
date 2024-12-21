export default function BacklogStatus({ value, color }) {
  return (
    <>
      <div className={`text-${color}-500 font-semibold`}>{value}</div>
    </>
  );
}
