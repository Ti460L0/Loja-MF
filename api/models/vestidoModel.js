// modelo, tamanho, cor, status, valor, codigo
import db from "../config/db.js";

const vestidoModel = {
  findAll: () => db.query("SELECT * FROM vestidos"),
  findById: (id) =>
    db.query("SELECT * FROM vestidos WHERE vestido_id = $1", [id]),
  findByCodigo: (codigo) =>
    db.query("SELECT * FROM vestidos WHERE codigo ILIKE $1", [`%${codigo}%`]),
  findByModelo: (modelo) =>
    db.query("SELECT * FROM vestidos WHERE modelo ILIKE $1", [`%${modelo}%`]),
  create: (data) => {
    const { codigo, modelo, cor, tamanho, valor, status, url } = data;
    return db.query(
      "INSERT INTO vestidos (codigo, modelo, cor, tamanho, valor, status, url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [codigo, modelo, cor, tamanho, valor, status, url]
    );
  },
  update: (data) => {
    const { modelo, cor, tamanho, valor, status, url, vestido_id } = data;
    return db.query(
      "UPDATE vestidos SET modelo = $1, cor = $2, tamanho = $3, valor = $4, status = $5, url = $6 WHERE vestido_id = $7",
      [modelo, cor, tamanho, valor, status, url, vestido_id]
    );
  },
  delete: (id) => db.query("DELETE FROM vestidos WHERE vestido_id = $1", [id]),
  deleteByCodigo: (codigo) =>
    db.query("DELETE FROM vestidos WHERE codigo = $1", [codigo]),
};

export default vestidoModel;
