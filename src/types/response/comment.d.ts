// 댓글 작성자 타입
export interface WriterType {
  id: number;
  nickname: string;
  imageUrl: string;
}

// 댓글 작성/수정 타입
export interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  writer: WriterType;
}

// 댓글 목록 응답
export interface CommentListResponse {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: Array<CommentType>;
}
