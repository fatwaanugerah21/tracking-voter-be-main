import { Request, Response } from "express";
import WardService, { TCreateWardTypes } from "../services/ward.service";
import { errorResponse, successResponse } from "../utils/responses.util";

class WardController {
  static async createWard(req: Request, resp: Response) {
    try {
      var data: TCreateWardTypes = req.body;
      const ward = await WardService.createWard(data);
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getWards(_: Request, resp: Response) {
    try {
      const wards = await WardService.getAllWards();
      resp.json(successResponse(wards));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getWardDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const wards = await WardService.getWardDetail(parseInt(id));
      resp.json(successResponse(wards));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async deleteWard(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const ward = await WardService.deleteWard(parseInt(id));
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async updateWard(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const ward = await WardService.updateWard(parseInt(id), data);
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }
}

export default WardController;
