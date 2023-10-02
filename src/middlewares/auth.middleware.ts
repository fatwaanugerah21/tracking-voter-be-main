import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses.util";
import JwtLib, { TJwtPayload } from "../libs/jwt.lib";
import { UserRole } from "@prisma/client";

class AuthMiddleware {
  static async mustLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        res.json(errorResponse(401, "UNAUTHORIZED∫"));
        return;
      }

      const token = authorization?.split(" ")[1];
      if (!token) {
        res.json(errorResponse(401, "UNAUTHORIZED∫"));
        return;
      }

      const userInfo = (await JwtLib.verifyToken(token)) as any;
      req.headers.accessor = userInfo;

      next();
    } catch (error) {
      console.error(error);
    }
  }

  static checkRole(allowedRoles: UserRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { role }: TJwtPayload = req.headers.accessor as any;

        if (!allowedRoles.toString().includes(role)) {
          res.json(
            errorResponse(
              401,
              `ROLE_UNAUTHORIZED | Allowed roles: ${allowedRoles.join(" or ")}`
            )
          );
          return;
        }

        next();
      } catch (error) {
        console.error(error);
      }
    };
  }
}

export default AuthMiddleware;
