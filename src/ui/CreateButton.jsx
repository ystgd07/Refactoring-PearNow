export default function CreateButton({
  value,
  option,
  event,
  backlogdto,
  backFileDto,
}) {
  console.log('createButton : ', backFileDto);
  console.log('createButton BackLogDto : ', backlogdto);
  return (
    <>
      <button
        className="text-right mr-1 mb-2"
        onClick={() => {
          event(backlogdto, backFileDto);
        }}
      >
        <span
          className={`text-lg bg-amber-200 p-2 font-medium px-4 rounded-md hover:bg-amber-300 ${option}`}
        >
          {value}
        </span>
      </button>
    </>
  );
}
