import { IndexUserSwagger } from './index-user.swagger';
import { LoginUserSwagger } from './login-user.swagger';

export const created = {
  status: 201,
  description: 'New user created with success',
  type: IndexUserSwagger,
  isArray: false,
};

export const invalidCredentials = {
  status: 400,
  description: 'Error when trying to pass a invalid email or password.',
};

export const login = {
  status: 200,
  description:
    'The user credentials are authenticated and validated, returning the access token.',
  type: LoginUserSwagger,
};

export const wrongCredentials = {
  status: 401,
  description: 'The user credentials are invalids',
};

export const loginLimit = {
  status: 403,
  description:
    'Number of login attempts was exceeded, the app was blocked, wait for 2 MINUTES',
};

export const newMod = {
  status: 200,
  description: 'The user chosen is a moderator now',
};

export const notMod = {
  status: 403,
  description: 'Only moderators can turn other users into moderators',
};
