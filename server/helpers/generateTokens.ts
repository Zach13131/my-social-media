const jwt = require("jsonwebtoken");

require("dotenv").config();

const { MY_SECRET_KEY, MY_REFRESH_SECRET_KEY, BYCRIPT_SALT_ROUNDS } =
  process.env;

const generateAccessToken = (user) => {
  return jwt.sign({ username: user.username }, MY_SECRET_KEY, {
    expiresIn: "20s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ username: user.username }, MY_REFRESH_SECRET_KEY);
};
export const generatTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};
