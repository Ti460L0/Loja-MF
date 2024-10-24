import React, { useState, useEffect } from "react";

const AcessorioConsulta = ({ multiple, onSelect }) => {
  const [acessorios, setAcessorios] = useState([]);
  const [acessorioSelecionado, setAcessorioSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcessorios = async () => {
      try {
        const response = await fetch(
          `https://vps55477.publiccloud.com.br/api/ac`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar acessorios");
        }
        const data = await response.json();
        setAcessorios(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    };

    fetchAcessorios();
  }, []);

  const handleSelect = (tipoAcessorio) => {
    const selectedAcessorio = acessorios.find((a) => a.tipo === tipoAcessorio);

    if (selectedAcessorio) {
      setAcessorioSelecionado(selectedAcessorio);
      onSelect(selectedAcessorio);
      console.log("Acessorio selecionado:", selectedAcessorio);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <label className="mb-2" htmlFor="acessorio-select">
        Escolha um acessório:
      </label>
      <input
        className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full"
        type="search"
        id="acessorio-select"
        onChange={(e) => handleSelect(e.target.value)}
        placeholder="Digite o tipo do acessório"
        list="acessorios"
      />
      <datalist id="acessorios">
        {acessorios.slice(0, 10).map((a) => (
          <option key={a.acessorio_id} value={a.tipo}>
            {a.tipo} - {a.status}
          </option>
        ))}
      </datalist>
      {acessorioSelecionado && (
        <div className="flex flex-col w-full items-center mx-auto bg-yellow-950 p-4 rounded-lg max-w-md shadow-lg shadow-black">
          <h2 className="text-xl text-nowrap font-bold tracking-tight text-yellow-800">
            Informações do Acessório
          </h2>
          <hr className="w-full my-4 border-b-2 border-yellow-800"></hr>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-sans text-slate-300">
              <strong className="font-bold">Tipo: </strong>
              {acessorioSelecionado.tipo}
            </p>
            <p className="text-lg font-sans text-slate-300">
              <strong className="font-bold">Tamanho: </strong>
              {acessorioSelecionado.tamanho}
            </p>
            <p className="text-lg font-sans text-slate-300">
              <strong className="font-bold">Cor: </strong>
              {acessorioSelecionado.cor}
            </p>
            <p className="text-lg font-sans text-slate-300">
              <strong className="font-bold">Status: </strong>
              {acessorioSelecionado.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcessorioConsulta;
