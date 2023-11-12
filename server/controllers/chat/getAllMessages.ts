import { Response } from "express";
import { AppDataSource } from "../../src/data-source";
import { Post } from "./../../src/entity/Posts";
import { User } from "./../../src/entity/User";

export const getAllPosts = async (request, response: Response) => {
  const PostRepository = AppDataSource.getRepository(Post);

  const postsWithUserInfo = await PostRepository.createQueryBuilder("post")
    .select([
      "post.id",
      "post.postHeader",
      "post.postDescr",
      "post.postImageUrl",
      "user.username",
      "user.firstName",
      "post.createdAt",
      "post.updatedAt",
    ])
    .leftJoin(User, "user", "user.id = post.userId")
    .getRawMany();

  response.json({
    ok: true,
    message: "Successfully get all posts",
    body: {
      postsWithUserInfo,
    },
  });
};
