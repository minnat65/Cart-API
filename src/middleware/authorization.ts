import { NextFunction, Request, Response } from "express";
import { UserRole } from "../interface/grocery";
import { IncomingHttpHeaders } from 'http';

declare module 'http' {
    interface IncomingHttpHeaders {
        "usertype": UserRole
    }
}

export const isAuthorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(roles, req.headers.usertype)
    if(!roles.includes(req.headers.usertype)) {
      throw new Error('Permission denied.');
    }

    next();
  }
}