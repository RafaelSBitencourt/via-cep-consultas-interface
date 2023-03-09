const baseUrl = "https://viacep.com.br/ws";

export async function searchByCep(cep) {
  const response = await fetch(`${baseUrl}/${cep}/json`).then((res) =>
    res.json()
  );
  return response;
}
