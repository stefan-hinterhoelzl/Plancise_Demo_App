
import { Router } from 'express'
import { changeIngredient, createIngredient, deleteIngredient, getAllIngredients } from '../controllers/ingredient.controller';
export const ingredientRouter = Router();


ingredientRouter.get('/', getAllIngredients)
ingredientRouter.post('/', createIngredient)
ingredientRouter.put('/', changeIngredient)
ingredientRouter.delete('/:id', deleteIngredient)
