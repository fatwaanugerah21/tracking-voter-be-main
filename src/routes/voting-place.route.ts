import express, { Router } from "express";
import VotingPlaceController from "../controllers/voting-place.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class VotingPlaceRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      VotingPlaceController.createVotingPlace
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      VotingPlaceController.updateVotingPlace
    );
    this.router.get("/", VotingPlaceController.getVotingPlaces);
    this.router.get("/:id", VotingPlaceController.getVotingPlaceDetail);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      VotingPlaceController.deleteVotingPlace
    );

    return this.router;
  }
}

export default VotingPlaceRoute;
