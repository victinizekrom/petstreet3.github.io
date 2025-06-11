// src/components/Login/Login.jsx
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosSalvos.find(
      (u) => u.emailUsuario === email && u.senhaUsuario === senha
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado)); // Continua salvando o objeto
      alert("Login bem-sucedido!");
     navigate("/perfil"); // Certifique-se de que a rota /menu exista ou ajuste para a rota desejada
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  return (
    <>
      <div className="container"></div>

      <form onSubmit={handleSubmit}>
        <h1>Acessar o sistema</h1>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            lembre de mim
          </label>
          <a href="#">esqueceu a senha</a>
          <p>
            Não tem uma conta? <a href="/cadastro-de-usuario">Registrar</a>
          </p>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </>
  );
};

export default Login;