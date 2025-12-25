import { useState } from "react";
import "./style.css"

export default function App() {
  const [valor, setValor] = useState("");
  const [entrada, setEntrada] = useState("");
  const [taxa, setTaxa] = useState("");
  const [prazo, setPrazo] = useState("");
  const [aluguel, setAluguel] = useState("");
  const [resultado, setResultado] = useState(null);

  function calcular() {
    const v = parseFloat(valor);
    const e = parseFloat(entrada);
    const t = parseFloat(taxa) / 100 / 12; // taxa mensal
    const p = parseInt(prazo); // em meses
    const a = parseFloat(aluguel);

    if (!v || !e || !t || !p) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const financiamento = v - e;
    const prestacao = financiamento * (t * Math.pow(1 + t, p)) / (Math.pow(1 + t, p) - 1);
    const rentabilidade = ((a * 12) / v) * 100;

    setResultado({
      financiamento: financiamento.toFixed(2),
      prestacao: prestacao.toFixed(2),
      rentabilidade: rentabilidade.toFixed(2),
    });
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Calculadora Imobiliária</h1>

      <input
        placeholder="Valor do imóvel (R$)"
        value={valor}
        onChange={e => setValor(e.target.value)}
        type="number"
        style={{ margin: "5px", width: "100%" }}
      />
      <input
        placeholder="Entrada (R$)"
        value={entrada}
        onChange={e => setEntrada(e.target.value)}
        type="number"
        style={{ margin: "5px", width: "100%" }}
      />
      <input
        placeholder="Taxa de juros anual (%)"
        value={taxa}
        onChange={e => setTaxa(e.target.value)}
        type="number"
        style={{ margin: "5px", width: "100%" }}
      />
      <input
        placeholder="Prazo (meses)"
        value={prazo}
        onChange={e => setPrazo(e.target.value)}
        type="number"
        style={{ margin: "5px", width: "100%" }}
      />
      <input
        placeholder="Aluguel estimado (R$)"
        value={aluguel}
        onChange={e => setAluguel(e.target.value)}
        type="number"
        style={{ margin: "5px", width: "100%" }}
      />

      <button onClick={calcular} style={{ margin: "10px", padding: "10px 20px" }}>Calcular</button>

      {resultado && (
        <div style={{ marginTop: "20px", textAlign: "left", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <p><strong>Financiamento:</strong> R$ {resultado.financiamento}</p>
          <p><strong>Prestação mensal:</strong> R$ {resultado.prestacao}</p>
          <p><strong>Rentabilidade anual (aluguel):</strong> {resultado.rentabilidade}%</p>
        </div>
      )}
    </div>
  );
}
