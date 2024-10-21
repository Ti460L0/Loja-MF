import db from "../config/db.js";
import bcrypt from "bcrypt";

const loginModel = {
    findByCpf: async (cpf) => {
        return db.query("SELECT * FROM usuarios WHERE cpf = $1", [cpf]);
    },

    createUser: async (cpf, dataNascimento, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return db.query("INSERT INTO usuarios (cpf, data_nascimento, password) VALUES ($1, $2, $3)", [cpf, dataNascimento, hashedPassword]);
    },
};

export default loginModel;
