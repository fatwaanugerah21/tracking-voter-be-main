import { Request, Response } from "express";
import VPPRService, { TCreateVPPRTypes } from "../services/vppr.service";
import { errorResponse, successResponse } from "../utils/responses.util";
import { TCreateUserBody } from "../types/user.type";
import { UserRole } from "@prisma/client";
import UserService from "../services/user.service";

class VPPRController {
  static async createVPPR(req: Request, resp: Response) {
    let stepId = "";
    let createdUserId = -1;
    try {
      const {
        coordinatorId,
        votingPlaceId,
        ...user
      }: TCreateUserBody & { coordinatorId: number; votingPlaceId: number } =
        req.body;
      user.role = UserRole.TPS_PR;

      stepId = "USER_CREATED";

      const createdUser = await UserService.createUser(user);

      createdUserId = createdUser.id;

      const vppr = await VPPRService.createVPPR({
        coordinatorId,
        votingPlaceId,
        userId: createdUser.id,
      });
      resp.json(successResponse(vppr));
    } catch (error) {
      if (stepId === "USER_CREATED") {
        UserService.deleteUser(createdUserId);
      }

      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getVPPRs(_: Request, resp: Response) {
    try {
      const vpprs = await VPPRService.getAllVPPRs();
      resp.json(successResponse(vpprs));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getVPPRDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const vpprs = await VPPRService.getVPPRDetail(parseInt(id));
      resp.json(successResponse(vpprs));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async deleteVPPR(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const vppr = await VPPRService.deleteVPPR(parseInt(id));
      await UserService.deleteUser(vppr.userId);

      resp.json(successResponse(vppr));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async updateVPPR(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const vppr = await VPPRService.updateVPPR(parseInt(id), data);
      resp.json(successResponse(vppr));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }
}

export default VPPRController;
