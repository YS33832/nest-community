import {NextFunction, Request, Response} from "express";


export function userDataFromJwt(req: Request, res: Response, next: NextFunction){
    next();
}