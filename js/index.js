import { searchByCep } from "./services.js";

const cepInput = document.querySelector("[data-cep-input]");
const list = document.querySelector("[data-list]");

const searchBtn = document.querySelector("[data-search-btn]");
const clearBtn = document.querySelector("[data-clear-btn]");
const copyBtn = document.querySelector("[data-copy-btn]");

const tooltip = document.querySelector("[data-tooltip]");

// a variable to return a text when click on "copy to clipboard"
let clipBoardText;

async function fecthCep(cep) {
  const response = await searchByCep(cep);
  if (!response.erro) {
    renderList(response);
    mountClipBoard(response);
  } else {
    list.innerHTML = `
    <div class="flex__center--center flex__column gap__0-5">    
    <p>A pesquisa retornou um erro verifique o CEP e tente novamente.</p>
  </div>`;
  }
}

function renderList(endereco) {
  list.innerHTML = `
  <ul class="ul" >
      <li class="ul">
        <h4>logradouro</h4>
        <p>${endereco.logradouro}</p>
      </li>
      <li>
        <h4>complemento</h4>
        <p>${endereco.complemento || "-"}</p>
      </li>
      <li>
        <h4>bairro</h4>
        <p>${endereco.bairro}</p>
      </li>
      <li>
        <h4>localidade</h4>
        <p>${endereco.localidade}</p>
      </li>
      <li>
        <h4>uf</h4>
        <p>${endereco.uf}</p>
      </li>
  </ul>
        `;
}

function mountClipBoard(endereco) {
  clipBoardText = `
  cep: ${endereco.cep}
  logradouro: ${endereco.logradouro}
  complemento: ${endereco.complemento || "-"}
  bairro: ${endereco.bairro}
  localidade: ${endereco.localidade}
  uf: ${endereco.uf}
  `;
}

function clearInput() {
  cepInput.value = "";
}

async function addToClipBoard() {
  if (clipBoardText) {
    navigator.clipboard.writeText(clipBoardText);
    tooltip.style.visibility = "visible";
    setTimeout(() => {
      tooltip.style.visibility = "hidden";
    }, 2000);
  }
}

searchBtn.addEventListener("click", async () => {
  fecthCep(cepInput.value);
});
clearBtn.addEventListener("click", clearInput);
copyBtn.addEventListener("click", addToClipBoard);
