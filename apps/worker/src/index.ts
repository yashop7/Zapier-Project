import prisma from "@repo/db/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  while (1) {
    await consumer.run({
      autoCommit : false, //THIS LINE IS IMPORTANT, 
      // WE WILL TELL KAFKA TO PICK THE NEXT MESSAGE ONLY AFTER WE HAVE SUCCESSFULLY PROCESSED THE CURRENT MESSAGE
      eachMessage: async ({ topic, partition, message }) => {
        const zapRunId = message.value?.toString();
        console.log(`Received message: ${zapRunId}`);
        //
        await new Promise((r) => setTimeout(r, 1000)); // Stop the loop for a second
        //
        
        //Till now we have processed the message, now we will tell kafka to pick the next message
        await consumer.commitOffsets([
          {
            topic : TOPIC_NAME,
            partition,
            offset: (parseInt(message.offset) + 1).toString(), //Like this we are telling kafka to pick the next message

          }
        ])

      },
      
    });
  }
}
main();
