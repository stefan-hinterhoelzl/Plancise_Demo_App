import { NextFunction, Request, Response } from "express";

export async function testCall(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
        message: "Handling Requests in the controller"
    });
}
