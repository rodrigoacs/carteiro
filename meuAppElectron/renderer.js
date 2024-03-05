document.getElementById('sendRequest').addEventListener('click', async () => {
  const url = document.getElementById('url').value;
  const method = document.getElementById('method').value;
  let body = method === 'POST' ? document.getElementById('body').value : null;
  let parsedBody = null;

  if (body) {
    try {
      parsedBody = JSON.parse(body);
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      document.getElementById('response').textContent = 'Erro ao analisar JSON: ' + error.message;
      return; 
    }
  }

  try {
    const result = await window.api.makeRequest({ url, method, data: parsedBody });
    let message = `Status: ${result.status}\nTempo de Resposta: ${result.time}ms\n\n`;
    if (result.error) {
      message += `Erro: ${JSON.stringify(result.data, null, 2)}`;
    } else {
      message += JSON.stringify(result.data, null, 2);
    }
    document.getElementById('response').textContent = message;
  } catch (error) {
    console.error('Falha na requisição:', error);
    document.getElementById('response').textContent = 'Falha na requisição: ' + error.message;
  }
});
