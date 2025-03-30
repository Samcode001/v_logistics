import { LoginSchema, ShippersignupSchema } from "../../types";
import express, { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import client from "../../db/index";
import {
  AuthenticatedRequest,
  authenticateJwt,
} from "../../middleware/authenticateJwt";

export const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("inside signup");
  const parsedData = ShippersignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("parsed data incorrect");
    res
      .status(400)
      .json({ message: `Validation failed:${parsedData.error.format()}` });
    console.log(parsedData.error.format());
    return;
  }

  const {
    username,
    password,
    phone,
    mc_dot,
    carrierType,
    country,
    state,
    city,
    zipcode,
    fleetSize,
    address,
  } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const shipper = await client.shipper.create({
      data: {
        username: username.toLowerCase(),
        password: hashedPassword,
        phone,
        mc_dot,
        carrierType,
        country,
        state,
        city,
        zipcode,
        fleetSize,
        address,
      },
    });
    res.json({
      shipperId: shipper.id,
    });
  } catch (e) {
    console.log("erroer thrown");
    console.log(e);
    res.status(400).json({ message: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const parsedData = LoginSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("parsed data incorrect");
    res
      .status(400)
      .json({ message: `Validation failed:${parsedData.error.format()}` });
    console.log(parsedData.error.format());
    return;
  }

  try {
    const shipper = await client.shipper.findUnique({
      where: {
        username: parsedData.data.username.toLowerCase(),
      },
    });
    if (!shipper) {
      res.status(403).json({ message: "User not found" });
      return;
    }
    const isValid = await bcrypt.compare(
      parsedData.data.password,
      shipper.password
    );
    if (!isValid) {
      res.status(403).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      {
        shipperId: shipper.id,
      },
      JWT_PASSWORD
    );
    res.json({
      token,
    });
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  res.status(200).json({ message: "Hello, you are logged in" });
});
