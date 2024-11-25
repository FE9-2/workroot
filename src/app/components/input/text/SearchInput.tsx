import { FiSearch } from "react-icons/fi";
import WhiteTextInput from "./WhiteTextInput";

const SearchInput = () => {
  return (
    <div>
      <WhiteTextInput
        name="search"
        type="text"
        placeholder="어떤 알바를 찾고 계세요?"
        wrapperClassName="!rounded-2xl !lg:rounded-3xl"
        beforeIcon={<FiSearch className="size-4 text-gray-200 lg:size-6" />}
      />
    </div>
  );
};

export default SearchInput;
