document.getElementById('sendRequest').addEventListener('click', async e => {
  e.target.disabled = true

  const url = document.getElementById('url').value
  const method = document.getElementById('method').value
  const authType = document.getElementById('authType').value
  let headers = {}
  document.querySelectorAll('.headerPair').forEach(headerPair => {
    const key = headerPair.querySelector('.headerKey').value
    const value = headerPair.querySelector('.headerValue').value
    if (key) headers[key] = value
  })

  let body = method === 'POST' ? document.getElementById('body').value : null
  let parsedBody = null

  if (body) {
    try {
      parsedBody = JSON.parse(body)
    } catch (error) {
      console.error('Erro ao analisar JSON:', error)
      document.getElementById('response').textContent = 'Erro ao analisar JSON: ' + error.message
      return
    }
  }

  if (authType === 'basic') {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const token = btoa(`${username}:${password}`)
    headers['Authorization'] = `Basic ${token}`
  }

  try {
    const result = await window.api.makeRequest({ url, method, data: parsedBody, headers })
    const requestStatus = `Status: ${result.status}\nTempo de Resposta: ${result.time}ms\n\n`
    let requestResponse = ''
    if (result.error) {
      requestResponse = `Erro: ${JSON.stringify(result.data, null, 2)}`
    } else {
      requestResponse = JSON.stringify(result.data, null, 2)
    }
    document.getElementById('response').textContent = requestResponse
    document.getElementById('requestStatus').textContent = requestStatus
    e.target.disabled = false
  } catch (error) {
    console.error('Falha na requisição:', error)
    document.getElementById('response').textContent = 'Falha na requisição: ' + error.message
    e.target.disabled = false
  }
})
