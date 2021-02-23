import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../Models/User';

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

    const usersRepository = getRepository(User);

    const userAlreadyExists = await usersRepository.findOne({email});
    if (userAlreadyExists) {
      return response.status(409).json({error: 'user already exists.'})
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController }
