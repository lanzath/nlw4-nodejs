import { Router } from 'express';
import { SurveyController } from './Controllers/SurveyController';
import { UserController } from './Controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

// Users endpoints
router.post('/users', userController.create);

// Surveys endpoints
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.index);

export { router }
