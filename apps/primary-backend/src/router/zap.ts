import { Router } from "express";

const router = Router();
router.post("/",authmiddleware, (req, res) => {
    res.send("Login route");
    });

router.get("/",authmiddleware, (req, res) => {
    console.log("get all the Zaps of the user");
});

router.get("/user" , authmiddleware ,(req, res) => {
    res.send("User route");
}) 

export const zapRouter = router;