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
      const rightColumnX = 130; // Adjust this value based on your page width and margins

      // Add text to the left column
      doc.text(`Cliente: ${formData.nome}`, leftColumnX, 30);
      doc.text(`CPF: ${formData.cpf}`, leftColumnX, 40);
      doc.text(`E-mail: ${formData.email}`, leftColumnX, 50);
      doc.text(`Telefone: ${formData.telefone}`, leftColumnX, 60);
      doc.text(`Data de Retirada: ${formData.data_retirada}`, leftColumnX, 70);
      doc.text(
        `Data de Devolução: ${formData.data_devolucao}`,
        leftColumnX,
        80
      );

      // Add text to the right column
      doc.text(`Vestido: ${formData.modelo}`, rightColumnX, 30);
      doc.text(`Acessório: ${formData.tipo}`, rightColumnX, 40);
      doc.text(`Data de Prova: ${formData.data_prova}`, rightColumnX, 50);
      doc.text(`Notas: ${formData.notas}`, rightColumnX, 60);

      // Adicionar um termo de locação
      doc.setFontSize(12);
      doc.text("Termo de Locação:", 20, 120);
      const termo1 = "Responsabilidade por Danos: Em caso de qualquer dano causado ao(s) item(ns) locado(s), seja ele parcial ou total, comprometo-me a arcar integralmente com as despesas de reparo ou reposição dos mesmos, conforme avaliação realizada pela empresa locadora. "
      const termo2 = "Multa por Atraso na Devolução: Caso ocorra atraso na devolução do(s) item(ns) locado(s), concordo em pagar uma multa correspondente a 10% do valor total da locação, por dia de atraso, até a efetiva devolução dos bens. "
      const termo3 = "Condições de Uso: Estou ciente de que o(s) item(ns) locado(s) deve(m) ser devolvido(s) nas mesmas condições em que foram entregues, salvo desgaste natural decorrente do uso correto. "
      const termo4 = "Por estar de pleno acordo com os termos acima, assino o presente documento.`;"
      let y = 130;
      [termo1, termo2, termo3, termo4].forEach((termo) => {
        const splitTermo = doc.splitTextToSize(termo, 160);
        doc.text(splitTermo, 20, y);
        y += 20;
      });

      // Adiciona área para assinatura
      doc.setFontSize(12);
      doc.text("Assinatura do Cliente:", 20, 210);
      doc.line(20, 225, 180, 225); // Linha para assinatura

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
    <div className="w-full max-w-7xl mx-auto bg-lightBrown p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Selecione as opções:
      </h1>
      <hr className="border-1 border-yellow-900 m-4" />
      <div className="grid grid-rows-2 gap-4 w-full  rounded-t">
        {/* Campos de seleção */}
        <div className="grid grid-cols-3 w-full justify-center gap-4 rounded-lg">
          <div className="col-start-1 col-end-2 w-full p-4">
            <ClienteConsulta multiple={false} onSelect={handleClienteSelect} />
            {modoCadastro && (
              <a href="/Cadastrar" className="text-lightGold">
                Cadastrar novo cliente
              </a>
            )}
          </div>
          <div className="p-4">
            <VestidoConsulta multiple={false} onSelect={handleVestidoSelect} />
          </div>
          <div className="p-4">
            <AcessorioConsulta
              multiple={false}
              onSelect={handleAcessorioSelect}
            />
          </div>
        </div>
        <div className="row-start-2 gap-2 rounded-b">
          <form onSubmit={handleSubmitLocacao}>
            {/* Campos de data */}
            <h1 className="text-4xl font-bold mb-4 text-white">
              Selecione as datas abaixo:
            </h1>
            <hr className="border-1 border-yellow-900 m-4" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col w-full px-2">
                <div className="flex flex-col w-full px-28">
                  <label
                    className="text-center mb-2 text-white"
                    htmlFor="data_retirada"
                  >
                    Data de retirada
                  </label>
                  <InputMask
                    mask="99/99/9999"
                    className="shadow appearance-none border border-lightGold rounded w-full py-2 px-3 text-beige bg-black"
                    type="text"
                    id="data_retirada"
                    name="data_retirada"
                    value={formData.data_retirada}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full px-28">
                  <label
                    className="text-center mb-2 text-white"
                    htmlFor="data_devolucao"
                  >
                    Data de devolução
                  </label>
                  <InputMask
                    mask="99/99/9999"
                    className="shadow appearance-none border border-lightGold rounded w-full py-2 px-3 text-beige bg-black"
                    type="text"
                    id="data_devolucao"
                    name="data_devolucao"
                    value={formData.data_devolucao}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full px-28 mt-2">
                  <label
                    className="text-center mb-2 text-white"
                    htmlFor="data_prova"
                  >
                    Data de prova
                  </label>
                  <InputMask
                    mask="99/99/9999"
                    className="shadow appearance-none border border-lightGold rounded w-full py-2 px-3 text-beige bg-black"
                    type="text"
                    id="data_prova"
                    name="data_prova"
                    value={formData.data_prova}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full h-full px-20">
                <label className="text-left mb-2 text-white" htmlFor="notas">
                  Notas:
                </label>
                <textarea
                  className="shadow appearance-none border border-lightGold rounded w-full py-2 px-3 text-beige bg-black"
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows="7"
                  maxLength="500"
                  placeholder="Preencha com informações adicionais se houver."
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 px-8 py-4">
              <button
                className="h-20 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Registrar locação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
