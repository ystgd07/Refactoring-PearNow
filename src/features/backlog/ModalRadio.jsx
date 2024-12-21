import { useBackNumStore } from '../../store/BackLogStore/store';
import Radio from '../../ui/Radio';
import RadioGroup from '../../ui/RadioGroup';

export default function ModalRadio() {
  const { backNum, setBackNum, selectedBackObj, setSelectedStatus } =
    useBackNumStore();

  return (
    <div className="text-center mb-4">
      <RadioGroup>
        {selectedBackObj.status === 'done' ? (
          <>
            <span className="mr-6">
              <Radio name="status" value="todo">
                &nbsp;진행 예정
              </Radio>
            </span>
            <span className="mr-6">
              <Radio name="status" value="ing">
                &nbsp;진행 중
              </Radio>
            </span>
            <span className="mr-6">
              <Radio name="status" value="done" defaultChecked>
                &nbsp;완료
              </Radio>
            </span>
          </>
        ) : selectedBackObj.status === 'ing' ? (
          <>
            <span className="mr-6">
              <Radio name="status" value="todo">
                &nbsp;진행 예정
              </Radio>
            </span>
            <span className="mr-6">
              <Radio name="status" value="ing" defaultChecked>
                &nbsp;진행 중
              </Radio>
            </span>
            <span className="mr-6">
              <Radio name="status" value="done">
                &nbsp;완료
              </Radio>
            </span>
          </>
        ) : (
          <>
            <span className="mr-6">
              <Radio name="status" value="todo" defaultChecked>
                &nbsp;진행 예정
              </Radio>
            </span>
            <span className="mr-6">
              <Radio name="status" value="ing">
                &nbsp;진행 중
              </Radio>
            </span>
            <span className="mr-6">
              <Radio name="status" value="done">
                &nbsp;완료
              </Radio>
            </span>
          </>
        )}
      </RadioGroup>
    </div>
  );
}
