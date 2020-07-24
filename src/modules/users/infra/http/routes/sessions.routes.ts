/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserService from '@modules/users//services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  },
);

// sessionsRouter.put('/', (request, response) => {
// Editar umpedido
// });

// sessionsRouter.delete('/', (request, response) => {
// Remover um pedido
// });

export default sessionsRouter;
