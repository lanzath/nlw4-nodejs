import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../Repositories/UsersRepository';

class UserController
{
  /**
   * Create a new record in database.
   *
   * @param request
   * @param response
   */
  async create(request: Request, response: Response)
  {
    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({email});
    if (userAlreadyExists) {
      return response.status(409).json({error: 'user already exists.'})
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };

