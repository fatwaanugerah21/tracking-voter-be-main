import express, { Router } from "express";
import CoordinatorController from "../controllers/coordinator.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class CoordinatorRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      CoordinatorController.createCoordinator
    );
    this.router.get("/", CoordinatorController.getCoordinators);
    this.router.get("/:id", CoordinatorController.getCoordinatorDetail);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      CoordinatorController.deleteCoordinator
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      CoordinatorController.updateCoordinator
    );

    return this.router;
  }
}

export default CoordinatorRoute;
