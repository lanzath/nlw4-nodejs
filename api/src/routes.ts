import { Router } from 'express';

import { SurveyController } from './Controllers/SurveyController';
import { UserController } from './Controllers/UserController';
import { SendMailController } from './Controllers/SendMailController';
import { AnswerController } from './Controllers/AnswerController';
import { NpsController } from './Controllers/NpsController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

// Users endpoint
router.post('/users', userController.create);

// Surveys endpoints
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.index);

// Send mail endpoint
router.post('/send-email', sendMailController.execute);

// Survey user endpoint
router.get('/answers/:value', answerController.execute);

// NPS info endpoint
router.get('/nps/:survey_id', npsController.execute);

export { router }
