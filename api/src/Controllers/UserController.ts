import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import { AppError } from './../errors/AppError';
import { UsersRepository } from '../Repositories/UsersRepository';

class UserController {
  /**
   * Create a new record in database.
   *
   * @param request
   * @param response
   */
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    // request validation
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    });

    try {
      await schema.validate(request.body);
    } catch (error) {
      throw new AppError(error);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({email});
    if (userAlreadyExists) {
      throw new AppError('User already exists', 409);
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };

