
import { Router } from 'express'
import { createMeal, getAllMeals } from '../controllers/meal.controller'
export const mealRouter = Router();


mealRouter.get('/', getAllMeals)
mealRouter.post('/', createMeal)
