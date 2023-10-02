import { Request, Response } from "express";
import SubdistrictService, {
  TCreateSubdistrictTypes,
} from "../services/subdistrict.service";
import { errorResponse, successResponse } from "../utils/responses.util";

class SubdistrictController {
  static async createSubdistrict(req: Request, resp: Response) {
    try {
      var data: TCreateSubdistrictTypes = req.body;
      const subdistrict = await SubdistrictService.createSubdistrict(data);
      resp.json(successResponse(subdistrict));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getSubdistricts(_: Request, resp: Response) {
    try {
      const subdistricts = await SubdistrictService.getAllSubdistricts();
      resp.json(successResponse(subdistricts));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getSubdistrictDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const subdistricts = await SubdistrictService.getSubdistrictDetail(
        parseInt(id)
      );
      resp.json(successResponse(subdistricts));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async deleteSubdistrict(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const subdistrict = await SubdistrictService.deleteSubdistrict(
        parseInt(id)
      );
      resp.json(successResponse(subdistrict));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async updateSubdistrict(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const subdistrict = await SubdistrictService.updateSubdistrict(
        parseInt(id),
        data
      );
      resp.json(successResponse(subdistrict));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }
}

export default SubdistrictController;
