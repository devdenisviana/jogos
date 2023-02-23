// Palavras do jogo
const palavras = [
    "javascript",
    "html",
    "css",
    "python",
    "php",
    "java",
    "ruby",
    "swift",
    "kotlin",
    "typescript",
  ];
  
  // Escolhe uma palavra aleatória
  let palavra = palavras[Math.floor(Math.random() * palavras.length)];
  
  // Inicializa a palavra secreta com underscores
  let palavraSecreta = "";
  for (let i = 0; i < palavra.length; i++) {
    palavraSecreta += "_";
  }
  
  // Mostra a palavra secreta na tela
  const palavraElement = document.querySelector(".palavra");
  palavraElement.textContent = palavraSecreta;
  
  // Inicializa o array de letras
  const letras = [];
  
  // Mostra as letras na tela
  const letrasElement = document.querySelector(".letras");
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const span = document.createElement("span");
    span.textContent = letra;
    letrasElement.appendChild(span);
  
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.oninput = function() {
      if (this.value.length > 0) {
        this.value = this.value[0].toUpperCase();
      }
    };
    letrasElement.appendChild(input);
    letras.push({
      letra,
      input,
    });
  }
  
  // Verifica se a letra existe na palavra
  function verificarLetra(letra) {
    let acertou = false;
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === letra) {
        palavraSecreta = palavraSecreta.substr(0, i) + letra + palavraSecreta.substr(i + 1);
        acertou = true;
      }
    }
    palavraElement.textContent = palavraSecreta;
    return acertou;
  }
  
  // Verifica se o jogador ganhou o jogo
  function verificarVitoria() {
    return palavra === palavraSecreta;
  }
  
  // Verifica se o jogador perdeu o jogo
  function verificarDerrota() {
    return document.querySelectorAll(".cabeca, .corpo, .braco-esquerdo, .braco-direito, .perna-esquerda, .perna-direita").length >= 6;
  }
  
  // Atualiza a forca na tela
  function atualizarForca() {
    const forcaElement = document.querySelector(".forca");
    const erros = document.querySelectorAll(".cabeca, .corpo, .braco-esquerdo, .braco-direito, .perna-esquerda, .perna-direita").length;
    forcaElement.classList.remove(`erro-${erros}`);
    if (verificarDerrota()) {
      forcaElement.classList.add("derrota");
    } else if (verificarVitoria()) {
      forcaElement.classList.add("vitoria");
    } else {
      forcaElement.classList.add(`erro-${erros + 1}`);
    }
  }
  
  // Adiciona o evento de clique nas letras
  for (let i = 0; i < letras.length; i++) {
    const letra = letras[i];
    letra.input.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        const acertou = verificarLetra(letra.input.value.toUpperCase());
        letra.input.value = "";
        letra.input.disabled = true;
        letra.input.style.backgroundColor = acertou ? "#aaffaa" : "#ffaaaa";
  