import DatabaseLib from "../libs/database.lib";

export type TCreateVPPRTypes = {
  coordinatorId: number;
  votingPlaceId: number;
  userId: number;
};

class VPPRService {
  static async createVPPR(data: TCreateVPPRTypes) {
    try {
      var vppr = await DatabaseLib.models.vPPR.create({ data });
      return vppr;
    } catch (error) {
      throw error;
    }
  }

  static async getVPPRDetail(id: number) {
    try {
      var vpprs = await DatabaseLib.models.vPPR.findFirst({
        where: { id },
      });
      return vpprs;
    } catch (error) {
      throw error;
    }
  }

  static async getAllVPPRs() {
    try {
      var vpprs = await DatabaseLib.models.vPPR.findMany({});
      return vpprs;
    } catch (error) {
      throw error;
    }
  }

  static async deleteVPPR(id: number) {
    try {
      var vpprs = await DatabaseLib.models.vPPR.delete({
        where: { id },
      });
      return vpprs;
    } catch (error) {
      throw error;
    }
  }

  static async updateVPPR(id: number, data: TCreateVPPRTypes) {
    try {
      var vpprs = await DatabaseLib.models.vPPR.update({
        where: { id },
        data,
      });
      return vpprs;
    } catch (error) {
      throw error;
    }
  }
}

export default VPPRService;
