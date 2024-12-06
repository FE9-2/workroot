import { FiSearch } from "react-icons/fi";
import BaseInput from "./BaseInput";

const SearchInput = () => {
  return (
    <div>
      <BaseInput
        name="search"
        type="text"
        variant="white"
        placeholder="어떤 알바를 찾고 계세요?"
        wrapperClassName="!rounded-2xl !lg:rounded-3xl"
        beforeIcon={<FiSearch className="text-grayscale-200 size-6 lg:size-9" />}
      />
    </div>
  );
};

export default SearchInput;
