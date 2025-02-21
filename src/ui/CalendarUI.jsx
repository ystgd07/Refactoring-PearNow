import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useCreatePjtOne } from '../store/store';

export default function CalendarUI({ title, titleColor }) {
  const { pjtObj, setPjtObj } = useCreatePjtOne((state) => state);

  const handleDateChange = (date) => {
    const fieldName = title.includes('시작') ? 'start_date' : 'end_date';

    setPjtObj({
      ...pjtObj,
      [fieldName]: date, // 날짜 객체를 직접 전달
    });
  };

  const getSelectedDate = () => {
    const fieldName = title.includes('시작') ? 'start_date' : 'end_date';
    const dateValue = pjtObj[fieldName];

    // null, undefined 또는 빈 문자열이면 null 반환
    if (!dateValue) return null;

    // 이미 Date 객체라면 그대로 반환
    if (dateValue instanceof Date) return dateValue;

    // 문자열이라면 Date 객체로 변환
    try {
      return new Date(dateValue);
    } catch (error) {
      console.error('Invalid date value:', dateValue);
      return null;
    }
  };

  return (
    <div className="mb-6">
      <p className={`mb-4 font-semibold ${titleColor}`}>{title}</p>
      <DatePicker
        selected={getSelectedDate()}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        locale={ko}
        placeholderText="날짜를 선택해주세요"
      />
    </div>
  );
}
