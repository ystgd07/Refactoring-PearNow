import React from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreatePjtOne } from '../store/store';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
export default function CalendarUI({ title, titleColor }) {
  const { setPjtStartDate, setPjtEndDate, pjtObj, setIsValidPjt1 } =
    useCreatePjtOne((state) => state);

  const dateInputChangeHandler = (date) => {
    if (title === '프로젝트 시작') {
      setPjtStartDate(date);
      setIsValidPjt1(pjtObj);
    }
    if (title === '프로젝트 종료') {
      setPjtEndDate(date);
      setIsValidPjt1(pjtObj);
    }
    console.log('datatatata', pjtObj.start_date);
  };

  registerLocale('ko', ko);

  return (
    <div>
      <p className={`font-semibold ${titleColor}`}>{title}</p>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect
        minDate={new Date('2000-01-01')}
        maxDate={new Date('2050-01-01')}
        selected={
          new Date(
            `${
              title === '프로젝트 시작'
                ? format(pjtObj.start_date, 'yyyy.MM.dd')
                : format(pjtObj.end_date, 'yyyy.MM.dd')
            }`,
          )
        }
        onChange={dateInputChangeHandler}
        className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-4 w-full ${
          new Date(format(pjtObj.start_date, 'yyyy.MM.dd')).getTime() >=
          new Date(format(pjtObj.end_date, 'yyyy.MM.dd')).getTime()
            ? 'border-red-600'
            : 'border-green-400'
        } `}
      />
    </div>
  );
}
