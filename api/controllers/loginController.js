import loginModel from "../models/loginModel.js";
import bcrypt from "bcrypt";

const loginController = {
    login: async (req, res) => {
        const { cpf, password } = req.body;

        try {
            const result = await loginModel.findByCpf(cpf);

            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Usuário não encontrado. Por favor, registre-se.' });
            }

            const user = result.rows[0];

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'CPF ou senha inválidos' });
            }

            res.json({ message: 'Login bem-sucedido', user: { cpf: user.cpf } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    register: async (req, res) => {
        const { cpf, data_nascimento, password } = req.body;

        try {
            const existingUser = await loginModel.findByCpf(cpf);

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ error: 'Usuário já existe.' });
            }

            await loginModel.createUser(cpf, data_nascimento, password);
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    alterarSenha: async (req, res) => {
        // Implemente a lógica para alterar a senha aqui
    },
};

export default loginController;
