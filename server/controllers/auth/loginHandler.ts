import { Request, Response } from "express";
import { User } from "../../src/entity/User";
import { AppDataSource } from "../../src/data-source";
import { generatTokens } from "../../helpers/generateTokens";

import bcrypt = require("bcrypt");
import { RefreshToken } from "../../src/entity/RefreshTokens";

export const loginHandler = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  const userFronDB = await AppDataSource.getRepository(User).findOne({
    where: {
      username: username,
    },
  });

  if (!userFronDB) {
    response.json({
      ok: false,
      message:
        "Not fount, incorrect username. Maybe you need to register first",
    });
    return;
  }

  const result = await bcrypt.compare(password, userFronDB.password);
  if (!result) {
    response.json({
      ok: false,
      message: "Incorrect password",
    });
    return;
  }

  const { accessToken, refreshToken } = generatTokens({ username });

  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  await refreshTokenRepository
    .createQueryBuilder()
    .update(RefreshToken)
    .set({ token: refreshToken })
    .where("id = :id", { id: +userFronDB.id })
    .execute();
  response.json({
    ok: true,
    message: "You loggined successfully",
    body: {
      accessToken,
      refreshToken,
      id: userFronDB.id,
      username,
      firstName: userFronDB.firstName,
    },
  });
  return;
};
