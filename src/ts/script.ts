const inputApiKey = document.getElementById('input-api-key') as HTMLInputElement
const opcoesJogo = document.getElementById('opcoes-jogo') as HTMLSelectElement
const campoPrompt = document.getElementById('campo-prompt') as HTMLInputElement
const botaoPerguntar = document.getElementById('botao-perguntar') as HTMLButtonElement
const form = document.getElementById('form') as HTMLFormElement
const respostaIa = document.getElementById('respostaIa') as HTMLDivElement

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const apiKey = inputApiKey.value
    const jogoEscolhido = opcoesJogo.value
    const prompt = campoPrompt.value

    botaoPerguntar.disabled = true

    // try {
        
    // } catch (error) {
    //     console.log('Erro:', error)
    // } finally {
    //     botaoPerguntar.disabled = false
    // }
})