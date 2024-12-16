import { FormListType } from "./form";
import { PostListType } from "./post";

// 유저 응답
export interface UserResponse {
  location: string;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
  role: string;
  imageUrl: string;
  nickname: string;
  name: string;
  email: string;
  id: number;
}

// 내가 생성한 또는 스크랩한 워크폼 목록 응답
export interface MyFormListResponse {
  data: Array<FormListType>;
  nextCursor: number | null;
}

// 내가 지원한 워크폼 타입
export interface MyApplicationType {
  updatedAt: Date;
  createdAt: Date;
  status: string;
  resumeName: string;
  resumeId: number;
  form: {
    owner: {
      imageUrl: string;
      storeName: string;
      id: number;
    };
    recruitmentEndDate: Date;
    recruitmentStartDate: Date;
    description: string;
    title: string;
    id: number;
  };
  id: number;
}

// 내가 지원한 워크폼 목록 응답
export interface MyApplicationListResponse {
  data: Array<MyApplicationType>;
  nextCursor: number | null;
}

// 내가 작성한 게시글 목록 응답
export interface MyPostListResponse {
  data: Array<PostListType>;
  nextCursor: number | null;
}

// 내가 작성한 댓글 타입
export interface MyCommentType {
  post: {
    content: string;
    title: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}

// 내가 작성한 댓글 목록 응답
export interface MyCommentListResponse {
  data: Array<MyCommentType>;
  totalCount: number;
  currentPage: number;
  totalItemCount: number;
}
