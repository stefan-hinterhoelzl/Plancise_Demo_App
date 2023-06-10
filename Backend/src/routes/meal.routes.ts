
import { Router } from 'express'
import { createMeal, getAllMeals, getMealById } from '../controllers/meal.controller'
export const mealRouter = Router();


mealRouter.get('/', getAllMeals)
mealRouter.post('/', createMeal)
mealRouter.get('/:id', getMealById)
