import Radio from '../../ui/Radio';
import RadioGroup from '../../ui/RadioGroup';

export default function ScoreRadio({ name }) {
  return (
    <>
      <RadioGroup>
        {Array.apply(null, Array(10)).map((e, idx) => (
          <Radio name={name} value={idx + 1} defaultChecked="1">
            {idx + 1}점
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
}

{
  /* <Radio name={name} value="1" onChange={onChange} defaultChecked>
        1점
      </Radio>
      <Radio name={name} value="2" onChange={onChange}>
        2점
      </Radio>
      <Radio name={name} value="3" onChange={onChange}>
        3점
      </Radio>
      <Radio name={name} value="4" onChange={onChange}>
        4점
      </Radio>
      <Radio name={name} value="5" onChange={onChange}>
        5점
      </Radio>
      <Radio name={name} value="6" onChange={onChange}>
        6점
      </Radio>
      <Radio name={name} value="7" onChange={onChange}>
        7점
      </Radio>
      <Radio name={name} value="8" onChange={onChange}>
        8점
      </Radio>
      <Radio name={name} value="9" onChange={onChange}>
        9점
      </Radio>
      <Radio name={name} value="9" onChange={onChange}>
        10점
      </Radio> */
}
