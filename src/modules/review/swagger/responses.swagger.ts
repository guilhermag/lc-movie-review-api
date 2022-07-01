import { ReviewSwagger } from './review.swagger';

export const created = {
  status: 201,
  description: 'Review created',
  type: ReviewSwagger,
};

export const movieNotFound = {
  status: 403,
  description: 'Movie not found',
};

export const allReviews = {
  status: 200,
  description: 'All the reviews',
  type: ReviewSwagger,
  isArray: true,
};

export const databaseError = {
  status: 404,
  description: 'Database error',
};

export const review = {
  status: 200,
  description: 'The selected review',
  type: ReviewSwagger,
};

export const userNotFound = {
  status: 403,
  description: 'User not found',
};

export const reviewNotFound = {
  status: 403,
  description: 'Review not found',
};

export const deleted = {
  status: 200,
  description: 'Review deleted',
};

export const delError = {
  status: 403,
  description:
    'Review not found, or a user it is not the author or it is not a moderator',
};
