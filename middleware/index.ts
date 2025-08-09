import { HttpError } from "../classes";
import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;


export const errorHandling = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "";
    let status = 500;
    if (err instanceof HttpError) {
        errorMessage = err.message;
        status = err.status;
    } else if (err instanceof Error) {
        errorMessage = err.message;
    } else {
        errorMessage = "Une erreur inconnue : ";
    }
     res.status(status).json({ result: false, error: errorMessage });
};


export function withErrorHandling(handler: AsyncRequestHandler): RequestHandler {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}