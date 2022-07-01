import { CommentSwagger } from './comments.swagger';
import { QuoteSwagger } from './quote.swagger';
import { ReplySwagger } from './reply.swagger';

export const created = {
  status: 201,
  description: 'Comment created',
  type: CommentSwagger,
};

export const movieNotFound = {
  status: 403,
  description: 'Movie not found',
};

export const allComments = {
  status: 200,
  description: 'All the comments',
  type: CommentSwagger,
  isArray: true,
};

export const databaseError = {
  status: 404,
  description: 'Database error',
};

export const comment = {
  status: 200,
  description: 'The selected comment',
  type: CommentSwagger,
};

export const changeSuccess = {
  status: 200,
  description: 'Comment changed successfully',
};

export const userNotFound = {
  status: 403,
  description: 'User not found',
};

export const commentNotFound = {
  status: 403,
  description: 'Comment not found',
};

export const reply = {
  status: 200,
  description: 'The comment created with the reply',
  type: ReplySwagger,
};

export const quote = {
  status: 200,
  description: 'The comment create with the quote',
  type: QuoteSwagger,
};

export const deleted = {
  status: 200,
  description: 'Comment deleted',
};

export const delError = {
  status: 403,
  description:
    'Comment not found, or a user it is not the author or it is not a moderator',
};
