import { LoginSchema, truckerSignupSchema } from "../../types";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import client from "../../db/index";
import { authenticateJwt } from "../../middleware/authenticateJwt";

export const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("inside signup");
  // check the user
  const parsedData = truckerSignupSchema.safeParse(req.body);
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
    vehicleType,
    licenseNo,
    latitude,
    longitude,
    availability,
  } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const trucker = await client.trucker.create({
      data: {
        username: username.toLowerCase(),
        password: hashedPassword,
        phone,
        vehicleType,
        licenseNo,
        latitude,
        longitude,
        availability,
      },
    });
    res.json({
      truckerId: trucker.id,
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
    const trucker = await client.trucker.findUnique({
      where: {
        username: parsedData.data.username.toLowerCase(),
      },
    });
    if (!trucker) {
      res.status(403).json({ message: "User not found" });
      return;
    }
    const isValid = await bcrypt.compare(
      parsedData.data.password,
      trucker.password
    );
    if (!isValid) {
      res.status(403).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      {
        truckerId: trucker.id,
      },
      JWT_PASSWORD
    );
    res.json({
      token,
      truckerId: trucker.id,
    });
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

router.post("/update-location", async (req: Request, res: any) => {
  const { id, lat, lng } = req.body;

  if (!id || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const trucker = await client.trucker.update({
      where: { id },
      data: { latitude: lat, longitude: lng },
    });

    res.json({ message: "Location updated successfully", trucker });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Failed to update location" });
  }
});

router.get("/locations", async (req, res) => {
  try {
    const truckers = await client.trucker.findMany({
      select: {
        id: true,
        username: true,
        latitude: true,
        longitude: true,
        licenseNo: true,
        vehicleType: true,
      },
    });

    res.json(truckers);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to retrieve locations" });
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  res.status(200).json({ message: "Hello, you are logged in" });
});
