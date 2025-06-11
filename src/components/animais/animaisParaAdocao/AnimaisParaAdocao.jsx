import React, { useEffect, useState } from "react";
import "./AnimaisParaAdocao.css";

const AnimaisParaAdocao = () => {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("animais")) || [];
    setAnimais(dados);
    console.log("Animais carregados:", dados); // Isso ajuda a testar se os dados chegaram
  }, []);

  return (
    <div className="animais-container">
      <h2>Animais para Adoção</h2>
      {animais.length === 0 ? (
        <p>Nenhum animal disponível no momento.</p>
      ) : (
        <div className="lista-animais">
          {animais.map((animal, index) => (
            <div key={index} className="card-animal">
              {animal.imagemBase64 && (
                <img
                  src={animal.imagemBase64}
                  alt={`Foto de ${animal.nome}`}
                  className="foto-animal"
                />
              )}
              <h3>{animal.nome}</h3>
              <p><strong>Raça:</strong> {animal.raca}</p>
              <p><strong>Idade:</strong> {animal.idade}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimaisParaAdocao;

