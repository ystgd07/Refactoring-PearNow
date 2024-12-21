import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import { createSprint, useDateRangeStore } from '../../store/SprintStore/store';
import Checkbox from './Checkbox';
import Input from './Input';
import { PjtNumNow } from '../../store/header/store';
import { ko } from 'date-fns/esm/locale';
import { format } from 'date-fns';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
// import { ThemeProvider } from '@mui/system';

export default function TestNew() {
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
    handleDateChange,
  } = createSprint((state) => state);

  console.log('sprintDto : ', sprintDto.start_date);
  console.log('start_datestart_datestart_date : ', start_date, end_date);

  const handleDateChange2 = (dates) => {
    const [start_date, end_date] = dates;
    const formattedStartDate = format(start_date, 'yyyy-MM-dd');
    setStartDate(formattedStartDate);

    const formattedEndDate = format(end_date, 'yyyy-MM-dd');
    setEndDate(formattedEndDate);

    handleDateChange(dates);
  };

  // 커스텀
  const newTheme = (theme) =>
    createTheme({
      ...theme,
      components: {
        MuiPickersDay: {
          styleOverrides: {
            today: {
              color: '#ad1457',
              borderRadius: 20,
              borderWidth: 0,
              borderColor: '#e91e63',
              border: '0px solid',
              backgroundColor: '#f8bbd0',
            },
          },
        },
      },
    });

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

  // setBacklogs
  const handleBacklogSelection = (selectedBacklogs) => {
    setBacklogs(selectedBacklogs);
  };

  return (
    <>
      <div className="bg-white rounded-lg w-full h-auto my-2 p-5">
        <div className="gpa-3 flex-col mr-5">
          <div className="flex flex-row">
            <span className="col-span-2 w-1/2">
              <Input
                value={' * 무엇을 해야합니까'}
                onChange={(e) => setTitle(e.target.value)}
              />
            </span>
            <span className="mr-4 w-1/2">
              <ThemeProvider theme={newTheme}>
                <DatePicker
                  locale={ko}
                  selected={
                    sprintDto.start_date ? new Date(sprintDto.start_date) : null
                  }
                  onChange={(handleDateChange, handleDateChange2)}
                  startDate={
                    sprintDto.start_date ? new Date(sprintDto.start_date) : null
                  }
                  endDate={
                    sprintDto.end_date ? new Date(sprintDto.end_date) : null
                  }
                  selectsRange
                  minDate={new Date()}
                  dateFormat="yyyy.MM.dd"
                  placeholderText=" * 기간 을 설정해주세요"
                  className="border-gray-300 rounded-lg items-center border-2 ml-2 w-96 custom-datepicker"
                />
              </ThemeProvider>
            </span>
          </div>
          <span className="col-span-2 w-full">
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
