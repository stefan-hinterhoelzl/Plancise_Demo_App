export interface Ingredient {
  id: string;
  name: string;
}

export interface IngredientQuant{
  ingredient: Ingredient,
  quantitiy: number,
  unit: string
}

export interface IngredientQuantRaw {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
}

export interface Meal {
  id: string;
  name: string;
  instructions: string;
}

export interface MealIngredient {
  meal: Meal,
  ingridients: IngredientQuant[],
}
