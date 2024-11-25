// 게시글 작성자 타입
export interface WriterType {
  id: number;
  nickname: string;
  imageUrl: string;
}

// 게시글 등록/상세/수정/좋아요 응답
export interface PostDetailResponse {
  writer: WriterType;
  updatedAt: Date;
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  imageUrl: string;
  content: string;
  title: string;
  id: number;
  isLiked: boolean;
}

// 게시글 목록 타입
export interface PostListType {
  writer: WriterType;
  updatedAt: Date;
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  imageUrl: string;
  content: string;
  title: string;
  id: number;
}

// 게시글 목록 응답
export interface PostListResponse {
  data: Array<PostListType>;
  nextCursor: number | null;
}
