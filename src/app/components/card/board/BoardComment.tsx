"use client";

import Comment from "./Comment";

export interface BoardCommentProps {
  id: string;
  postTitle: string;
  comment: string;
  updatedAt: Date;
  isAuthor?: boolean;
}

const BoardComment = ({ id, postTitle, comment, updatedAt, isAuthor = false }: BoardCommentProps) => {
  return (
    <div
      className={`flex w-[327px] flex-col rounded-[16px] border border-line-100 bg-grayscale-50 p-3 lg:w-[477px] lg:p-4`}
      style={{ minHeight: "202px" }}
    >
      {/* Comment Section */}
      <div className="mb-4">
        <Comment id={id} nickname="" updatedAt={updatedAt} content={comment} isAuthor={isAuthor} />
      </div>

      {/* Divider Line */}
      <div className="my-[9px] flex items-center justify-center lg:my-[16px]">
        <div className="w-[279px] bg-line-100 lg:w-[427px]" style={{ height: "1px" }}></div>
      </div>

      {/* Post Section */}
      <div className="line-clamp-2 font-nexon text-[12px] font-medium text-black-100 lg:text-[16px]">{postTitle}</div>
    </div>
  );
};

export default BoardComment;
