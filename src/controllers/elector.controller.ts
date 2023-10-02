import { Request, Response } from "express";
import ElectorService, {
  TCreateElectorTypes,
} from "../services/elector.service";
import { errorResponse, successResponse } from "../utils/responses.util";

class ElectorController {
  static async createElector(req: Request, resp: Response) {
    try {
      var data: TCreateElectorTypes = req.body;
      const ward = await ElectorService.createElector(data);
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getElectors(_: Request, resp: Response) {
    try {
      const wards = await ElectorService.getAllElectors();
      resp.json(successResponse(wards));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getElectorDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const wards = await ElectorService.getElectorDetail(parseInt(id));
      resp.json(successResponse(wards));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async deleteElector(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const ward = await ElectorService.deleteElector(parseInt(id));
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async updateElector(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const ward = await ElectorService.updateElector(parseInt(id), data);
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }
}

export default ElectorController;
