import { Request, Response } from "express";
import CoordinatorService from "../services/coordinator.service";
import { errorResponse, successResponse } from "../utils/responses.util";
import { TCreateUserBody } from "../types/user.type";
import UserService from "../services/user.service";
import { UserRole } from "@prisma/client";
import VotingPlaceService from "../services/voting-place.service";

class CoordinatorController {
  static async createCoordinator(req: Request, resp: Response) {
    try {
      // Create the user first
      const data: TCreateUserBody = req.body;
      data.role = UserRole.TPS_COORDINATOR;
      const user = await UserService.createUser(data);

      // Create coordinator with user id included
      const coordinator = await CoordinatorService.createCoordinator({
        userId: user.id,
      });
      resp.json(successResponse(coordinator));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getCoordinators(_: Request, resp: Response) {
    try {
      const coordinators = await CoordinatorService.getAllCoordinators();
      resp.json(successResponse(coordinators));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getCoordinatorDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const coordinators = await CoordinatorService.getCoordinatorDetail(
        parseInt(id)
      );
      resp.json(successResponse(coordinators));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async deleteCoordinator(req: Request, resp: Response) {
    try {
      var { id } = req.params;
      const parsedId = parseInt(id);

      await VotingPlaceService.deleteByCoordinatorId(parsedId);
      const coordinator = await CoordinatorService.deleteCoordinator(parsedId);
      await UserService.deleteUser(coordinator.userId);

      resp.json(successResponse(coordinator));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async updateCoordinator(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const coordinator = await CoordinatorService.updateCoordinator(
        parseInt(id),
        data
      );
      resp.json(successResponse(coordinator));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }
}

export default CoordinatorController;
