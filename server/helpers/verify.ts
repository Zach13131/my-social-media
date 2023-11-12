const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";

require("dotenv").config();

const { MY_SECRET_KEY, MY_REFRESH_SECRET_KEY } = process.env;

interface CustomRequest extends Request {
  user: {
    id: number;
    username: string;
    password: string;
    firstName: string;
  };
}

export const verify = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json("you are not authorized");
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, MY_SECRET_KEY, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json(err);
    }

    const userFromDb = await AppDataSource.getRepository(User).findOne({
      where: {
        username: user.username,
      },
    });
    user.id = +userFromDb.id;
    req.user = user;

    next();
  });
};
