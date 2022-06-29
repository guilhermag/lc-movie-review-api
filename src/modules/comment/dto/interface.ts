export interface IComment {
  id: number;
  createdAt: string | Date;
  authorId: number;
  description: string;
  likes: number;
  dislikes: number;
  replies: string[];
  repeated: boolean;
  movieId: number;
}
