import { Request, Response } from "express";
import { User } from "../../src/entity/User";
import { AppDataSource } from "../../src/data-source";
import { generatTokens } from "../../helpers/generateTokens";
import { RefreshToken } from "../../src/entity/RefreshTokens";

export const refreshHandler = async (request: Request, response: Response) => {
  const { refreshToken, id } = request.body;

  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const userFromRefreshTokenDb = await refreshTokenRepository.findOne({
    where: {
      id: +id,
      token: refreshToken,
    },
  });
  if (!userFromRefreshTokenDb) {
    response.json({
      ok: false,
      message: "Cant refresh tokens. something went wrong",
      body: {},
    });
    return;
  }
  const usersRepository = AppDataSource.getRepository(User);
  const userFromUsersDb = await usersRepository.findOne({
    where: {
      id: +id,
    },
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generatTokens({
      username: userFromUsersDb.username,
    });

  await refreshTokenRepository
    .createQueryBuilder()
    .update(RefreshToken)
    .set({ token: newRefreshToken })
    .where("id = :id", { id: +id })
    .execute();

  response.json({
    ok: true,
    message: "Tokens successfully refreshed",
    body: {
      newAccessToken,
      newRefreshToken,
    },
  });
  return;
};
