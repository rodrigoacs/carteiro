document.getElementById('sendRequest').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
  
    try {
      const result = await window.api.makeRequest({ url, method });
      let message = `Status: ${result.status}\nTempo de Resposta: ${result.time}ms\n\n`;
      if (result.error) {
        message += `Erro: ${JSON.stringify(result.data, null, 2)}`;
      } else {
        message += JSON.stringify(result.data, null, 2);
      }
      document.getElementById('response').textContent = message;
    } catch (error) {
      console.error('Request failed:', error);
      document.getElementById('response').textContent = 'Falha na requisição: ' + error.message;
    }
  });
  