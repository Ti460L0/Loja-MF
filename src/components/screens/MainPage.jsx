import React, { useState } from "react";
import VestidoConsulta from "./forms/consulta/VestidoConsulta";
import ClienteConsulta from "./forms/consulta/ClienteConsulta";
import AcessorioConsulta from "./forms/consulta/AcessorioConsulta";
import InputMask from "react-input-mask";
import jsPDF from "jspdf";

const MainPage = () => {
  const [vestidoSelecionado, setVestidoSelecionado] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [acessorioSelecionado, setAcessorioSelecionado] = useState(null);
  const [formData, setFormData] = useState({
    vestido_id: "",
    cliente_id: "",
    acessorio_id: "",
    data_retirada: "",
    data_devolucao: "",
    data_prova: "",
    notas: "",
  });
  const [modoCadastro, setModoCadastro] = useState(false);

  const handleVestidoSelect = (vestido) => {
    if (vestido) {
      setVestidoSelecionado(vestido);
      setFormData((prevFormData) => ({
        ...prevFormData,
        vestido_id: vestido.vestido_id,
        modelo: vestido.modelo,
      }));
    } else {
      setVestidoSelecionado(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        vestido_id: "",
        modelo: "",
      }));
    }
  };

  const handleAcessorioSelect = (acessorio) => {
    if (acessorio) {
      setAcessorioSelecionado(acessorio);
      setFormData((prevFormData) => ({
        ...prevFormData,
        acessorio_id: acessorio.acessorio_id,
        tipo: acessorio.tipo,
      }));
    } else {
      setAcessorioSelecionado(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        acessorio_id: "",
        tipo: "",
      }));
    }
  };

  const handleClienteSelect = (cliente) => {
    if (cliente) {
      setClienteSelecionado(cliente);
      setFormData((prevFormData) => ({
        ...prevFormData,
        cliente_id: cliente.cliente_id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
      }));
      if (!cliente.cliente_id) setModoCadastro(true);
    } else {
      setClienteSelecionado(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        cliente_id: "",
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
      }));
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitLocacao = async (event) => {
    event.preventDefault();
    try {
      if (!formData.vestido_id) {
        alert("Selecione um vestido");
        throw new Error("Selecione um vestido");
      }
      if (!formData.cliente_id) {
        alert("Selecione um cliente");
        throw new Error("Selecione um cliente");
      }
      if (!formData.data_retirada) {
        alert("Selecione uma data de retirada");
        throw new Error("Selecione uma data de retirada");
      }
      if (!formData.data_devolucao) {
        alert("Selecione uma data de devolução");
        throw new Error("Selecione uma data de devolução");
      }

      const response = await fetch(
        "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/lo/ca",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao cadastrar locação");
      }
      const data = await response.json();
      console.log("Locação cadastrada:", data);

      // Gera o PDF após o sucesso do envio
      const doc = new jsPDF();
      // Titulo
      doc.setFontSize(18);
      doc.text("Relatório de Locação", 20, 20);

      // Adiciona os dados da locação
      doc.setFontSize(12);

      // Define column positions
      const leftColumnX = 20;
      const rightColumnX = 150; // Adjust this value based on your page width and margins

      // Add text to the left column
      doc.text(`Cliente: ${formData.nome}`, leftColumnX, 30);
      doc.text(`CPF: ${formData.cpf}`, leftColumnX, 40);
      doc.text(`E-mail: ${formData.email}`, leftColumnX, 50);
      doc.text(`Telefone: ${formData.telefone}`, leftColumnX, 60);
      doc.text(`Data de Retirada: ${formData.data_retirada}`, leftColumnX, 70);
      doc.text(`Data de Devolução: ${formData.data_devolucao}`,leftColumnX,80);

      // Add text to the right column
      doc.text(`Vestido: ${formData.modelo}`, rightColumnX, 30);
      doc.text(`Acessório: ${formData.tipo}`, rightColumnX, 40);
      doc.text(`Data de Prova: ${formData.data_prova}`, rightColumnX, 50);
      doc.text(`Notas: ${formData.notas}`, rightColumnX, 60);
      // Adiciona área para assinatura
      doc.setFontSize(12);
      doc.text("Assinatura do Cliente:", 20, 140);
      doc.line(20, 155, 180, 155); // Linha para assinatura

      // Salva o PDF
      doc.save(`relatorio_locacao_${formData.cliente_id}.pdf`);

      // Limpa o formulário e atualiza a página
      setFormData({
        vestido_id: "",
        cliente_id: "",
        acessorio_id: "",
        data_retirada: "",
        data_devolucao: "",
        data_prova: "",
        notas: "",
      });
      setVestidoSelecionado(null);
      setClienteSelecionado(null);
      setAcessorioSelecionado(null);

      // Refresh na página
      // window.location.reload();
    } catch (error) {
      console.error("Erro ao registrar locação:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-4xl font-bold mb-4">Selecione as opções:</h1>
      <div className="flex flex-col w-full bg-slate-700 rounded-t">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 p-4">
            <ClienteConsulta multiple={false} onSelect={handleClienteSelect} />
            {modoCadastro && <a href="/Cadastrar">Cadastrar novo cliente</a>}
          </div>
          <div className="flex flex-col w-1/2 p-4">
            <VestidoConsulta multiple={false} onSelect={handleVestidoSelect} />
          </div>
          <div className="flex flex-col w-1/2 p-4">
            <AcessorioConsulta
              multiple={false}
              onSelect={handleAcessorioSelect}
            />
          </div>
        </div>
        <div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => console.log(formData)}
          >
            Confirmar escolha
          </button>
        </div>
        <div className="flex flex-row justify-end gap-2 bg-slate-700 rounded-b p-4">
          <form onSubmit={handleSubmitLocacao}>
            <label className="text-left mb-2" htmlFor="data_retirada">
              Data de retirada
            </label>
            <InputMask
              mask="99/99/9999"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200"
              type="text"
              id="data_retirada"
              name="data_retirada"
              value={formData.data_retirada}
              onChange={handleChange}
            />
            <label className="text-left mb-2" htmlFor="data_devolucao">
              Data de devolução
            </label>
            <InputMask
              mask="99/99/9999"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200"
              type="text"
              id="data_devolucao"
              name="data_devolucao"
              value={formData.data_devolucao}
              onChange={handleChange}
            />
            <label className="text-left mb-2" htmlFor="data_prova">
              Data de prova
            </label>
            <InputMask
              mask="99/99/9999"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200"
              type="text"
              id="data_prova"
              name="data_prova"
              value={formData.data_prova}
              onChange={handleChange}
            />
            <label className="text-left mb-2" htmlFor="notas">
              Observações
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200"
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
            />
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Registrar locação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
