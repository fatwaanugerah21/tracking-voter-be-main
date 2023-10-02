import express, { Router } from "express";
import ElectorController from "../controllers/elector.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class ElectorRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.TPS_PR, UserRole.OWNER]),
      ElectorController.createElector
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.TPS_PR, UserRole.OWNER]),
      ElectorController.updateElector
    );
    this.router.get("/", ElectorController.getElectors);
    this.router.get("/:id", ElectorController.getElectorDetail);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.TPS_PR, UserRole.OWNER]),
      ElectorController.deleteElector
    );

    return this.router;
  }
}

export default ElectorRoute;
