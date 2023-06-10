import { RowDataPacket } from "mysql2";

export interface Ingredient extends RowDataPacket {
  id: string;
  name: string;
}

export interface Meal extends RowDataPacket {
  id: string;
  name: string;
  instructions: string;
}

export interface IngredientToMeal extends RowDataPacket {
  meal: string;
  ingredient: string;
  quantity: number;
  unit: string;
}

export interface IngredientQuant {
  ingredient: Ingredient;
  quantitiy: number;
  unit: string;
}

export interface IngredientQuantRaw extends RowDataPacket {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
}

export interface MealIngredient {
  meal: Meal;
  ingridients: IngredientQuant[];
}
