import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth_mongo.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id; // req.customData
    req.token = token;
    next();
  });
};

export const authHandler = async (req) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw {
        status: 401,
        ...AUTH_ERROR,
      }
    }

    req.userId = user.id;
    req.token = decoded;
    return true;
  } catch (e) {
    console.log(e);
    throw {
      status: 401,
      ...AUTH_ERROR,
    }
  }
}
