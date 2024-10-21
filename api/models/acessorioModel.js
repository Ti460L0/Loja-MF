import db from "../config/db.js";

const acessorioModel = {
    findAll: () => db.query("SELECT * FROM acessorios"),
    findById: (id) => db.query("SELECT * FROM acessorios WHERE acessorio_id = $1", [id]),
    findByTipo: (tipo) => db.query("SELECT * FROM acessorios WHERE tipo ILIKE $1", [`%${tipo}%`]),

    create: (data) => {
        const { tipo, tamanho, status, cor } = data;
        return db.query(
            "INSERT INTO acessorios (tipo, tamanho, status, cor) VALUES ($1, $2, $3, $4) RETURNING *",
            [tipo, tamanho, status, cor]
        );
    },
    update: (data) => {
        const { tipo, tamanho, status, cor, acessorio_id } = data;
        return db.query(
            "UPDATE acessorios SET tipo = $1, tamanho = $2, status = $3, cor = $4 WHERE acessorio_id = $5 RETURNING *",
            [tipo, tamanho, status, cor, acessorio_id]
        );
    },

    delete: (id) => db.query("DELETE FROM acessorios WHERE acessorio_id = $1", [id]),
    deleteByTipo: (tipo) => db.query("DELETE FROM acessorios WHERE tipo = $1", [tipo]),
};

export default acessorioModel;
