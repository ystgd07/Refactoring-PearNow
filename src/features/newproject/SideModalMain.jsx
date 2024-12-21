import React, { useState } from 'react';
import ButtonPakage from '../../ui/ButtonPakage';
import Input from '../../ui/Input';
import CalendarUI from '../../ui/CalendarUI';
import { useCreatePjtOne } from '../../store/store';
import SideModalList from './SideModalList';
import SideModalSearchResult from './SideModalSearchResult';
import InputSearch from '../../ui/InputSearch';

export default function SideModalMain({ sideEvent }) {
  const { pjtObj, setIsValidPjt1, isValidPjt1, isValidPjt2 } = useCreatePjtOne(
    (state) => state,
  );

  const { page, setNextPage, setPrevPage, setPerrIdOfPjtObj } = useCreatePjtOne(
    (state) => state,
  );

  return (
    <div>
      {page === 1 ? (
        <form>
          <Input
            content={'*프로젝트 이름을 입력해 주세요.'}
            title={'프로젝트 제목'}
          />

          <Input
            content={'프로젝트에 대한 설명을 적어주세요.'}
            title={'프로젝트 설명'}
          />

          <CalendarUI title={'프로젝트 시작'} titleColor={'text-green-500'} />
          <CalendarUI title={'프로젝트 종료'} titleColor={'text-red-500'} />

          {isValidPjt1 ? (
            <ButtonPakage
              value={'다음'}
              event={() => {
                setNextPage();
                setPerrIdOfPjtObj();
              }}
              disabled={false}
            />
          ) : (
            <ButtonPakage value={'다음'} disabled={true} />
          )}
        </form>
      ) : (
        <form className="relative">
          <InputSearch
            content={'팀원의 성함을 입력해주세요.'}
            title={'팀원 선택'}
          />
          <SideModalSearchResult />
          <SideModalList />
          <div className="flex flex-row gap-2">
            <ButtonPakage value={'이전'} event={setPrevPage} disabled={false} />

            {isValidPjt2 ? (
              <ButtonPakage value={'제출'} disabled={false} event={sideEvent} />
            ) : (
              <ButtonPakage value={'제출'} disabled={true} />
            )}
          </div>
        </form>
      )}
    </div>
  );
}
