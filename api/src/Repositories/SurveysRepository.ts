import { EntityRepository, Repository } from 'typeorm';
import { Survey } from '../Models/Survey';

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository }
