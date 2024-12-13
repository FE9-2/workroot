export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  writer: {
    id: number;
    nickname: string;
    imageUrl?: string;
  };
}
