import { Response } from "express";
import { AppDataSource } from "../../src/data-source";
import { Friend } from "../../src/entity/Friends";

export const deleteFriend = async (request, response: Response) => {
  const { friendId } = request.body;

  const FriedsRepository = AppDataSource.getRepository(Friend);

  await FriedsRepository.createQueryBuilder("friends")
    .delete()
    .from(Friend)
    .where("userId = :id", { id: request.user.id })
    .andWhere("userId = :id", { id: friendId })
    .execute();

  await FriedsRepository.createQueryBuilder("friends")
    .delete()
    .from(Friend)
    .where("userId = :id", { id: friendId })
    .andWhere("userId = :id", { id: request.user.id })
    .execute();

  response.json({
    ok: true,
    message: "Friend successfully deleted",
    body: {},
  });
};
