import joi from 'joi';
import bcrypt from 'bcrypt';
import db from './db.js';
import { v4 as uuid } from 'uuid';

export async function compareUserData(req, res) {
    const {email, password} = req.body;

    
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.required()
    });
    
    const validation = userSchema.validate({
        email,
        password
    });
    
    if (validation.error) {
        console.log(validation.error.details);
    }
    
    const user = await db.collection("users").findOne({email});

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        });

        res.status(200).send({
            token,
            name: user.name
        });

    } else {
        res.status(404).send("Usuário não encontrado");

    }
}

export async function deleteInfo(req, res) {
    const {userId} = req.params

    try {
		const sessions = db.collection("sessions");
		await sessions.deleteOne({ userId: new ObjectId(userId) });
				
		res.sendStatus(200);
        console.log("Deslogado com sucesso")

	 } catch (error) {

	  res.status(500).send("Erro ao fazer logout");

	 }

}