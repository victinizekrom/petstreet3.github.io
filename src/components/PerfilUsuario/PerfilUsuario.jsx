// src/components/PerfilUsuario/PerfilUsuario.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilUsuario.css'; // Certifique-se de que este arquivo CSS existe na mesma pasta

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega as informações do usuário logado do localStorage
    const storedUser = localStorage.getItem("usuarioLogado");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsuario(parsedUser);
        console.log("Usuário carregado no Perfil:", parsedUser); // Para depuração
      } catch (e) {
        console.error("Erro ao parsear dados do usuário logado:", e);
        // Se houver um erro, redireciona para o login, pois os dados estão corrompidos
        navigate("/login");
      }
    } else {
      // Se não houver usuário logado, redireciona para a página de login
      navigate("/login");
    }

    // Adiciona um listener para o evento 'storage' para reagir a mudanças no localStorage
    // Isso é útil se o usuário for editado em outra aba ou em outro componente
    const handleStorageChange = () => {
        checkLoginStatus(); // Reutiliza a função de verificação
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };

  }, [navigate]); // Adiciona navigate como dependência para evitar warnings

  const handleAlterarInformacoes = () => {
    // Navega para a tela de edição de informações
    navigate("/editar-perfil"); // Esta rota deve estar configurada em App.jsx
  };

  if (!usuario) {
    // Enquanto carrega ou se não houver usuário, você pode exibir um loading ou nada
    return <div>Carregando informações do usuário...</div>;
  }

  return (
    <div className="perfil-usuario-container">
      {/* Exibe uma mensagem de boas-vindas com o nome ou email do usuário */}
      <h1>Bem-vindo(a), {usuario.nomeUsuario || usuario.emailUsuario}!</h1>

      <div className="informacoes-cadastro">
        <h2>Suas Informações:</h2>
        <p><strong>Nome:</strong> {usuario.nomeUsuario}</p>
        <p><strong>E-mail:</strong> {usuario.emailUsuario}</p>
        {/*
          ATENÇÃO: Exibir a senha, mesmo que mascarada, pode ser considerado uma má prática de segurança em alguns contextos.
          Em um aplicativo real, geralmente você não exibiria a senha aqui, mas talvez uma opção para redefini-la.
        */}
        <p><strong>Senha:</strong> {'*'.repeat(usuario.senhaUsuario ? usuario.senhaUsuario.length : 0)}</p>
        <p><strong>Endereço:</strong> {usuario.enderecoUsuario}</p>
        <p><strong>Cidade:</strong> {usuario.cidade}</p>
        <p><strong>Estado:</strong> {usuario.estado}</p>
      </div>

      <button className="btn-alterar-info" onClick={handleAlterarInformacoes}>
        Alterar suas informações
      </button>
    </div>
  );
};

export default PerfilUsuario;