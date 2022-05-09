import db from "./db.js";
import dayjs from "dayjs";

export async function deposit(res, req) {
    console.log(req.body)
    const {amount, description} = req.body;
    const {authorization} = req.headers;
    let date = dayjs().format('DD:MM');

    const token = authorization?.replace("Bearer ", ""); // fazer funcionar o post

    try {
        if (!token) {
            res.sendStatus(401);
        }
    
        const session = await db.collection("sessions").findOne({token});
    
        if (!session) {
            res.sendStatus(401);
        }
    
        const user = await db.collection("users").findOne({
            _id: session.userId
        });
    
        if (user) {
            db.collection("deposits").insertOne({
                userId: session.userId,
                amount,
                description,
                date
            });
            res.status(200).send("Depósito adicionado com sucesso!");
        } else {
            res.sendStatus(401);
        }
        
    } catch (error) {
        res.sendStatus(500);
        console.log("Erro ao adicionar o depósito");
    }

}

export async function getAllDeposits(req, res) {

    try {
        const deposits = await db.collection("deposits").find().toArray();
        res.status(200).send(deposits);

    } catch (error) {
        res.status(500).send("Não foi possível obter as informações");

    }

}