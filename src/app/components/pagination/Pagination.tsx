"use client";

import PaginationBtn from "./paginationComponent/PaginationBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const activeStyle = "text-black-400 font-semibold";
  const defaultStyle = "text-gray-200 font-medium lg:font-normal";

  let isMobile;
  const maxPage = isMobile ? 3 : 5;
  const paginationNum = totalPage > maxPage ? maxPage : totalPage;
  const pageList = Array(paginationNum)
    .fill(null)
    .map((_, index) => index + 1);

  return (
    <div className="flex gap-1">
      <div className="mr-[6px]">
        <PaginationBtn>
          <IoIosArrowBack />
        </PaginationBtn>
      </div>
      <div className="flex gap-1">
        {pageList.map((page) => (
          <PaginationBtn key={page}>{page}</PaginationBtn>
        ))}
      </div>
      {/* ... 마지막 페이지 추가 */}
      {totalPage > maxPage ? (
        <>
          <PaginationBtn> ... </PaginationBtn>
          <PaginationBtn> {totalPage} </PaginationBtn>
        </>
      ) : (
        <></>
      )}
      <div className="ml-[6px]">
        <PaginationBtn>
          <IoIosArrowForward />
        </PaginationBtn>
      </div>
    </div>
  );
};

export default Pagination;
