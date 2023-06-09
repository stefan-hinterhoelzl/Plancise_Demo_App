import { RowDataPacket } from "mysql2";

export interface Ingredient extends RowDataPacket {
    id: number;
    name: string;
}

export interface Meal extends RowDataPacket{
    id: number;
    name: string;
    instructions: string;
}