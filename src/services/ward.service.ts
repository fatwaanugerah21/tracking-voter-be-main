import DatabaseLib from "../libs/database.lib";

export type TCreateWardTypes = {
  name: string;
  subdistrictId: number;
};

class WardService {
  static async createWard(data: TCreateWardTypes) {
    try {
      var user = await DatabaseLib.models.ward.create({ data });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getWardDetail(id: number) {
    try {
      var wards = await DatabaseLib.models.ward.findFirst({
        include: { subdistrict: {} },
        where: { id },
      });
      return wards;
    } catch (error) {
      throw error;
    }
  }

  static async getAllWards() {
    try {
      var wards = await DatabaseLib.models.ward.findMany({});
      return wards;
    } catch (error) {
      throw error;
    }
  }

  static async deleteWard(id: number) {
    try {
      var wards = await DatabaseLib.models.ward.delete({
        where: { id },
      });
      return wards;
    } catch (error) {
      throw error;
    }
  }

  static async updateWard(id: number, data: TCreateWardTypes) {
    try {
      var wards = await DatabaseLib.models.ward.update({
        where: { id },
        data,
      });
      return wards;
    } catch (error) {
      throw error;
    }
  }
}

export default WardService;
