import express, { Router } from "express";
import SubdistrictController from "../controllers/subdistrict.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

class SubdistrictRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      SubdistrictController.createSubdistrict
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      SubdistrictController.updateSubdistrict
    );
    this.router.get("/", SubdistrictController.getSubdistricts);
    this.router.get("/:id", SubdistrictController.getSubdistrictDetail);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      AuthMiddleware.checkRole([UserRole.ADMIN, UserRole.OWNER]),
      SubdistrictController.deleteSubdistrict
    );

    return this.router;
  }
}

export default SubdistrictRoute;
