import DatabaseLib from "../libs/database.lib";

export type TCreateVotingPlaceTypes = {
  name: string;
  address: string;
  wardId: number;
  coordinatorId: number;
};

class VotingPlaceService {
  static async deleteByCoordinatorId(coordinatorId: number) {
    try {
      const votingPlaces = await DatabaseLib.models.votingPlace.deleteMany({
        where: { coordinatorId },
      });
      return votingPlaces;
    } catch (error) {
      throw error;
    }
  }

  static async createVotingPlace(data: TCreateVotingPlaceTypes) {
    try {
      const votingPlace = await DatabaseLib.models.votingPlace.create({ data });
      return votingPlace;
    } catch (error) {
      throw error;
    }
  }

  static async getVotingPlaceDetail(id: number) {
    try {
      const votingPlace = await DatabaseLib.models.votingPlace.findFirst({
        where: { id },
        select: {
          name: true,
          address: true,
          coordinator: {
            select: {
              user: {
                select: {
                  name: true,
                  phoneNumber: true,
                },
              },
            },
          },
          electors: {
            select: {
              name: true,
              nik: true,
              address: true,
              phoneNumber: true,
              description: true,
              status: true,
              choiceName: true,
              bribeAmt: true,
            },
          },
        },
      });
      return votingPlace;
    } catch (error) {
      throw error;
    }
  }

  static async getAllVotingPlaces() {
    try {
      const votingPlaces = await DatabaseLib.models.votingPlace.findMany({
        include: { coordinator: {} },
      });
      return votingPlaces;
    } catch (error) {
      throw error;
    }
  }

  static async deleteVotingPlace(id: number) {
    try {
      const votingPlaces = await DatabaseLib.models.votingPlace.delete({
        where: { id },
      });
      return votingPlaces;
    } catch (error) {
      throw error;
    }
  }

  static async updateVotingPlace(id: number, data: TCreateVotingPlaceTypes) {
    try {
      const votingPlaces = await DatabaseLib.models.votingPlace.update({
        where: { id },
        data,
      });
      return votingPlaces;
    } catch (error) {
      throw error;
    }
  }
}

export default VotingPlaceService;
