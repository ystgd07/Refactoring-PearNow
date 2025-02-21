import React, { useState } from 'react';
import { useCreatePjtOne } from '../store/store';
import { debounce } from 'lodash';

export default function InputSearch({ content, title }) {
  const [inputValue, setInputValue] = useState('');
  const { setPeerName, setIsSearchResultOpen } = useCreatePjtOne(
    (state) => state,
  );

  // 디바운스된 검색 함수
  const debouncedSearch = debounce((value) => {
    if (value.length >= 2) {
      setPeerName(value);
      setIsSearchResultOpen();
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // 로컬 상태 업데이트
    debouncedSearch(value); // 디바운스된 검색 실행

    // 입력값이 없거나 2글자 미만이면 검색 결과 숨기기
    if (!value || value.length < 2) {
      setPeerName('');
      setIsSearchResultOpen();
    }
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </label>
      <input
        type="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={content}
        value={inputValue} // 제어 컴포넌트로 변경
        onChange={handleInputChange}
      />
    </div>
  );
}
