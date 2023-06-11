import { Request, Response } from "express";
import { connect } from "../database";
import { Ingredient, IngredientQuantRaw } from "../models/models";
import { handleError } from "./controller.util";
import { v4 as uuidv4 } from "uuid";

export async function getIngredientsByMeal(req: Request, res: Response) {
  var id: string = req.params.id;
  try {
    const conn = await connect();
    const result: IngredientQuantRaw[] = (
      await conn.query<IngredientQuantRaw[]>(
        "SELECT i.id as 'ingredientId', i.name as 'ingredientName', mi.quantity, mi.unit FROM Ingredient i JOIN MealContainsIngredient mi ON i.id = mi.ingredient WHERE meal = ? ORDER BY id asc",
        [id]
      )
    )[0];
    res.json(result);
  } catch (err: any) {
    handleError(res, err);
  }
}

export async function getAllIngredients(req: Request, res: Response) {
  try {
    const conn = await connect();
    const result: Ingredient[] = (
      await conn.query<Ingredient[]>(
        "SELECT * FROM Ingredient i ORDER BY id asc"
      )
    )[0];

    res.json(result);
  } catch (err: any) {
    handleError(res, err);
  }
}

export async function createIngredient(req: Request, res: Response) {
  try {
    const newIngredient: Ingredient = req.body;

    newIngredient.id = uuidv4();

    const conn = await connect();
    await conn.query("INSERT INTO Ingredient SET ?", [newIngredient]);
    res.json(newIngredient);
  } catch (err: any) {
    handleError(res, err);
  }
}

export async function changeIngredient(req: Request, res: Response) {
  try {
    const changeIngredient: Ingredient = req.body;

    const conn = await connect();
    await conn.query("UPDATE Ingredient SET ? WHERE id = ?", [
      changeIngredient,
      changeIngredient.id,
    ]);
    res.json(changeIngredient);
  } catch (err: any) {
    handleError(res, err);
  }
}

export async function deleteIngredient(req: Request, res: Response) {
  var id: string = req.params.id;

  try {
    const conn = await connect();
    await conn.query("DELETE FROM Ingredient WHERE id = ?", [id]);
    res.json({ result: "success" });
  } catch (err: any) {
    handleError(res, err);
  }
}
