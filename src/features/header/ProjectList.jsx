import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { toggleDropdown } from '../../store/header/store';

export default function ProjectList({ index, pjt }) {
  const { setCurrentPjtNumber, currentProjectNumber, setCurrentPjtOwner } =
    useBackLogPageRes((state) => state);

  const { pjtData } = useProjectInBackLog((state) => state);

  const { selectedDtopdownOfHeader, setSelectedDtopdownOfHeader } =
    toggleDropdown((state) => state);

  return (
    <>
      <p
        href="#"
        className="block px-4 py-2 mb-1 cursor-pointer hover:bg-gray-100"
        onClick={() => {
          setSelectedDtopdownOfHeader();
          setCurrentPjtNumber(index);
          setCurrentPjtOwner(
            ...pjtData?.filter((e, idx) => idx === currentProjectNumber),
          );
        }}
      >
        {/* 제목 */}
        {pjt.title}
      </p>
    </>
  );
}
