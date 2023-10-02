import DatabaseLib from "../libs/database.lib";

export type TCreateCoordinatorTypes = {
  userId: number;
};

class CoordinatorService {
  static async createCoordinator(data: TCreateCoordinatorTypes) {
    try {
      var coordinator = await DatabaseLib.models.coordinator.create({ data });
      return coordinator;
    } catch (error) {
      throw error;
    }
  }

  static async getCoordinatorUserId(id: number) {
    try {
      var coordinator = await DatabaseLib.models.coordinator.findFirst({
        where: { id },
        select: {
          userId: true,
        },
      });
      return coordinator;
    } catch (error) {
      throw error;
    }
  }

  static async getCoordinatorDetail(id: number) {
    try {
      var coordinator = await DatabaseLib.models.coordinator.findFirst({
        where: { id },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              phoneNumber: true,
              role: true,
            },
          },
        },
      });
      return coordinator;
    } catch (error) {
      throw error;
    }
  }

  static async getAllCoordinators() {
    try {
      var coordinators = await DatabaseLib.models.coordinator.findMany({
        select: {
          id: true,
          user: {
            select: {
              name: true,
              phoneNumber: true,
              role: true,
            },
          },
        },
      });

      return coordinators;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCoordinator(id: number) {
    try {
      var coordinator = await DatabaseLib.models.coordinator.delete({
        where: { id },
      });
      return coordinator;
    } catch (error) {
      throw error;
    }
  }

  static async updateCoordinator(id: number, data: TCreateCoordinatorTypes) {
    try {
      var coordinators = await DatabaseLib.models.coordinator.update({
        where: { id },
        data,
      });
      return coordinators;
    } catch (error) {
      throw error;
    }
  }
}

export default CoordinatorService;
