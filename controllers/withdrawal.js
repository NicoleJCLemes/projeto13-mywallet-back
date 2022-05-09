export async function withdrawal(req, res) {
    const {amount, description} = req.body;
    const {authorization} = req.header;

    const token = authorization?.replace("Bearer ", "");

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
            description
        });
        res.status(200).send("Saque retirado com sucesso!");
    } else {
        res.sendStatus(401);
    }
}