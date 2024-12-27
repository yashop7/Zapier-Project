import prisma from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({             
      where: {},
      take: 10,
    });

    pendingRows.forEach((r) => {
      producer.send({
        topic: TOPIC_NAME,
        messages: pendingRows.map((r) => ({
          value: r.zapRunId
        })),
      });
    });

    //Delete the rows that were sent to the Kafka topic
    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    });
  }
}
main();
