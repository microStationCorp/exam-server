import { prisma } from "../model/model.js";
import { cookieToken } from "../helper/cookieToken.js";
import bycrypt from "bcryptjs";

//signup
export const userSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("please provide all fields");
    }

    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(password, salt, async (err, hash) => {
        if (!err) {
          const user = await prisma.user.create({
            data: {
              name: name,
              email: email,
              password: hash,
            },
          });
          cookieToken(user, res);
        }
      });
    });
  } catch (err) {
    throw new Error(error);
  }
};

//signin
export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide all fields");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      bycrypt.compare(password, user.password, (err, response) => {
        if (!err) {
          if (response) {
            cookieToken(user, res);
          } else {
            res.json({ success: false, user: null, token: null });
          }
        }
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
