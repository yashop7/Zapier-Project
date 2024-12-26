import prisma from "@repo/db";
import { Kafka } from "kafkajs";


const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
  })

  
async function main() {

    while(1) {
       const pendingRows = await prisma
    }
}
main();
