import { Router } from "express";
import prisma from "@repo/db";
import { Signupschema } from "../types";
import { authmiddleware } from "../middleware";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();
router.post("/signup", authmiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = Signupschema.safeParse(body);

  if (!parsedData.success) {
     res.status(411).json({
      message: "Invalid data",
    });
    return;
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (userExists) {
     res.status(403).json({
      message: "User already exists",
    });
  }

  await prisma.user.create({
    data: {
      email: parsedData.data.email,
      password: parsedData.data.password, //We have to hash this password LATER
      name: parsedData.data.name,
    },
  });

  //we will tell User to Check his email
  //await sendEmail()

  res.status(200).json({
    message: "Please verify your account from Email",
  });
});

router.get("/signin", authmiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = Signupschema.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Invalid data",
    });
    return;
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  if (!userExists) {
    res.status(403).json({
      message: "User does not exist",
    });
    return;
  }

  //Sign the JWT token and send it to the user
  const token = jwt.sign(
    {
      id: userExists.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token: token,
  });
});

router.get("/user", authmiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id; //we will get this thing from middleware
    const user = await prisma.user.findFirst({
        where : {
            id : id
        },
        select :{
            name : true,
            email : true
        }
    });

    res.json({
        user
    })

});

export const UserRouter = router;
