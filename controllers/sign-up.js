import joi from 'joi';
import bcrypt from 'bcrypt';
import db from './db';

export async function postUserData(req, res) {
    const {name, email, password} = req.body;

}