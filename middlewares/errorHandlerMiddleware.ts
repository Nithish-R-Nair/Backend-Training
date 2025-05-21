import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error instanceof HttpException) {
            // Handling known errors (Custom errors with status codes)
            const status: number = error.status || 500;
            const message: string = error.message || "Soomething went wrong";
            let responseBody = { message }; 
            res.status(status).json(responseBody);
        } else {
            // Handling unknown errors
            console.error(error.stack);
            res.status(500).json({ error: error.message });
        }
    } catch(err) {
        // Handing the errors that cannot be handled to default error handler
        next(err);
    }
}

