// src/components/editarUsuario/EditarUsuario.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditarUsuario.css'; // Vamos criar este arquivo CSS em breve

const EditarUsuario = () => {
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Adicione estados para outros campos que você permite editar (ex: nomeCompleto, telefone)
  // const [nomeCompleto, setNomeCompleto] = useState('');
  // const [telefone, setTelefone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogado");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsuarioAtual(parsedUser);
        setEmail(parsedUser.emailUsuario || ''); // Preenche o campo com o email atual
        setSenha(parsedUser.senhaUsuario || ''); // Preenche a senha atual (pode ser perigoso, melhor não pré-preencher em apps reais)
        // setNomeCompleto(parsedUser.nomeCompleto || '');
        // setTelefone(parsedUser.telefone || '');
      } catch (e) {
        console.error("Erro ao carregar dados do usuário para edição:", e);
        navigate("/login");
      }
    } else {
      navigate("/login"); // Redireciona se não houver usuário logado
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação básica
    if (!email || !senha) {
      alert("E-mail e senha são obrigatórios.");
      return;
    }

    // Cria o objeto do usuário atualizado
    const usuarioAtualizado = {
      ...usuarioAtual, // Mantém outras propriedades que não estão sendo editadas
      emailUsuario: email,
      senhaUsuario: senha,
      // nomeCompleto: nomeCompleto, // Se você adicionar mais campos
      // telefone: telefone,
    };

    // 1. Atualiza a lista geral de usuários no localStorage
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosAtualizados = usuariosSalvos.map(u =>
      u.emailUsuario === usuarioAtual.emailUsuario // Encontra o usuário pelo email original
        ? usuarioAtualizado
        : u
    );
    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));

    // 2. Atualiza as informações do usuário logado no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

    alert("Suas informações foram atualizadas com sucesso!");
    navigate("/perfil"); // Redireciona de volta para a tela de perfil
  };

  if (!usuarioAtual) {
    return <div>Carregando formulário de edição...</div>;
  }

  return (
    <div className="editar-usuario-container">
      <h1>Editar suas informações</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password" // Use type="password" para senhas
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {/* Adicione inputs para outros campos que você permite editar */}
        {/*
        <div>
          <label htmlFor="nomeCompleto">Nome Completo:</label>
          <input
            type="text"
            id="nomeCompleto"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        */}
        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={() => navigate("/perfil")}>Cancelar</button> {/* Botão de Cancelar */}
      </form>
    </div>
  );
};

export default EditarUsuario;