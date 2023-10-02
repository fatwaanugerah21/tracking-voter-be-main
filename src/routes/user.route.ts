import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class UserRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([
        UserRole.TPS_COORDINATOR,
        UserRole.ADMIN,
        UserRole.OWNER,
      ]),
      UserController.createUser
    );
    this.router.get("/", UserController.getUsers);
    this.router.get("/:id", UserController.getUser);
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([
        UserRole.TPS_COORDINATOR,
        UserRole.ADMIN,
        UserRole.OWNER,
      ]),
      UserController.putUser
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([
        UserRole.TPS_COORDINATOR,
        UserRole.ADMIN,
        UserRole.OWNER,
      ]),
      UserController.deleteUser
    );

    return this.router;
  }
}

export default UserRoute;
