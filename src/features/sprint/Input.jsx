export default function Input({ value, onChange }) {
  return (
    <>
      <input
        className="border-2 border-gray-300 rounded-lg p-2 my-1 w-full"
        placeholder={value}
        onChange={onChange}
      />
    </>
  );
}
