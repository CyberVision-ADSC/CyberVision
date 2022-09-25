function loadMaquinas() {
    containerMaquinas.innerHTML = ""

    for (var posicao = 0; posicao < 25; posicao++) {
            containerMaquinas.innerHTML += `
            <div class="item">
            <div class="status"><div class="circle-active"></div><span>ATIVO</span></div>
            <div class="pc"><img src="images/pc.png" alt="ver detalhes"></div>
            <span class="apelido">Apelido</span>
            <div class="dados">
                <span>#NOT7578383</span>
                <span>SALA 12</span>
            </div>
        </div>
            `
    }
}