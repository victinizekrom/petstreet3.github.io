// src/App.jsx
import { Routes, Route } from "react-router-dom";
// Ajuste para PascalCase em todas as importações de componentes que seguem essa convenção
import Cadastroform from "./components/CadastroUsuario/Cadastroform"; // Ajustado: Pasta e arquivo
import Login from "./components/Login/Login"; // Já estava ok
import CadastroAnimais from "./components/animais/CadastroAnimais/CadastroAnimais"; // Ajustado: Arquivo
import AnimaisParaAdocao from "./components/animais/animaisParaAdocao/AnimaisParaAdocao"; // Ajustado: Arquivo
import Navbar from "./navbar/navbar"; // Já estava ok
import PrivateRoute from "./components/PrivateRoute"; // Já estava ok

// ESTAS SÃO AS LINHAS MAIS IMPORTANTES PARA CORRIGIR O ERRO ATUAL:
import PerfilUsuario from "./components/PerfilUsuario/PerfilUsuario"; // <-- CORRIGIDO: Pasta e arquivo com 'P' maiúsculo
import EditarUsuario from "./components/EditarUsuario/EditarUsuario"; // <-- CORRIGIDO: Pasta e arquivo com 'E' maiúsculo


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-de-usuario" element={<Cadastroform />} />

        {/* Rotas Protegidas */}
        <Route
          path="/cadastro-de-animais"
          element={
            <PrivateRoute>
              <CadastroAnimais />
            </PrivateRoute>
          }
        />
        <Route path="/animais-para-adocao" element={<AnimaisParaAdocao />} />

        {/* Nova Rota para o Perfil do Usuário */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <PerfilUsuario />
            </PrivateRoute>
          }
        />

        {/* Nova Rota para a Edição de Perfil */}
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <EditarUsuario />
            </PrivateRoute>
          }
        />

        {/* Adicione uma rota para a página inicial ou um fallback se quiser */}
        <Route path="/" element={
          <PrivateRoute>
            {/* Escolha o que exibir na raiz, talvez o perfil ou animais para adoção */}
            <AnimaisParaAdocao />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;