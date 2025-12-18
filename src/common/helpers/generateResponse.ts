import { Response } from "express";
import { ApiResponse } from "../interfaces/ApiResponse";

export function generateResponse(data: any, message: string, res: Response, statusCode: number = 200): void {
  const response: ApiResponse = {
    data,
    message,
    statusCode,
  };

  res.status(statusCode).json(response);
}