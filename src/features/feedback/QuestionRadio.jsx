import ScoreRadio from './ScoreRadio';

export default function QuestionRadio() {
  return (
    <>
      <div className="m-2 mb-4">
        <p className="mb-1"> * 동료는 자신이 맡은 일을 잘 수행하였나요?</p>
        <p>
          <ScoreRadio />
        </p>
      </div>
      <div className="m-2 mb-4">
        <p className="mb-1"> * 동료는 기간 및 일정을 잘 지켰나요?</p>
        <p>
          <ScoreRadio />
        </p>
      </div>
      <div className="m-2 mb-4">
        <p className="mb-1"> * 동료의 프로젝트 기여도는 얼마인가요?</p>
        <p>
          <ScoreRadio />
        </p>
      </div>
      <div className="m-2 mb-4">
        <p className="mb-1"> * 동료와 커뮤니케이션이 잘 되었나요?</p>
        <p>
          <ScoreRadio />
        </p>
      </div>
      <div className="m-2 mb-4">
        <p className="mb-1"> * 다음에도 이 동료와 함께 하고싶나요?</p>
        <p>
          <ScoreRadio />
        </p>
      </div>
    </>
  );
}
