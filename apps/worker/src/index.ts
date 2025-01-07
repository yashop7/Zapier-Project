import { Kafka } from "kafkajs";
import prisma from "@repo/db/client";
import { parse } from "./parser";
require("dotenv").config();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  const producer = kafka.producer();
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });


  await consumer.run({
    autoCommit: false, //THIS LINE IS IMPORTANT,
    // WE WILL TELL KAFKA TO PICK THE NEXT MESSAGE ONLY AFTER WE HAVE SUCCESSFULLY PROCESSED THE CURRENT MESSAGE
    eachMessage: async ({ topic, partition, message }) => {
      if(!message.value?.toString()){
        return;
      }
      const parsedData = JSON.parse(message.value?.toString());
      const zapRunId = parsedData.zapRunId;
      const stage = parsedData.stage;      
      
      const zapRunDetails = await prisma.zapRun.findFirst({
        where : {
          id: zapRunId
        },
        include: {
          zap: {
            include : {
              actions: {
                include: {
                  type: true
                } 
              }
            }
          }
        }
      })

      const currentAction = zapRunDetails?.zap.actions.find((a) => a.sortingOrder === stage);

      if(!currentAction){
        console.log("Current Action not found");
        return;
      }

      console.log("Processing Action: ", currentAction);

      const zapRunMetadata = zapRunDetails?.metadata;
      console.log("zapRunMetadata: ", zapRunMetadata);

      if(currentAction.type.id === "email"){
        try{
          const metadata = currentAction.metadata as any;
          console.log("metadata: ", metadata);
          const body = parse(metadata.body, zapRunMetadata);
          const to = parse(metadata.email, zapRunMetadata);
          console.log(`Sending out email to ${to} body is ${body}`)
        }
        catch(e){
          console.log("SHIT HAPPENS");
          console.log("Error: ", e);
        }
  }
      if(currentAction.type.id === "sol"){
        try{
          console.log("1");
          const metadata = currentAction.metadata as any;
          console.log("metadata: ", metadata);
          console.log("2");
          const amount = parse(metadata.amount, zapRunMetadata);
          const address = parse(metadata.address, zapRunMetadata);
          console.log(`Sending out SOL of ${amount} to address ${address}`);
          // await sendSol(address, amount);
        }
        catch(e){
          console.log("SHIT HAPPENS");
        }
      }

      if(currentAction.type.id === "notion"){
        console.log("Sending notion");
      }
      console.log("hello");
      await new Promise((r) => setTimeout(r, 1000)); // Stop the loop for a second
      console.log("(parseInt(message.offset) + 1).toString(): ", (parseInt(message.offset) + 1).toString());

      const lastStage = zapRunDetails?.zap?.actions ? zapRunDetails.zap.actions.length - 1 : -1;

      if(lastStage === -1){
        console.log("No Actions Found");
        return;
      }
      if(lastStage !==  stage){

        //this will Push the Message to Kafka Again that we have processed the current message
        // and we are ready to process the next message
        await producer.send({
          topic: TOPIC_NAME,
          messages: 
          [
            {
              value: JSON.stringify({ zapRunId, stage: stage + 1 })
            }
          ] 
        });
      }

      if(stage === lastStage){
        console.log("All actions processed");
        return;
      }
      //What we are doing is that we are telling kafka to pick the next message only 
      // after we have successfully processed the current message

      //This Part of code is Just for we are telling KAFKA TO PICK 
      // THE NEXT MESSAGE ONLY AFTER WE HAVE SUCCESSFULLY PROCESSED THE CURRENT MESSAGE
      //So that it won't pick this Message after the Service Restarts
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition,
          offset: (parseInt(message.offset) + 1).toString(), //Like this we are telling kafka to pick the next message
        },
      ]);

//       Why This Matters
// This is how Kafka keeps track of what messages have been processed
// When the consumer restarts, it will start reading from this committed offset
// Adding 1 to the current offset essentially says "I've processed this message, start from the next one"

    },
  });
}
main();
