"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inputApiKey = document.getElementById('input-api-key');
const opcoesJogo = document.getElementById('opcoes-jogo');
const campoPrompt = document.getElementById('campo-prompt');
const botaoPerguntar = document.getElementById('botao-perguntar');
const form = document.getElementById('form');
const respostaIa = document.querySelector('.respostaIa');
function markdown(texto) {
    const converter = new showdown.Converter();
    return converter.makeHtml(texto);
}
const perguntarAI = (perguntas, jogo, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const model = 'gemini-2.5-flash';
    const URl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const pergunta = `
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

    Aqui está a pergunta do usuário: ${perguntas}
    `;
    const contents = [{
            role: "user",
            parts: [{
                    text: pergunta
                }]
        }];
    const tools = [{
            google_search: {}
        }];
    const response = yield fetch(URl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    });
    const dados = yield response.json();
    return dados.candidates[0].content.parts[0].text;
});
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const apiKey = inputApiKey.value;
    const jogoEscolhido = opcoesJogo.value;
    const prompt = campoPrompt.value;
    botaoPerguntar.disabled = true;
    try {
        const texto = yield perguntarAI(prompt, jogoEscolhido, apiKey);
        respostaIa.innerHTML = markdown(texto);
    }
    catch (error) {
        console.log('Erro:', error);
    }
    finally {
        botaoPerguntar.disabled = false;
    }
}));
