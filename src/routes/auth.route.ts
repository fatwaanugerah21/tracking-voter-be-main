import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class AuthRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/login", AuthController.login);
    this.router.post(
      "/credential",
      AuthMiddleware.mustLogin,
      AuthController.credential
    );
    this.router.post(
      "/logout",
      AuthMiddleware.mustLogin,
      AuthController.logout
    );

    return this.router;
  }
}

export default AuthRoute;
