import express, { Router } from "express";
import WardController from "../controllers/ward.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class WardRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      WardController.createWard
    );
    this.router.get("/", WardController.getWards);
    this.router.get("/:id", WardController.getWardDetail);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      WardController.deleteWard
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      WardController.updateWard
    );

    return this.router;
  }
}

export default WardRoute;
