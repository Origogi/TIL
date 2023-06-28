import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/auth.js";

// TODO: Make it secure!

const jwtSecretKey = "dfdfe3df3dfdfxxdfdcgbrfrd";
const jwtExpiresIn = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password } = req.body;
  const found = await userRepository.findByUsername(username);

  if (found) {
    return res.status(409).json({ message: `${username} already exist` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    ...req.body,
    password: hashed,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresIn });
}