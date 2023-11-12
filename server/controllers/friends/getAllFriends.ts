import { Response } from "express";
import { AppDataSource } from "../../src/data-source";
import { Friend } from "../../src/entity/Friends";

export const getAllFriends = async (request, response: Response) => {
  const FriendsRepository = AppDataSource.getRepository(Friend);

  console.log(
    "file: getAllFriends.ts:12 ~ getAllFriends ~ request.user.id:",
    request.user.id
  );

  // const friends = await FriendsRepository.createQueryBuilder("friends")
  //   .select([
  //     "friends.id",
  //     "friends.userId",
  //     "friends.friendId",
  //     "friends.createdAt",
  //     "friends.updatedAt",
  //     "user.username",
  //   ])
  //   .leftJoin("friends.user", "user")
  //   .where("friends.userId = :id", { id: request.user.id })
  //   .getMany();

  const friends = await FriendsRepository.createQueryBuilder("friends")
    .select([
      "friends.id",
      "friends.userId",
      "friends.friendId",
      "friends.createdAt",
      "friends.updatedAt",
      "user.username",
      "user.firstName",
      "user.id",
    ])
    .leftJoin("friends.friend", "user")
    .where("friends.userId = :id", { id: request.user.id })
    .getMany();

  console.log("file: getAllFriends.ts:17 ~ getAllFriends ~ friends:", friends);

  const friendsArr = await FriendsRepository.find();
  response.json({
    ok: true,
    message: "Successfully get all friends",
    body: {
      friends,
    },
  });
};
