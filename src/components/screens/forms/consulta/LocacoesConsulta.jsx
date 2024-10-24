import InputMask from "react-input-mask";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function LocacoesConsulta({ formData, refreshData }) {
  const {
    locacao_id,
    nome,
    modelo,
    tipo,
    data_retirada,
    data_devolucao,
    data_prova,
    notas,
  } = formData;

  const [isEditing, setIsEditing] = useState(false); // Novo estado para controle de edição
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState({
    data_retirada: formData.data_retirada,
    data_devolucao: formData.data_devolucao,
    data_prova: formData.data_prova,
    notas: formData.notas,
  });

  // 
  const gerarPDF = () => {
    const doc = new jsPDF();

    // Adiciona título
    doc.setFontSize(18);
    doc.text("Comprovante de Locação", 10, 10);

    // Adiciona os dados da locação
    doc.setFontSize(12);
    doc.text(`Nome: ${formData.nome}`, 10, 30);
    doc.text(`Data de Retirada: ${formData.data_retirada}`, 10, 40);
    doc.text(`Data de Devolução: ${formData.data_devolucao}`, 10, 50);
    doc.text(`Vestido: ${formData.modelo}`, 10, 70);
    doc.text(`Acessório: ${formData.tipo}`, 10, 80);

    // Adiciona o texto de confirmação da entrega
    doc.setFontSize(14);
    doc.text("Entrega realizada com sucesso.", 10, 100);

    // Salva o PDF
    doc.save(`comprovante_locacao_${formData.nome}.pdf`);
    
  };


  // Função para deletar locação (concluir entrega)
  const handleDeletar = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://vps55477.publiccloud.com.br/api/lo/de/${locacao_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao concluir a locação");
      }
      alert("Locação concluída e removida do sistema");
      refreshData(); // Atualiza a lista de locações
    } catch (error) {
      console.error(error);
      alert("Erro ao concluir a locação");
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar locação
  const handleSalvar = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://vps55477.publiccloud.com.br/api/lo/at/${locacao_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locacao_id: formData.locacao_id,
            data_retirada: editedData.data_retirada,
            data_devolucao: editedData.data_devolucao,
            data_prova: editedData.data_prova,
            notas: editedData.notas,
          }),
        }
      );
      console.log(editedData);
      refreshData(); // Atualiza a lista de locações
      if (!response.ok) {
        throw new Error("Erro ao salvar a locação");
      }
      alert("Locação salva com sucesso");
      setIsEditing(false); // Desativa o modo de edição após salvar
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar a locação");
    } finally {
      setLoading(false);
    }
  };

  // Função para ativar o modo de edição
  const handleEditar = () => {
    setIsEditing(true);
    setEditedData({
      locacao_id: formData.locacao_id || "",
      data_retirada: formData.data_retirada || "",
      data_devolucao: formData.data_devolucao || "",
      data_prova: formData.data_prova || "",
      notas: formData.notas || "",
    });
  };

  // Função para manipular mudanças nos campos editáveis
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Locações</h1>

      <div className="flex flex-row">
        <div className="flex flex-col w-full gap-2">
          <label className="text-sm font-medium">
            Cliente:
            <p className="text-lg ">{nome}</p>
          </label>
          <label className="text-sm font-medium">
            Modelo: <p className="text-lg">{modelo}</p>
          </label>
          <label className="text-sm font-medium">
            Tipo: <p className="text-lg">{tipo}</p>
          </label>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium" htmlFor="data-retirada">
              Data de Retirada
            </label>
            <InputMask
              className="px-2 py-1 w-32 text-center border-2 rounded-md"
              mask="99/99/9999"
              value={
                isEditing ? editedData.data_retirada : formData.data_retirada
              }
              onChange={handleInputChange}
              name="data_retirada" // Nome para identificar o campo
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium" htmlFor="data-devolucao">
              Data de Devolução
            </label>
            <InputMask
              className="px-2 py-1 w-32 text-center border-2 rounded-md"
              mask="99/99/9999"
              value={
                isEditing ? editedData.data_devolucao : formData.data_devolucao
              }
              onChange={handleInputChange}
              name="data_devolucao" // Nome para identificar o campo
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium" htmlFor="data-prova">
              Data de Prova
            </label>
            <InputMask
              className="px-2 py-1 w-32 text-center  border-2 rounded-md"
              mask="99/99/9999"
              value={isEditing ? editedData.data_prova : formData.data_prova}
              onChange={handleInputChange}
              name="data_prova" // Nome para identificar o campo
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium" htmlFor="nota">
          Notas:
        </label>
        <textarea
          className="w-full px-2 py-1 border-2 rounded-md
          focus:outline-none focus:border-slate-400
          focus:ring-1 focus:ring-slate-400
          focus:ring-offset-1 focus:ring-offset-slate-800
          resize-none"
          value={isEditing ? editedData.notas : formData.notas}
          onChange={handleInputChange}
          name="notas" // Nome para identificar o campo
          rows="2"
          cols="20"
          maxLength="200"
        />
      </div>

      <div className="flex flex-row space-x-2">
        {!isEditing && ( // Esconde o botão "Concluir" quando no modo de edição
          <button
            onClick={() => {
              gerarPDF();
              refreshData(); // Atualiza os dados se necessário
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Concluir
          </button>
        )}
        {isEditing && ( // Exibe o botão "Salvar" apenas no modo de edição
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleSalvar}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        )}
        {!isEditing && ( // Exibe o botão "Editar" apenas quando não está editando
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleEditar}
          >
            Editar
          </button>
        )}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleDeletar}>
          Deletar
        </button>
      </div>
    </div>
  );
}
