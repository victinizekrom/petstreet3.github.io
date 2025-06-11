// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const storedUser = localStorage.getItem("usuarioLogado");
  let isAuthenticated = false; // Por padrão, o usuário não está autenticado

  if (storedUser) {
    try {
      const userObject = JSON.parse(storedUser);
      // Verifica se o objeto parseado não é nulo e não é um objeto vazio
      // Um objeto vazio '{}' ainda é truthy, mas para autenticação pode não ser suficiente
      isAuthenticated = userObject !== null && Object.keys(userObject).length > 0;
      // OU, se você tiver uma propriedade específica no seu objeto de usuário que indica login:
      // isAuthenticated = userObject !== null && userObject.emailUsuario !== undefined;
    } catch (e) {
      // Se houver um erro ao parsear (o que não deveria acontecer se você sempre salvar JSON válido),
      // significa que o storedUser não é um JSON válido.
      console.error("Erro ao parsear usuarioLogado do localStorage:", e);
      isAuthenticated = false; // Considera como não autenticado em caso de erro
    }
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;