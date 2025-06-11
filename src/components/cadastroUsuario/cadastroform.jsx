import React, { useState } from "react";
import "./cadastro.css";

const Cadastroform = () => {
  const [nomeUsuario, setnomeUsuario] = useState("");
  const [emailUsuario, setemailUsuario] = useState("");
  const [senhaUsuario, setsenhaUsuario] = useState("");
  const [enderecoUsuario, setenderecoUsuario] = useState("");
  const [cidade, setcidade] = useState("");
  const [estado, setestado] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoUsuario = {
      nomeUsuario,
      emailUsuario,
      senhaUsuario,
      enderecoUsuario,
      cidade,
      estado
    };

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuariosSalvos.find(
      (u) => u.emailUsuario === emailUsuario
    );

    if (usuarioExistente) {
      alert("E-mail já cadastrado!");
      return;
    }

    usuariosSalvos.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="containerform">
      <form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <div>
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setnomeUsuario(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setemailUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setsenhaUsuario(e.target.value)}
          />
          <input
            type="text"
            placeholder="Coloque seu endereço"
            onChange={(e) => setenderecoUsuario(e.target.value)}
          />
          <input
            type="text"
            placeholder="Insira sua cidade"
            onChange={(e) => setcidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Insira seu estado"
            onChange={(e) => setestado(e.target.value)}
          />
          <button type="submit">Encerrar cadastro</button>
        </div>
      </form>
    </div>
  );
};

export default Cadastroform;

