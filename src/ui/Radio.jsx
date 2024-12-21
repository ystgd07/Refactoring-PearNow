import { useBackNumStore } from '../store/BackLogStore/store';
import { useTogetherPeerEv } from '../store/PeerStore/store';
import { useCreatePjtOne } from '../store/store';

export default function Radio({
  children,
  value,
  name,
  defaultChecked,
  disabled,
  id,
}) {
  const { setSelectedStatus } = useBackNumStore();
  const { setSelectUserRole } = useCreatePjtOne((state) => state);
  const {
    selectPeerId,
    setSelectedScore1,
    score1,
    setSelectedScore2,
    score2,
    setSelectedScore3,
    setSelectedScore4,
    setSelectedScore5,
    setComment1,
    comment1,
    setComment2,
    togetherPeerDto,
  } = useTogetherPeerEv((state) => state);

  return (
    <label className="mr-4">
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="text-[#f7cc10] border-[#f7cc10] border-2 hover:cursor-pointer focus:ring-1 focus:ring-[#f7cc10]"
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          setSelectUserRole(id, value);
          console.log('iinRadioName :', e.target.value);
          if (name === 'score1') setSelectedScore1(e.target.value);
          else if (name === 'score2') setSelectedScore2(e.target.value);
          else if (name === 'score3') setSelectedScore3(e.target.value);
          else if (name === 'score4') setSelectedScore4(e.target.value);
          else if (name === 'score5') setSelectedScore5(e.target.value);
        }}
      />
      {children}
    </label>
  );
}
