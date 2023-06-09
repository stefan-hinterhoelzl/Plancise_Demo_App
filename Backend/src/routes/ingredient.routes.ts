
import { Router } from 'express'
import { createIngredient, getAllIngredients } from '../controllers/ingredient.controller';
export const ingredientRouter = Router();


ingredientRouter.get('/', getAllIngredients)
ingredientRouter.post('/', createIngredient)
