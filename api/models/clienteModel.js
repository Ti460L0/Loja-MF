import db from "../config/db.js";

const clienteModel = {
  findAll: () => db.query("SELECT * FROM clientes"),
  findByNome: (nome) =>
    db.query("SELECT * FROM clientes WHERE nome ILIKE $1", [`%${nome}%`]),
  findByCpf: (cpf) =>
    db.query("SELECT * FROM clientes WHERE cpf ILIKE $1", [`%${cpf}%`]),
  findById: (id) =>
    db.query("SELECT * FROM clientes WHERE cliente_id = $1", [id]),
  create: (data) => {
    const { nome, cpf, email, telefone, endereco, bairro, cep } = data;
    return db.query(
      "INSERT INTO clientes (nome, cpf, email, telefone, endereco, bairro, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nome, cpf, email, telefone, endereco, bairro, cep]
    );
  },

  update: (data) => {
    const { cliente_id, cpf, nome, email, telefone, endereco, bairro, cep } =
      data;
    return db.query(
      "UPDATE clientes SET cpf = $1, nome = $2, email = $3, telefone = $4, endereco = $5, bairro = $6, cep = $7 WHERE cliente_id = $8",
      [cpf, nome, email, telefone, endereco, bairro, cep, cliente_id] 
    );
  },



  delete: (id) => db.query("DELETE FROM clientes WHERE cliente_id = $1", [id]),
};
export default clienteModel;
