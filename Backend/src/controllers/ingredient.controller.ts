import { NextFunction, Request, Response } from "express";
import { connect } from "../database";
import { Ingredient } from "../models/models";
import { handleError } from "./controller.util";

export async function getAllIngredients(req: Request, res: Response) {
  try {
    const conn = await connect();
    const result: Ingredient[] = (
      await conn.query<Ingredient[]>("SELECT * FROM Ingredient ORDER BY id asc")
    )[0];

    res.json(result);
  } catch (err: any) {
    handleError(res, err);
  }
}

export async function createIngredient(req: Request, res: Response) {
  try {
    const newIngredient: Ingredient = req.body;

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
  var id: string = req.params.projectId;

  try {
    const conn = await connect();
    await conn.query("DELETE FROM Ingredient WHERE id = ?", [id]);
    res.json({result: "success"});
  } catch (err: any) {
    handleError(res, err);
  }
}
