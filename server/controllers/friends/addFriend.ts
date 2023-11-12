import { Response } from "express";
import { AppDataSource } from "../../src/data-source";
import { Friend } from "../../src/entity/Friends";

export const addFriend = async (request, response: Response) => {
  const { friendId } = request.body;

  const FriedsRepository = AppDataSource.getRepository(Friend);

  const friend = new Friend();
  friend.userId = request.user.id;
  friend.friendId = friendId;

  const friend2 = new Friend();
  friend2.userId = friendId;
  friend2.friendId = request.user.id;

  await FriedsRepository.save(friend);
  await FriedsRepository.save(friend2);
  response.json({
    ok: true,
    message: "Successfully added to friends",
    body: {},
  });
};
