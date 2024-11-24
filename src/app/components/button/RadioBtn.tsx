import React, { ButtonHTMLAttributes } from "react";

interface RadioBtnProps extends ButtonHTMLAttributes<HTMLInputElement> {
  label: string; // 라디오 버튼의 레이블을 추가
  name: string; // 라디오 버튼의 name 속성
  value: string; // 라디오 버튼의 value 속성
  checked?: boolean; // 라디오 버튼이 선택된 상태인지 여부
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 라디오 버튼 상태 변화 처리 함수
}

const RadioBtn = (props: RadioBtnProps) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={props.value}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        className="radio-custom mr-2"
      />
      <label htmlFor={props.value} className="text-sm">
        {props.label}
      </label>
    </div>
  );
};

export default RadioBtn;
