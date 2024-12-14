"use client";

import { useState, useEffect } from "react";
import PaginationBtn from "./paginationComponent/PaginationBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useWidth from "@/hooks/useWidth";
import { cn } from "@/lib/tailwindUtil";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPage, currentPage, onPageChange }: PaginationProps): JSX.Element => {
  const { isMobile } = useWidth();

  const maxPageShow = isMobile ? 3 : 5;
  const paginationNum = totalPage > maxPageShow ? maxPageShow : totalPage;
  const initialPageList = Array(paginationNum)
    .fill(null)
    .map((_, index) => index + 1);
  const [pageList, setPageList] = useState<number[]>(initialPageList);

  useEffect(() => {
    const calculatePageList = () => {
      const currentGroup = Math.ceil(currentPage / maxPageShow);
      const start = (currentGroup - 1) * maxPageShow + 1;
      const end = Math.min(start + maxPageShow - 1, totalPage);

      return Array(end - start + 1)
        .fill(null)
        .map((_, index) => start + index);
    };

    setPageList(calculatePageList());
  }, [currentPage, totalPage, maxPageShow]);

  const firstPage = pageList[0];
  const lastPage = pageList[pageList.length - 1];

  const prevDisabled = firstPage === 1;
  const nextDisabled = lastPage === totalPage || totalPage <= maxPageShow;

  const handleClickPrevBtn = () => {
    const newPage = Math.max(firstPage - maxPageShow, 1);
    onPageChange(newPage);
  };

  const handleClickNextBtn = () => {
    const newPage = Math.min(lastPage + 1, totalPage);
    onPageChange(newPage);
  };

  const handleChangePage = (page: number) => {
    onPageChange(page);
  };

  const activeStyle = "text-black-400 font-semibold";
  const defaultStyle = "text-grayscale-200 font-medium lg:font-normal";

  return (
    <nav className="flex gap-1" aria-label="페이지네이션">
      <PaginationBtn
        onClick={handleClickPrevBtn}
        disabled={prevDisabled}
        extraStyle="mr-[6px]"
        aria-label="이전 페이지"
      >
        <IoIosArrowBack className={cn(prevDisabled ? defaultStyle : activeStyle)} />
      </PaginationBtn>

      <ul className="flex gap-1">
        {pageList.map((page) => (
          <li key={page}>
            <PaginationBtn
              onClick={() => handleChangePage(page)}
              extraStyle={page === currentPage ? activeStyle : ""}
              aria-label={`${page}페이지`}
              aria-current={page === currentPage}
            >
              {page}
            </PaginationBtn>
          </li>
        ))}
      </ul>

      {totalPage > maxPageShow + 2 && lastPage < totalPage - 1 && (
        <>
          <li>
            <PaginationBtn>...</PaginationBtn>
          </li>
          <li>
            <PaginationBtn
              onClick={() => handleChangePage(totalPage)}
              extraStyle={totalPage === currentPage ? activeStyle : ""}
              aria-label={`${totalPage}페이지`}
            >
              {totalPage}
            </PaginationBtn>
          </li>
        </>
      )}

      <PaginationBtn
        onClick={handleClickNextBtn}
        disabled={nextDisabled}
        extraStyle="ml-[6px]"
        aria-label="다음 페이지"
      >
        <IoIosArrowForward className={cn(nextDisabled ? defaultStyle : activeStyle)} />
      </PaginationBtn>
    </nav>
  );
};

export default Pagination;
