import db from "./db.js";

export async function deposit(res, req) {
    console.log(req.body)
    const {amount, description} = req.body;
    const {Authorization} = req.headers;

    const token = Authorization?.replace("Bearer ", "");

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
                description
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