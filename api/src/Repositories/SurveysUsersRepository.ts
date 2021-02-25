import { EntityRepository, Repository } from 'typeorm';
import { SurveyUser } from '../Models/SurveyUser';

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {}

export { SurveysUsersRepository }
