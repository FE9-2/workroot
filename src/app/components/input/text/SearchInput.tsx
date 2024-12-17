import { FiSearch } from "react-icons/fi";
import { ChangeEventHandler } from "react";

interface SearchInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ value, onChange, placeholder, className }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      {/* 검색 아이콘 */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <FiSearch className="size-5 text-grayscale-400" />
      </div>

      {/* 검색 입력창 */}
      <input
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "어떤 알바를 찾고 계세요?"}
        className={`rounded-lg border border-grayscale-200 pl-11 pr-4 text-sm placeholder:text-grayscale-400 focus:border-grayscale-300 focus:outline-none ${
          className || ""
        }`}
      />
    </div>
  );
};

export default SearchInput;
