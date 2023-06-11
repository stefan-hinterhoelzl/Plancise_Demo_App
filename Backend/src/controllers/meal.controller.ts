import { NextFunction, Request, Response } from "express";
import { connect, getConnection } from "../database";
import {
  IngredientQuant,
  IngredientToMeal,
  Meal,
  MealIngredient,
} from "../models/models";
import { handleError } from "./controller.util";
import { v4 as uuidv4 } from "uuid";

export async function getAllMeals(
  req: Request,
  res: Response,
  next: NextFunction
) {

  let searchword: string  = ""

  if (req.query.q) searchword = String(req.query.q)

  searchword = '%'+searchword+'%'

  try {
    const conn = await connect();
    const result: Meal[] = (await conn.query<Meal[]>(`SELECT * FROM Meal Where name like ?`, [searchword]))[0];

    res.json(result);
  } catch (err: any) {
    handleError(res, err);
  }
}

export async function getMealById(req: Request, res: Response) {
  var id: string = req.params.id;

  try {
    const conn = await connect();
    const result: Meal = (
      await conn.query<Meal[]>("SELECT * FROM Meal Where id = ?", [
        id,
      ])
    )[0][0];
    if (result === undefined)
      res.status(404).json({ message: `No Meal with ID ${id}` });
    else res.json(result);
  } catch (err: any) {
    handleError(res, err);
  }
}

//transaction for the meal adding
export async function createMeal(req: Request, res: Response) {
  const newMealIngredient: MealIngredient = req.body;
  let connection;
  try {
    connection = await getConnection();

    const meal = newMealIngredient.meal;
    meal.id = uuidv4();

    //insert the meal
    await connection.query("INSERT INTO Meal SET ?", [meal]);

    const ingredients = newMealIngredient.ingridients;

    for (let i = 0; i < ingredients.length; i++) {
      let ingQ: IngredientQuant = ingredients[i];
      let ingredientToMail: IngredientToMeal = <IngredientToMeal>{
        meal: meal.id,
        ingredient: ingQ.ingredient.id,
        quantity: ingQ.quantitiy,
        unit: ingQ.unit,
      };
      await connection.query("INSERT INTO MealContainsIngredient SET ?", [
        ingredientToMail,
      ]);
    }

    //commit transaction
    connection.commit();

    res.status(200).json({id:meal.id});
  } catch (err: any) {
    console.log(connection);
    if (connection) await connection.rollback();
    await handleError(res, err);
  } finally {
    if (connection) connection.release();
  }
}
