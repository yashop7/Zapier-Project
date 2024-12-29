import { authmiddleware } from "@/middleware";
import { ZapCreateSchema } from "@/types";
import { Router } from "express";

const router = Router();
router.post("/",authmiddleware, (req, res) => {
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);
    if(!parsedData.success){
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }
    res.send("Zap Created");
    
    });

router.get("/",authmiddleware, (req, res) => {
    console.log("get all the Zaps of the user");
});

router.get("/user" , authmiddleware ,(req, res) => {
    res.send("User route");
}) 

export const zapRouter = router;