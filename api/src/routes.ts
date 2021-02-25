import { Router } from 'express';
import { SurveyController } from './Controllers/SurveyController';
import { UserController } from './Controllers/UserController';
import { SendMailController } from './Controllers/SendMailController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

// Users endpoints
router.post('/users', userController.create);

// Surveys endpoints
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.index);

// Send mail endpoints
router.post('/send-email', sendMailController.execute);

export { router }
