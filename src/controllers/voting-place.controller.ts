import { Request, Response } from "express";
import VotingPlaceService, {
  TCreateVotingPlaceTypes,
} from "../services/voting-place.service";
import { errorResponse, successResponse } from "../utils/responses.util";

class VotingPlaceController {
  static async createVotingPlace(req: Request, resp: Response) {
    try {
      var data: TCreateVotingPlaceTypes = req.body;
      const ward = await VotingPlaceService.createVotingPlace(data);
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getVotingPlaces(_: Request, resp: Response) {
    try {
      const wards = await VotingPlaceService.getAllVotingPlaces();
      resp.json(successResponse(wards));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async getVotingPlaceDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const wards = await VotingPlaceService.getVotingPlaceDetail(parseInt(id));
      resp.json(successResponse(wards));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async deleteVotingPlace(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const ward = await VotingPlaceService.deleteVotingPlace(parseInt(id));
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }

  static async updateVotingPlace(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const ward = await VotingPlaceService.updateVotingPlace(
        parseInt(id),
        data
      );
      resp.json(successResponse(ward));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error(error);
    }
  }
}

export default VotingPlaceController;
