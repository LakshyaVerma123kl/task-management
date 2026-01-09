import jwt from "jsonwebtoken";
import { TokenPayload, AuthTokens } from "../types";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret";

export const generateTokens = (payload: TokenPayload): AuthTokens => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m",
  } as jwt.SignOptions);

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  } as jwt.SignOptions);

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
};
