import { authmiddleware } from "@/middleware";
import { ZapCreateSchema } from "@/types";
import { Router } from "express";
import prisma from "@repo/db/client";

// export const ZapCreateSchema = z.object({
//     availableTriggerId: z.string(),
//     triggerMetadata: z.any().optional(),
//     actions: z.array(z.object({
//         availableActionId: z.string(),
//         actionMetadata: z.any().optional(),
//     }))
// });

const router = Router();
router.post("/", authmiddleware, async (req, res) => {
  // @ts-ignore
  const id: string = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);
  
  if (!parsedData.success) {
      res.status(411).json({
          message: "Incorrect inputs",
        });
        return;
    }
    console.log("parsedData: ", parsedData.data);

  const zapId = await prisma.$transaction(async (tx : any) => {
    const zap = await prisma.zap.create({
        data: {
            userId: parseInt(id),
            triggerId: "",
            actions: {
                create: parsedData.data.actions.map((x, index) => ({
                    actionId: x.availableActionId,
                    sortingOrder: index,
                    metadata: x.actionMetadata,
                })),
            },
        },
    });
    console.log("zap: ", zap);
    
    const trigger = await tx.trigger.create({
        data: {
            triggerId: parsedData.data.availableTriggerId,
            zapId: zap.id,
        },
    });
    console.log("trigger: ", trigger);

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
    
  }, { maxWait: 10000, timeout: 15000 });

  res.json({
    zapId,
  });
});
router.get("/", authmiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const zaps = await prisma.zap.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      triggerId: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  
  res.json({
    zaps,
  });
});

router.get("/:zapId", authmiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;

  const zap = await prisma.zap.findFirst({
    //There are 2 Checks for Double Verification
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  res.json({
    zap,
  });
});

export const zapRouter = router;
