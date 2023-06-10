
import { Router } from 'express'
import { changeIngredient, createIngredient, deleteIngredient, getAllIngredients, getIngredientsByMeal } from '../controllers/ingredient.controller';
export const ingredientRouter = Router();


ingredientRouter.get('/', getAllIngredients)
ingredientRouter.get('/:id', getIngredientsByMeal)
ingredientRouter.post('/', createIngredient)
ingredientRouter.put('/', changeIngredient)
ingredientRouter.delete('/:id', deleteIngredient)
