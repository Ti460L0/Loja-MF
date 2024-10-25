import React, { useState } from "react";
import ClienteForm from "./forms/cadastro/ClienteForm";
import VestidoForm from "./forms/cadastro/VestidosForm";
import AcessorioForm from "./forms/cadastro/AcessorioForm";

const Cadastro = () => {
  const [screen, setScreen] = useState("");
  const [clienteData, setClienteData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    cep: "",
    bairro: "",
  });

  const [modoCadastro, setModoCadastro] = useState(false);
  const [vestidoData, setVestidoData] = useState({
    codigo: "",
    modelo: "",
    tamanho: "",
    cor: "",
    preco: "",
    quantidade: "",
    url: "",
  });

  const [imagem, setImagem] = useState(null);

  const [acessorioData, setAcessorioData] = useState({
    tipo: "",
    tamanho: "",
    cor: "",
    status: "",
  });

  const handleChange = (e, setData, data) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImagemChange = (file) => {
    setImagem(file);
  };

  const handleSubmit = async (e, url, data) => {
    e.preventDefault();

    if (screen === "vestido" && imagem) {
      const s3Url = await enviarImagemS3(imagem, data.codigo);
      if (s3Url) {
        data.url = s3Url;
      }
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const result = await response.json();
      console.log("Sucesso:", result);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const enviarImagemS3 = async (imagem, codigo) => {
    // Renomeia o arquivo com base no código
    const novoNome = `${codigo}.${imagem.name.split(".").pop()}`;

    // Define a URL completa para o upload, incluindo o caminho "img/"
    const url = `https://bucked-lojamf.s3.us-east-2.amazonaws.com/img/${novoNome}`;

    const options = {
      method: "PUT",
      body: imagem, // Envia o arquivo diretamente
      headers: {
        "Content-Type": imagem.type, // Define o tipo de conteúdo
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        // Retorna a URL pública da imagem
        return `https://bucked-lojamf.s3.us-east-2.amazonaws.com/img/${novoNome}`;
      } else {
        throw new Error("Erro ao enviar imagem para o S3");
      }
    } catch (error) {
      console.error("Erro ao enviar imagem para o S3:", error);
      return null;
    }
  };

  const renderForm = () => {
    if (screen === "cliente") {
      return (
        <ClienteForm
          handleChange={(e) => handleChange(e, setClienteData, clienteData)}
          formData={clienteData}
        />
      );
    } else if (screen === "vestido") {
      return (
        <VestidoForm
          handleChange={(e) => handleChange(e, setVestidoData, vestidoData)}
          formData={vestidoData}
          handleImagemChange={handleImagemChange}
          modoCadastro={modoCadastro}
        />
      );
    } else if (screen === "acessorio") {
      return (
        <AcessorioForm
          handleChange={(e) => handleChange(e, setAcessorioData, acessorioData)}
          formData={acessorioData}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-lightBrown shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p
        className="text-4xl font-bold mb-4 text-white"
        style={{ display: screen ? "none" : "block" }}
      >
        Escolha uma opção:
      </p>
      <div className="flex justify-center gap-4 m-2">
        <button
          className=" bg-gold hover:bg-lightGold text-white font-bold py-2 px-4 rounded"
          onClick={() => setScreen("cliente")}
        >
          Cadastrar cliente
        </button>
        <button
          className=" bg-gold hover:bg-lightGold text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setScreen("vestido");
            setModoCadastro(true);
          }}
        >
          Cadastrar vestido
        </button>
        <button
          className=" bg-gold hover:bg-lightGold text-white font-bold py-2 px-4 rounded"
          onClick={() => setScreen("acessorio")}
        >
          Cadastrar acessório
        </button>
      </div>
      <div>{renderForm()}</div>
      {screen && (
        <form
          id="formSubmit"
          onSubmit={(e) => {
            if (screen === "cliente") {
              handleSubmit(
                e,
                "https://vps55477.publiccloud.com.br/api/cl/ca",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
                clienteData
              );
            } else if (screen === "vestido") {
              handleSubmit(
                e,
                "https://vps55477.publiccloud.com.br/api/ve/ca",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
                vestidoData
              );
            } else if (screen === "acessorio") {
              handleSubmit(
                e,
                "https://vps55477.publiccloud.com.br/api/ac/ca",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
                acessorioData
              );
            }
          }}
        >
          <div className="flex flex-row gap-4">
            <button
              className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Enviar
            </button>
            <button
              className="bg-yellow-500 text-black font-bold p-4 w-full"
              type="reset"
            >
              Limpar formulário
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Cadastro;
