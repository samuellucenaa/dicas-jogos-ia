"use strict";
const inputApiKey = document.getElementById('input-api-key');
const opcoesJogo = document.getElementById('opcoes-jogo');
const campoPrompt = document.getElementById('campo-prompt');
const botaoPerguntar = document.getElementById('botao-perguntar');
const form = document.getElementById('form');
const respostaIa = document.getElementById('respostaIa');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const apiKey = inputApiKey.value;
    const jogoEscolhido = opcoesJogo.value;
    const prompt = campoPrompt.value;
    botaoPerguntar.disabled = true;
    // try {
    // } catch (error) {
    //     console.log('Erro:', error)
    // } finally {
    //     botaoPerguntar.disabled = false
    // }
});
