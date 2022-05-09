import express from "express";
import cors from 'cors';
import { compareUserData } from "./controllers/sign-in.js";
import { postUserData } from "./controllers/sign-up.js";
import { deposit } from "./controllers/deposit.js";
import { withdrawal } from "./controllers/withdrawal.js";
import { getAllDeposits } from "./controllers/deposit.js";
import { deleteInfo } from "./controllers/sign-in.js";
import { getAllWithdrawals } from "./controllers/withdrawal.js"

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-up", postUserData);

app.post("/", compareUserData);

app.post("/deposit", deposit);

app.post("/withdrawal", withdrawal); 

app.get("/deposit", getAllDeposits);

app.get("/withdrawal", getAllWithdrawals);

app.delete("/:userId", deleteInfo);

app.listen(process.env.PORT, () => console.log("server is running on port " + process.env.PORT));