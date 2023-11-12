import { Request, Response } from "express";
import { AppDataSource } from "../../src/data-source";

import bcrypt = require("bcrypt");

import { generatTokens } from "../../helpers/generateTokens";

import { User } from "../../src/entity/User";
import { RefreshToken } from "../../src/entity/RefreshTokens";

require("dotenv").config();

const { BYCRIPT_SALT_ROUNDS } = process.env;

export const registerHandler = async (request: Request, response: Response) => {
  const dbHasUser = await AppDataSource.getRepository(User).findOne({
    where: {
      username: request.body.username,
    },
  });

  if (dbHasUser) {
    response.json({
      ok: false,
      body: {
        message: "This user is already exists",
      },
    });
    return;
  }

  const { username, password, firstname } = request.body;

  const user = new User();
  user.username = username;
  user.firstName = firstname;

  const newPassword = await bcrypt.hash(password, +BYCRIPT_SALT_ROUNDS);
  user.password = newPassword;
  user.isOnline = false;

  const { accessToken, refreshToken } = generatTokens({ username });

  await AppDataSource.manager.save(user);

  const userFromDb = await AppDataSource.getRepository(User).findOne({
    where: {
      username: request.body.username,
    },
  });

  const refreshTokenDb = new RefreshToken();
  refreshTokenDb.userId = userFromDb.id;
  refreshTokenDb.token = refreshToken;

  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  await refreshTokenRepository.save(refreshTokenDb);

  const newUsers = await AppDataSource.manager.find(User);
  response.status(200).json({
    ok: true,
    message: "User saved successfully",
    body: {
      accessToken,
      refreshToken,
      id: userFromDb.id,
    },
    newUsers: newUsers,
  });
};
