"use client";

import { useState } from "react";
import PaginationBtn from "./paginationComponent/PaginationBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useWidth from "@/hooks/useWidth";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const { isMobile } = useWidth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [disbled, setDisabled] = useState({
    prev: false,
    next: false,
  });

  const maxPageShow = isMobile ? 5 : 7;

  const paginationNum = totalPage > maxPageShow ? maxPageShow - 2 : totalPage; // 페이지네이션 개수 유지

  const initialPageList = Array(paginationNum)
    .fill(null)
    .map((_, index) => index + 1);

  const [pageList, setPageList] = useState<number[]>(initialPageList);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const firstPage = pageList?.[0];
  const lastPage = pageList[pageList.length - 1];

  const handleClickPrevBtn = () => {
    if (firstPage === 1) {
      setDisabled((prev) => ({ ...prev, prev: false }));
    } else if (firstPage - maxPageShow + 2 <= 0) {
      const newPageList = Array(paginationNum)
        .fill(null)
        .map((_, index) => index + 1);
      setPageList(newPageList);
    } else {
      setPageList((prev) => prev.map((page) => page - maxPageShow + 2));
    }
    console.log(pageList);
  };

  const handleClickNetxBtn = () => {
    if (lastPage + maxPageShow - 2 <= totalPage) {
      setPageList((prev) => prev.map((page) => page + maxPageShow - 2));
    } else {
      setPageList((prev) => prev.map((page) => page + totalPage - lastPage - 1));
      setDisabled((prev) => ({
        ...prev,
        next: true,
      }));
    }
    console.log(pageList);
  };

  const activeStyle = "text-black-400 font-semibold";
  const defaultStyle = "text-gray-200 font-medium lg:font-normal";

  return (
    <div className="flex gap-1">
      <li onClick={handleClickPrevBtn}>
        <PaginationBtn extraStyle="mr-[6px]">
          <IoIosArrowBack />
        </PaginationBtn>
      </li>
      <ul className="flex gap-1">
        {initialPageList.map((page) => (
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
      <li onClick={handleClickNetxBtn}>
        <PaginationBtn extraStyle="ml-[6px]">
          <IoIosArrowForward />
        </PaginationBtn>
      </li>
    </div>
  );
};

export default Pagination;
