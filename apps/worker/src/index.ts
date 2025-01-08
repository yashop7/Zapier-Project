import { Kafka } from "kafkajs";
import prisma from "@repo/db/client";
import { parse } from "./parser";
import { SendEmail } from "./email";
import { sendSol } from "./solana";
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
      console.log("Processing Message: ", parsedData); 
      
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

      //
      const currentAction = zapRunDetails?.zap.actions.find((a) => a.sortingOrder === stage);

      if(!currentAction){
        console.log("Current Action not found");
        return;
      }

      console.log("Processing Action: ", currentAction);

      const zapRunMetadata = zapRunDetails?.metadata;
      console.log("zapRunMetadata / META DATA TO BE PUT IN THIS ABOVE ACTION: ", zapRunMetadata);

      if(currentAction.type.id === "email"){
        try{
            const metadata = currentAction.metadata as any;
            console.log("metadata: ", metadata);
            let body, to;
            try {
            body = parse(metadata.body, zapRunMetadata);
            } catch (e) {
            console.error("Failed to parse email body:");
            }
            try {
            to = parse(metadata.email, zapRunMetadata);
            } catch (e) {
            console.error("Failed to parse email address:");
            }
            console.log(`Sending out email to ${to} body is ${body}`)
            if (to && body) {
                await SendEmail(to, body);
            }
            else{
              console.log("Email or Body is not present");
            }
        }
        catch(e){
          console.log("SHIT HAPPENS");
          console.log("Error: ", e);
        }
  }
      if(currentAction.type.id === "sol"){
        try{
          const metadata = currentAction.metadata as any;
          console.log("metadata: ", metadata);
          let amount, address;
          try {
            amount = parse(metadata.amount, zapRunMetadata);
          } catch (e) {
            console.error("Failed to parse SOL amount:");
          }
          try {
            address = parse(metadata.address, zapRunMetadata);
          } catch (e) {
            console.error("Failed to parse SOL address:");
          }
          console.log(`Sending out SOL of ${amount} to address ${address}`);
          if (address && amount) {
            await sendSol(address, amount);
          } else {
            console.log("Missing or invalid address/amount");
          }
        }
        catch(e){

          console.log("SHIT HAPPENS");
        }
      }

      if(currentAction.type.id === "notion"){
        console.log("Sending notion");
      }



      await new Promise((r) => setTimeout(r, 1000)); // Stop the loop for a second
      console.log("message.offset", (parseInt(message.offset) + 1).toString());

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
        console.log("All actions processed THIS IS THE END");
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
