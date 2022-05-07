import joi from 'joi';
import bcrypt from 'bcrypt';
import db from './db.js';

export async function postUserData(req, res) {
    
    //const user = req.body;
    const {name, email, password, passwordConfirmed} = req.body;

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.required(),
        passwordConfirmed: joi.ref('password')
    });

    const validation = userSchema.validate({
        name,
        email,
        password,
        passwordConfirmed
    }, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details);
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const validEmail = await db.collection("users").findOne({email});

    try {

        if (validEmail) {
            res.sendStatus(409);
            console.log("Email existente");
            return
        } else {
            const user = await db.collection("users").insertOne({
                name,
                email,
                password: passwordHash
            });
    
            res.sendStatus(201);
            console.log("Usuário criado");
            return
        }
        
    } catch (error) {
        res.sendStatus(500);
        console.log("Erro ao registrar usuário");
    }
}