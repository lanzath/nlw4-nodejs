import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { AppError } from './../errors/AppError';
import { UsersRepository } from '../Repositories/UsersRepository';
import { SurveysRepository } from '../Repositories/SurveysRepository';
import { SurveysUsersRepository } from '../Repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  /**
   * Execute the mail send feature.
   *
   * @param request
   * @param response
   */
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({email});

    if(!user) {
      throw new AppError('User does not exists');
    }

    // SELECT * FROM surveys WHERE id=survey_id
    const survey = await surveysRepository.findOne({id: survey_id});

    if(!survey) {
      throw new AppError('Survey does not exists');
    }

    // get email template file path
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey']
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    }

    if(surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.status(200).json(surveyUserAlreadyExists);
    }

    // Save data in SurveyUser table
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    });
    await surveysUsersRepository.save(surveyUser);

    // send email to user
    variables.id = surveyUserAlreadyExists.id;
    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.status(200).json(surveyUser);
  }
}

export { SendMailController }
