import { CreateMovieDto } from '../dto';
import { CommentSwagger } from './comments.swagger';
import { ReviewSwagger } from './review.swagger';

export const found = {
  status: 200,
  description: 'Movie found',
  type: CreateMovieDto,
};

export const notFound = {
  status: 403,
  description: 'Movie not found',
};

export const allMovies = {
  status: 200,
  description: 'Get all movies',
  type: CreateMovieDto,
  isArray: true,
};

export const dbError = {
  status: 404,
  description: 'database error',
};

export const allComments = {
  status: 200,
  description: 'All the comments',
  type: CommentSwagger,
  isArray: true,
};

export const allReviews = {
  status: 200,
  description: 'All the reviews',
  type: ReviewSwagger,
  isArray: true,
};
