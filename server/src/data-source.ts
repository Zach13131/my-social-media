import "reflect-metadata";
import { DataSource } from "typeorm";
import { RefreshToken } from "./entity/RefreshTokens";
import * as dotenv from "dotenv";
import { Post } from "./entity/Posts";
import { Friend } from "./entity/Friends";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "user",
  password: "pass",
  database: "social-media",
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken, Post, Friend],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
