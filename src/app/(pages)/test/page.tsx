"use client";
import React from "react";
import CardBoard from "@/app/components/card/board/cardBoard";
import BoardComment from "@/app/components/card/board/boardComment";
import Comment from "@/app/components/card/board/comment";

const TestPage: React.FC = () => {
  const handleKebabClick = (type: string) => {
    alert(`${type} Kebab menu clicked!`);
  };

  return (
    <div className="flex min-h-screen flex-col items-start gap-6 bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-black-400">Test Page</h1>

      {/* CardBoard 테스트 */}
      <section className="w-full">
        <h2 className="mb-4 text-xl font-semibold text-black-400">CardBoard</h2>
        <CardBoard
          title="게시판 제목 "
          content="게시판 내용을 여기에 표시합니다.게시판 내용을 여기에 표시합니다게시판 내용을 여기에 표시합니다게시판 내용을 여기에 표시합니다게시판 내용을 여기에 표시합니다 ."
          userName="John Doe"
          date="2024. 12. 01"
          comments={5}
          likes={10}
          variant="default"
          onKebabClick={() => handleKebabClick("CardBoard Default")}
        />
        <CardBoard
          title="게시판 "
          content="게시판 내용을 여기에 표시합니다게시판 내용을 여기에 표시합니다게시판 내용을 여기에 표시합니다게시판 내용을 여기에 표시합니다."
          userName="Jane Smith"
          date="2024. 12. 02"
          comments={8}
          likes={20}
          variant="primary"
          onKebabClick={() => handleKebabClick("CardBoard Primary")}
        />
      </section>

      {/* BoardComment 테스트 */}
      <section className="w-full">
        <h2 className="mb-4 text-xl font-semibold text-black-400">BoardComment</h2>
        <BoardComment
          title="제목 "
          content="내용을 여기에 표시합니다. 내용을 여기에 표시합니다.내용을 여기에 표시합니다.내용을 여기에 표시합니다.내용을 여기에 표시합니다.."
          comments="댓글입니다.댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다"
          date="2024. 12. 01"
          variant="default"
          onKebabClick={() => handleKebabClick("BoardComment Default")}
        />
        <BoardComment
          title=" 제목"
          content="내용을 여기에 표시합니다. 내용을 여기에 표시합니다.내용을 여기에 표시합니다.내용을 여기에 표시합니다.내용을 여기에 표시합니다.."
          comments="이것은 댓글입니다.것은 댓글입니것은 댓글입니것은 댓글입니것은 댓글입니"
          date="2024. 12. 05"
          variant="primary"
          onKebabClick={() => handleKebabClick("BoardComment Primary")}
        />
      </section>

      {/* Comment 테스트 */}
      <section className="w-full">
        <h2 className="mb-4 text-xl font-semibold text-black-400">Comment</h2>
        <Comment
          userName="Alice Johnson"
          date="2024. 12. 10"
          comment=" 댓글입니다. 은 작은 화면에서 표시되는 댓글입니다은 작은 화면에서 표시되는 댓글입니다은 작은 화면에서 표시되는 댓글입니다."
        />
        <Comment
          userName="Bob Smith"
          date="2024. 12. 11"
          comment="댓글입니다.시되는 댓글입니다은 작은 화면에서 표시되는 댓시되는 댓글입니다은 작은 화면에서 표시되는 댓시되는 댓글입니다은 작은 화면에서 표시되는 댓시되는 댓글입니다은 작은 화면에서 표시되는 댓 다."
        />
        <Comment
          userName="Charlie Brown"
          date="2024. 12. 12"
          comment="이 댓글입다은 작은 화면에서 표시되는 댓시되는 댓글입니다은 작은다은 작은 화면에서 표시되는 댓시되는 댓글입니다은 작은니다."
        />
      </section>
    </div>
  );
};

export default TestPage;
