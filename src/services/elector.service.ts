import { Elector, ElectorStatus } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TErrorMsg } from "../constants/error-msgs.constant";

export type TCreateElectorTypes = {
  name: string;
  nik: string;
  address: string;
  description: string;
  phoneNumber: string;
  status: ElectorStatus;
  votingPlaceId: number;
  bribeAmt?: number;
  choiceName?: string;
};

class ElectorService {
  static async createElector(data: TCreateElectorTypes) {
    try {
      var elector = await DatabaseLib.models.elector.create({ data });
      return elector;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getAllElectors() {
    try {
      var electors = await DatabaseLib.models.elector.findMany({});
      return electors;
    } catch (error) {
      throw error;
    }
  }

  static async getElectorDetail(id: number) {
    try {
      var elector = await DatabaseLib.models.elector.findFirst({
        where: { id },
      });

      if (!elector) {
        throw "NOT_FOUND" as TErrorMsg;
      }

      return elector;
    } catch (error) {
      throw error;
    }
  }

  static async deleteElector(id: number) {
    try {
      var elector = await DatabaseLib.models.elector.delete({ where: { id } });
      return elector;
    } catch (error) {
      throw error;
    }
  }

  static async updateElector(id: number, data: TCreateElectorTypes) {
    try {
      const elector = await DatabaseLib.models.elector.update({
        data,
        where: { id },
      });
      return elector;
    } catch (error) {
      throw error;
    }
  }
}

export default ElectorService;
