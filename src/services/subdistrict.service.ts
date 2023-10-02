import DatabaseLib from "../libs/database.lib";

export type TCreateSubdistrictTypes = {
  name: string;
};

class SubdistrictService {
  static async createSubdistrict(data: TCreateSubdistrictTypes) {
    try {
      var user = await DatabaseLib.models.subdistrict.create({ data });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getSubdistrictDetail(id: number) {
    try {
      var users = await DatabaseLib.models.subdistrict.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          wards: {
            select: {
              name: true,
            },
          },
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSubdistricts() {
    try {
      var users = await DatabaseLib.models.subdistrict.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubdistrict(id: number) {
    try {
      var users = await DatabaseLib.models.subdistrict.delete({
        where: { id },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async updateSubdistrict(id: number, data: TCreateSubdistrictTypes) {
    try {
      var users = await DatabaseLib.models.subdistrict.update({
        where: { id },
        data,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default SubdistrictService;
