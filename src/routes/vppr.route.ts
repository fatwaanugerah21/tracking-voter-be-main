import express, { Router } from "express";
import VPPRController from "../controllers/vppr.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class VPPRRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.TPS_COORDINATOR, UserRole.OWNER]),
      VPPRController.createVPPR
    );
    this.router.get("/", VPPRController.getVPPRs);
    this.router.get("/:id", VPPRController.getVPPRDetail);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.TPS_COORDINATOR, UserRole.OWNER]),
      VPPRController.deleteVPPR
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.TPS_COORDINATOR, UserRole.OWNER]),
      VPPRController.updateVPPR
    );

    return this.router;
  }
}

export default VPPRRoute;
