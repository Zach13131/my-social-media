import { Response } from "express";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";

export const updateUser = async (request, response: Response) => {
  const { userId, setOnline } = request.body;

  const userRepository = AppDataSource.getRepository(User);
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ isOnline: setOnline })
    .where("id = :id", { id: +userId })
    .execute();

  const usersArr = await userRepository.find();

  response.json({
    ok: true,
    message: "Successfully updated",
    body: {
      usersArr,
    },
  });
};
