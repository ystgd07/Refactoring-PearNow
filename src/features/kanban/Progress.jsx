export default function Progress({ value, color }) {
  return (
    <>
      <div className="mb-3">
        <span
          className={`progress-bar text-black text-2xl font-bold rounded-md p-1 px-2`}
          // text-white
        >
          {value}
        </span>
      </div>
    </>
  );
}
