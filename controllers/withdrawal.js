import db from "./db.js";
import dayjs from "dayjs";

export async function withdrawal(req, res) {
    const {amount, description} = req.body;
    const {authorization} = req.headers;
    let date = dayjs().format('DD/MM');

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
            db.collection("withdrawals").insertOne({
                userId: session.userId,
                amount,
                description,
                date
            });
            res.status(200).send("Saque retirado com sucesso!");
    
        } else {
            res.sendStatus(401);
    
        }
    } catch (error) {
        res.sendStatus(500);
        console.log("Erro ao adicionar o saque");
    }

}

export async function getAllWithdrawals(req, res) {

    try {
        const withdrawals = await db.collection("withdrawals").find().toArray();
        res.status(200).send(withdrawals);

    } catch (error) {
        res.status(500).send("Não foi possível obter as informações");

    }

}