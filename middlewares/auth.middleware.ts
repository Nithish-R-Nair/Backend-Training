import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../dto/jwt-payload";
import "dotenv/config";

const getToken = (req: Request): string => {
    const token = req.headers.authorization;
    if(!token)
        throw new HttpException(401, "Not authorized");
    const tokenSplits = token.split(" ");
    if(tokenSplits.length != 2)
        throw new HttpException(401, "Invalid token");
    return tokenSplits[1];
} 

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if(!token)
        throw new HttpException(401, "Not authorized");
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        req.user = payload;
    } catch (error) {
        throw new HttpException(401, "Invalid or expired token");
    }
    next();
}

export default authMiddleware;