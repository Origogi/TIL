import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expireInSec: required("JWT_EXPIRES_SEC"),
  },
  bcrypt: {
    saltRounds: Number(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: required("PORT", 8080),
  db : {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database : required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  cors : {
    allowedOrigin : required("CORS_ALLOW_ORIGIN"),
  }
};
