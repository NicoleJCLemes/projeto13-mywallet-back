import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import joi from 'joi';
import db from './controllers/db.js';
import { compareUserData } from "./controllers/sign-in.js";
import { postUserData } from "./controllers/sign-up.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.post("/sign-up", postUserData);

app.post("/sign-in", compareUserData);

app.listen(5000, () => console.log("server is running on port 5000"));