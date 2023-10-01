import express, { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", UserController.createUser);
    this.router.get("/", UserController.getUsers);
    this.router.get("/:id", UserController.getUser);
    this.router.put("/:id", UserController.putUser);
    this.router.delete("/:id", UserController.deleteUser);

    return this.router;
  }
}

export default UserRoute;
