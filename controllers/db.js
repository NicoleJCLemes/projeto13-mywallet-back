import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    db = mongoClient.db("projeto13-mywallet");
    console.log("Conexão com o banco de dados estabelecida com sucesso!")
} catch (error) {
    console.log("Erro ao se conectar com o banco de dados");
}

export default db;