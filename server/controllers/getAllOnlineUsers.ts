import { Response } from "express";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";

export const getAllUsers = async (request, response: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const onlineUsers = await userRepository.find();

  response.json({
    ok: true,
    message: "Succefully get all online userss",
    body: {
      onlineUsers,
    },
  });
};
