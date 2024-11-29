"use client";

import { useState } from "react";
import PaginationBtn from "./paginationComponent/PaginationBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useWidth from "@/hooks/useWidth";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const { isMobile } = useWidth();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const activeStyle = "text-black-400 font-semibold";
  const defaultStyle = "text-gray-200 font-medium lg:font-normal";

  const maxPageShow = isMobile ? 5 : 7;
  const paginationNum = totalPage > maxPageShow ? maxPageShow - 2 : totalPage; // 페이지네이션 개수 유지
  const pageList = Array(paginationNum)
    .fill(null)
    .map((_, index) => index + 1);
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };
  return (
    <div className="flex gap-1">
      <PaginationBtn extraStyle="mr-[6px]">
        <IoIosArrowBack />
      </PaginationBtn>
      <ul className="flex gap-1">
        {pageList.map((page) => (
          <li key={page} onClick={() => handleChangePage(page)}>
            <PaginationBtn>{page}</PaginationBtn>
          </li>
        ))}
      </ul>
      {totalPage > maxPageShow ? (
        <>
          <li className="cursor-none">
            <PaginationBtn> ... </PaginationBtn>
          </li>
          <li key={totalPage} onClick={() => handleChangePage(totalPage)}>
            <PaginationBtn> {totalPage} </PaginationBtn>
          </li>
        </>
      ) : (
        <></>
      )}
      <li>
        <PaginationBtn extraStyle="ml-[6px]">
          <IoIosArrowForward />
        </PaginationBtn>
      </li>
    </div>
  );
};

export default Pagination;
