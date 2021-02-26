import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../Repositories/SurveysUsersRepository';

class AnswerController {
  // http://localhost:333/answers/1?user=2bb92239-bf36-4d68-bbd3-0116f55cfece
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { user } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(user)
    });

    if(!surveyUser) {
      throw new AppError('Survey user does not exists.');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export { AnswerController }
