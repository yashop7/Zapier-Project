import express from "express";
import prisma from "@repo/db/client";
const app = express();
app.use(express.json());


// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store in db a new trigger
  await prisma.$transaction(async (tx: any) => {
    //Here we are Following a OutBox Pattern, Like we are storing the data in a outbox table and then we are processing it in the background
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body
      }
    });
    
    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id
      }
    });
  });

  res.json({
    message: "Webhook received"
  });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
