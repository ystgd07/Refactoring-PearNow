import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import { createSprint, useDateRangeStore } from '../../store/SprintStore/store';
import Checkbox from './Checkbox';
import Input from './Input';
import { PjtNumNow } from '../../store/header/store';
import { ko } from 'date-fns/esm/locale';
import { format, addMonths } from 'date-fns';

export default function NewSprintCreatePage() {
  // 헤더 프로젝트 번호
  const { nowNum } = PjtNumNow((state) => state);
  console.log('[NewSprintCreatePage] nowNum 번호 ====> ', nowNum);
  // 스프린트 생성
  const {
    setTitle,
    setDetail,
    setStartDate,
    start_date,
    setEndDate,
    end_date,
    setBacklogs,
    sprintDto,
  } = createSprint((state) => state);

  console.log('sprintDto : ', sprintDto.start_date);
  console.log('start_datestart_datestart_date : ', start_date, end_date);

  // Date Handler
  // const handleStartDateChange = (date) => {
  //   // setSelectedStartDate(date);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   console.log('test date: ', date);
  //   setStartDate(`${year}-${month}-${day}`);
  // };
  // const handleEndDateChange = (date) => {
  //   // setSelectedEndDate(date);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   setEndDate(`${year}-${month}-${day}`);
  // };
  const handleStartDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedStartDate = `${year}-${month}-${day}`;
    const formattedEndDate = end_date;

    // end_date > start_date : end_date초기화
    if (formattedEndDate && formattedEndDate < formattedStartDate) {
      setEndDate(null);
    }

    setStartDate(formattedStartDate);
  };

  const handleEndDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedEndDate = `${year}-${month}-${day}`;

    // end_date > start_date : end_date초기화
    if (formattedEndDate < start_date) {
      setEndDate(null);
    } else {
      setEndDate(formattedEndDate);
    }
  };

  //  6개월 후의 날짜 계산
  const sixMonthsLater = addMonths(new Date(), 6);

  // setBacklogs
  const handleBacklogSelection = (selectedBacklogs) => {
    setBacklogs(selectedBacklogs);
  };

  return (
    <>
      <div className="bg-white rounded-lg w-full h-auto my-2 p-5 border-2">
        <div className="">
          <span className="grid grid-cols-3">
            <span className="col-span-1">
              <Input
                value={' * 무엇을 해야합니까'}
                onChange={(e) => setTitle(e.target.value)}
              />
            </span>

            <span className="col-span-1">
              <DatePicker
                minDate={new Date()}
                maxDate={sixMonthsLater}
                locale={ko}
                selected={
                  sprintDto.start_date ? new Date(sprintDto.start_date) : null
                }
                onChange={handleStartDateChange}
                dateFormat="yyyy.MM.dd"
                // isClearable
                placeholderText=" * 시작 시간을 설정해주세요"
                className="border-gray-300 rounded-lg border-2 w-[22rem] m-1 custom-datepicker"
              />
            </span>
            <span className="col-span-1">
              <DatePicker
                minDate={
                  sprintDto.start_date
                    ? new Date(sprintDto.start_date)
                    : new Date()
                }
                maxDate={sixMonthsLater}
                locale={ko}
                selected={
                  sprintDto.end_date ? new Date(sprintDto.end_date) : null
                }
                onChange={handleEndDateChange}
                dateFormat="yyyy.MM.dd"
                // isClearable
                placeholderText=" * 종료 기간을 설정해주세요"
                className="border-gray-300 rounded-lg border-2 w-[22rem] m-1 custom-datepicker"
              />
            </span>
          </span>
          <span className="col-span-2">
            <Input
              value={'  설명을 입력하실 수 있습니다'}
              onChange={(e) => setDetail(e.target.value)}
            />
          </span>
        </div>

        {/* 백로그 선택 칸 - 모든 백로그 */}
        <Checkbox handleBacklogSelection={handleBacklogSelection} />
      </div>
    </>
  );
}
