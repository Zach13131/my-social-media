import { Response } from "express";
import { AppDataSource } from "../../src/data-source";
import { Post } from "../../src/entity/Posts";

export const addPost = async (request, response: Response) => {
  const { postHeader, postDescr, postImageUrl } = request.body;

  const PostRepository = AppDataSource.getRepository(Post);

  const post = new Post();

  post.postHeader = postHeader;
  post.postDescr = postDescr;
  post.postImageUrl = postImageUrl;
  post.userId = +request.user.id;

  await PostRepository.save(post);
  response.json({
    ok: true,
    message: "Post saved successfully",
    body: {},
  });
};
