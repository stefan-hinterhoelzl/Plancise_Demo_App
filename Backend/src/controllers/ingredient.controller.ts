import { NextFunction, Request, Response } from "express";
import { connect } from "../database";
import { Ingredient } from "../models/models";
import { handleError } from "./controller.util";

export async function getAllIngredients(req: Request, res: Response, next: NextFunction) {
    
    try {
        const conn = await connect()
        const result: Ingredient[] = (await conn.query<Ingredient[]>('SELECT * FROM Ingredient'))[0]

        res.json(result)
    } catch (err: any) {
        handleError(res, err);
    }
}

export async function createIngredient(req: Request, res: Response) {
    try {
      const newMeal: Ingredient  = req.body;
  
      const conn = await connect();
      conn.query('INSERT INTO Ingredient SET ?', [newMeal]);
      res.json(newMeal);
    } catch (err: any) {
      handleError(res, err);
    }
  }
