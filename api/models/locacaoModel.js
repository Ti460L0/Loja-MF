// data_retirada, data_devolucao, data_prova, cliente_id, vestido_id, acessorio_id, notas
import db from "../config/db.js";

const locacoesModel = {
  findAll: () => db.query("SELECT * FROM locacoes"),
  findById: (id) => db.query("SELECT * FROM locacoes WHERE locacao_id = $1", [id]),
  findByClienteId: (cliente_id) =>
    db.query("SELECT * FROM locacoes WHERE cliente_id = $1", [cliente_id]),
  findByVestidoId: (vestido_id) =>
    db.query("SELECT * FROM locacoes WHERE vestido_id = $1", [vestido_id]),
  create: (data) => {
    const {
      data_retirada,
      data_devolucao,
      data_prova,
      cliente_id,
      vestido_id,
      acessorio_id,
      notas,
    } = data;
    return db.query(
      "INSERT INTO locacoes (data_retirada, data_devolucao, data_prova, cliente_id, vestido_id, acessorio_id, notas) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        data_retirada,
        data_devolucao,
        data_prova,
        cliente_id,
        vestido_id,
        acessorio_id,
        notas,
      ]
    );
  },
  update: (data) => {
    const {
      data_retirada,
      data_devolucao,
      data_prova,
      cliente_id,
      vestido_id,
      acessorio_id,
      notas,
      locacao_id,
    } = data;
    return db.query(
      "UPDATE locacoes SET data_retirada = $1, data_devolucao = $2, data_prova = $3, cliente_id = $4, vestido_id = $5, acessorio_id = $6, notas = $7 WHERE locacao_id = $8",
      [
        data_retirada,
        data_devolucao,
        data_prova,
        cliente_id,
        vestido_id,
        acessorio_id,
        notas,
        locacao_id,
      ]
    );
  },
  delete: (id) => db.query("DELETE FROM locacoes WHERE locacao_id = $1", [id]),
};

export default locacoesModel;

