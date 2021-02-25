import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../Repositories/SurveysRepository';

class SurveyController {
  /**
   * Create a new record in database.
   *
   * @param request
   * @param response
   */
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({ title, description });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  /**
   * List all records in database.
   *
   * @param request
   * @param response
   */
  async index(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepository.find();

    return response.status(200).json(surveys);
  }
}

export { SurveyController }
