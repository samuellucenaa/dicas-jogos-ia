const inputApiKey = document.getElementById('input-api-key') as HTMLInputElement
const opcoesJogo = document.getElementById('opcoes-jogo') as HTMLSelectElement
const campoPrompt = document.getElementById('campo-prompt') as HTMLInputElement
const botaoPerguntar = document.getElementById('botao-perguntar') as HTMLButtonElement
const form = document.getElementById('form') as HTMLFormElement
const respostaIa = document.querySelector('.respostaIa') as HTMLDivElement

declare const showdown: any

function markdown(texto: string): string {
    const converter: any  = new showdown.Converter()
    return converter.makeHtml(texto)
}

function gerarPrompt(jogo: string, pergunta: string): string {
    return `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${jogo}.

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas.

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
    - Considere a data atual ${new Date().toLocaleDateString()}.
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres.
    - Responda em markdown.
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

    ---------------------------------------

    Aqui está a pergunta do usuário: ${pergunta}
    `
}

const perguntarAI = async (pergunta: string, jogo:string, apiKey: string): Promise<string> => {
    const model: string = 'gemini-2.5-flash'
    const URl: string = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const contents  = [{
        role: "user",
        parts: [{text: gerarPrompt(jogo, pergunta)}]
    }]

    const tools = [{google_search: {}}]

    const response = await fetch(URl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })
    
    const dados = await response.json()

    if(!dados.candidates ||
        !dados.candidates[0]?.content?.parts[0]?.text){
        throw new Error('Resposta inesperada da API')
    }

    return dados.candidates[0].content.parts[0].text
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const apiKey: string = inputApiKey.value
    const jogoEscolhido: string = opcoesJogo.value
    const prompt: string = campoPrompt.value

    botaoPerguntar.disabled = true

    try {
      const texto: string = await perguntarAI(prompt, jogoEscolhido, apiKey)
      respostaIa.innerHTML = markdown(texto)
    } catch (error) {
        console.log('Erro:', error)
    } finally {
        botaoPerguntar.disabled = false
    }
})