import { useState } from "react";
import "./CadastroAnimais.css";

const CadastroAnimais = () => {
  const [nomeAnimal, setNomeAnimal] = useState("");
  const [idadeAnimal, setIdadeAnimal] = useState("");
  const [racaAnimal, setRacaAnimal] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nomeAnimal || !idadeAnimal || !racaAnimal || !imagem) {
      alert("Preencha todos os campos e selecione uma imagem.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const novoAnimal = {
        nome: nomeAnimal,
        idade: idadeAnimal,
        raca: racaAnimal,
        imagemBase64: reader.result,
      };

      const animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];
      animaisSalvos.push(novoAnimal);
      localStorage.setItem("animais", JSON.stringify(animaisSalvos));

      alert("Animal cadastrado com sucesso!");

      // Limpa o formulário
      setNomeAnimal("");
      setIdadeAnimal("");
      setRacaAnimal("");
      setImagem(null);
      setPreview(null);
    };

    reader.readAsDataURL(imagem);
  };

  return (
    <>
      <div className="container"></div>

      <form onSubmit={handleSubmit}>
        <h1>Cadastre um animal</h1>

        <div>
          <input
            type="text"
            placeholder="Nome do animal"
            value={nomeAnimal}
            onChange={(e) => setNomeAnimal(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Insira a idade dele(a)"
            value={idadeAnimal}
            onChange={(e) => setIdadeAnimal(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Insira qual a raça dele"
            value={racaAnimal}
            onChange={(e) => setRacaAnimal(e.target.value)}
          />
        </div>

        <div>
          <input type="file" accept="image/*" onChange={handleImagemChange} />
        </div>

        {preview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={preview}
              alt="Prévia do animal"
              style={{ width: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit">Cadastrar o bicho</button>
      </form>
    </>
  );
};

export default CadastroAnimais;
