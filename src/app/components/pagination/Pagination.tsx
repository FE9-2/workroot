"use client";

import { useEffect, useState } from "react";
import PaginationBtn from "./paginationComponent/PaginationBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useWidth from "@/hooks/useWidth";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const { isMobile, width } = useWidth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [disbled, setDisabled] = useState({
    prev: false,
    next: false,
  });

  const maxPageShow = isMobile ? 3 : 5;

  const paginationNum = totalPage > maxPageShow ? maxPageShow : totalPage; // 페이지네이션 개수 유지

  const initialPageList = Array(paginationNum)
    .fill(null)
    .map((_, index) => index + 1);

  const [pageList, setPageList] = useState<number[]>(initialPageList);

  const firstPage = pageList?.[0];
  const lastPage = pageList[pageList.length - 1];

  const handleClickPrevBtn = () => {
    if (firstPage === 1) {
      return;
    } else if (firstPage - maxPageShow <= 0) {
      const newPageList = Array(paginationNum)
        .fill(null)
        .map((_, index) => index + 1);
      setPageList(newPageList);
    } else {
      setPageList((prev) => prev.map((page) => page - maxPageShow));
    }
  };

  const handleClickNetxBtn = () => {
    if (totalPage <= maxPageShow || lastPage === totalPage) {
      return;
    } else if (lastPage === totalPage - 1 || lastPage + maxPageShow > totalPage) {
      const newPageList = Array(paginationNum)
        .fill(null)
        .map((_, index) => totalPage - maxPageShow + 1 + index);
      setPageList(newPageList);
    } else {
      setPageList((prev) => prev.map((page) => page + maxPageShow));
      setDisabled((prev) => ({
        ...prev,
        next: true,
      }));
    }
    console.log(pageList);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // extraStyle로 전달
  const activeStyle = "text-black-400 font-semibold";
  const defaultStyle = "text-gray-200 font-medium lg:font-normal";

  useEffect(() => {
    const newPageList = Array(paginationNum)
      .fill(null)
      .map((_, index) => firstPage + index);
    setPageList(newPageList);
  }, [isMobile, totalPage, maxPageShow, paginationNum]);

  // disabled/active 스타일
  return (
    <div className="flex gap-1">
      <li onClick={handleClickPrevBtn}>
        <PaginationBtn extraStyle="mr-[6px]">
          <IoIosArrowBack />
        </PaginationBtn>
      </li>
      <ul className="flex gap-1">
        {pageList.map((page) => (
          <li key={page} onClick={() => handleChangePage(page)}>
            <PaginationBtn>{page}</PaginationBtn>
          </li>
        ))}
      </ul>
      {totalPage > maxPageShow + 2 && lastPage < totalPage - 1 ? (
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
      <li onClick={handleClickNetxBtn}>
        <PaginationBtn extraStyle="ml-[6px]">
          <IoIosArrowForward />
        </PaginationBtn>
      </li>
    </div>
  );
};

export default Pagination;
