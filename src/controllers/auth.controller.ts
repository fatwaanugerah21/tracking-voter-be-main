import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import UserService from "../services/user.service";
import { TErrorMsg } from "../constants/error-msgs.constant";
import { compareSync } from "bcryptjs";
import JwtLib from "../libs/jwt.lib";
import BcryptLib from "../libs/bcrypt.lib";

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        res.json(errorResponse(401, "INVALID_AUTHORIZATION"));
        return;
      }
      const splitted = authorization.split(" ");
      if (splitted[0].toLowerCase() !== "basic") {
        res.json(errorResponse(401, "INVALID_AUTHORIZATION"));
        return;
      }
      if (!splitted[1]) {
        res.json(errorResponse(401, "INVALID_AUTHORIZATION"));
        return;
      }

      const providedCredential = Buffer.from(splitted[1], "base64").toString(
        "utf-8"
      );
      const username = providedCredential.split(":")[0];
      const password = providedCredential.split(":")[1];

      const user = await UserService.getUserByUsername(username);

      const isValidPassword = BcryptLib.comparePassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        res.json(errorResponse(400, "WRONG_PASSWORD"));
        return;
      }

      const token = await JwtLib.createToken({ role: user.role, id: user.id });
      res.json(successResponse(token));
    } catch (error) {
      if (error === ("NOT_FOUND" as TErrorMsg)) {
        res.json(errorResponse(400, "USER_NOT_FOUND"));
      }
      console.error(error);
    }
  }

  static async credential(req: Request, res: Response) {}
  static async logout(req: Request, res: Response) {}
}

export default AuthController;
