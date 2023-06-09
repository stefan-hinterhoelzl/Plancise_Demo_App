import { NextFunction, Request, Response } from "express";
import { connect } from "../database";
import { Meal } from "../models/models";
import { handleError } from "./controller.util";

export async function getAllMeals(req: Request, res: Response, next: NextFunction) {
    
    try {
        const conn = await connect()
        const result: Meal[] = (await conn.query<Meal[]>('SELECT * FROM Meal'))[0]

        res.json(result)
    } catch (err: any) {
        handleError(res, err);
    }
}

export async function createMeal(req: Request, res: Response) {
    try {
      const newMeal: Meal = req.body;
  
      const conn = await connect();
      conn.query('INSERT INTO Meal SET ?', [newMeal]);
      res.json(newMeal);
    } catch (err: any) {
      handleError(res, err);
    }
  }


