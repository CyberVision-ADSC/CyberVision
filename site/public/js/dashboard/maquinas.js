function loadMaquinas() {

    document.getElementById("tituloMaquinas").innerHTML = " / máquinas com problemas"

    containerMaquinas.innerHTML = ""

    for (var posicao = 0; posicao < 20; posicao++) {

        // style="background-color: #E9DF00" cpu
        // style="background-color: #FF7272" disco
        // style="background-color: #E911B9" ram
        // style="background-color: #FFBE72" fisico

        if (posicao == 0) {
            containerMaquinas.innerHTML += `
            <div class="item" onclick="openModalDetalheMaquina()">
                <div class="status">
                    <div class="circle" style="background-color: #E9DF00"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle" style="background-color: #FFBE72"></div>
                </div>
                <div class="pc">
                    <img src="images/pc.png" alt="ver detalhes">
                </div>
                <span class="apelido">Apelido</span>
                <div class="dados">
                    <span>ANDAR <span>1</span></span>
                    <span>SALA <span>2</span></span>
                </div>
                <div class="hostname">
                    <span>#NOT7578383</span>
                </div>
            </div>
            `
        } else if (posicao == 1) {
            containerMaquinas.innerHTML += `
            <div class="item" onclick="openModalDetalheMaquina()">
                <div class="status">
                    <div class="circle"></div>
                    <div class="circle" style="background-color: #FF7272" disco></div>
                    <div class="circle" style="background-color: #E911B9" ram></div>
                    <div class="circle"></div>
                </div>
                <div class="pc">
                    <img src="images/pc.png" alt="ver detalhes">
                </div>
                <span class="apelido">Apelido</span>
                <div class="dados">
                    <span>ANDAR <span>1</span></span>
                    <span>SALA <span>2</span></span>
                </div>
                <div class="hostname">
                    <span>#NOT7578383</span>
                </div>
            </div>
            `
        } else {
            containerMaquinas.innerHTML += `
            <div class="item" onclick="openModalDetalheMaquina()">
                <div class="status">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle" style="background-color: #FFBE72"></div>
                </div>
                <div class="pc">
                    <img src="images/pc.png" alt="ver detalhes">
                </div>
                <span class="apelido">Apelido</span>
                <div class="dados">
                    <span>ANDAR <span>1</span></span>
                    <span>SALA <span>2</span></span>
                </div>
                <div class="hostname">
                    <span>#NOT7578383</span>
                </div>
            </div>
            `
        }
    }
}

function loadAndares() {

    document.getElementById("tituloMaquinas").innerHTML = " / visão geral dos andares"

    containerAndares.innerHTML = ""

    for (var posicao = 0; posicao < 5; posicao++) {

        containerAndares.innerHTML += `
            <div class="itemAndar" onclick="changeViewMaquinas('salas')">
                <div>
                    <div>
                        <div class="circle" style="background-color: #FF3A3A;"></div>
                        <p style="color: #FF3A3A;">Máquinas com mal funcionamento: <span>10</span></p>
                    </div>
                    <p>1º Andar</p>
                    <p><span>Salas cadastradas: 2</span><span>Maquinas cadastradas: 20</span></p>
                </div>
                <div>
                    <img src="icons/icon-editar.svg">
                    <img src="icons/icon-deletar.svg">
                </div>
            </div>
            `
    }
}

function loadSalas() {

    document.getElementById("tituloMaquinas").innerHTML = " /  andar 1 / visão geral das salas"

    containerSalas.innerHTML = ""

    for (var posicao = 0; posicao < 10; posicao++) {

        containerSalas.innerHTML += `
            <div class="itemSala" onclick="changeViewMaquinas('maquinasEspecificas')">
                <div>
                    <div>
                        <div class="circle" style="background-color: #FF3A3A;"></div>
                        <p style="color: #FF3A3A;">Máquinas com mal funcionamento: <span>10</span></p>
                    </div>
                    <p>Sala ADS-C</p>
                    <p><span>Maquinas cadastradas: 20</span><span>Maquinas cadastradas: 20</span></p>
                </div>
                <div>
                    <img src="icons/icon-editar.svg">
                    <img src="icons/icon-deletar.svg">
                </div>
            </div>
            `
    }
}

function loadMaquinasEspecificas() {

    document.getElementById("containerMaquinasEspecificas").innerHTML = " /  andar 1 / sala 1 / visão geral das máquinas"

    containerMaquinasEspecificas.innerHTML = ""

    for (var posicao = 0; posicao < 12; posicao++) {
        containerMaquinasEspecificas.innerHTML += `
            <div class="item" onclick="openModalDetalheMaquina()">
                <div class="status">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
                <div class="pc">
                    <img src="images/pc.png" alt="ver detalhes">
                </div>
                <span class="apelido">Apelido</span>
                <div class="dados">
                    <span>ANDAR <span>1</span></span>
                    <span>SALA <span>2</span></span>
                </div>
                <div class="hostname">
                    <span>#NOT7578383</span>
                </div>
            </div>
            `
    }
}

function changeViewMaquinas(params) {
    switch (params) {
        case "maquinasComProblemas":
            document.getElementById("filtrosCategorias").style.display = 'flex'
            document.getElementById("containerMaquinas").style.display = 'flex'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadMaquinas()
            break;
        case "andares":
            document.getElementById("filtrosCategorias").style.display = 'none'
            document.getElementById("containerMaquinas").style.display = 'none'
            document.getElementById("containerAndares").style.display = 'flex'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadAndares()
            break;
        case "salas":
            document.getElementById("filtrosCategorias").style.display = 'none'
            document.getElementById("containerMaquinas").style.display = 'none'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'flex'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadSalas()
            break;
        case "maquinasEspecificas":
            document.getElementById("filtrosCategorias").style.display = 'flex'
            document.getElementById("containerMaquinas").style.display = 'none'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'flex'
            loadMaquinasEspecificas()
            break;
        default:
            document.getElementById("filtrosCategorias").style.display = 'flex'
            document.getElementById("containerMaquinas").style.display = 'flex'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadMaquinas()
            break;
    }
}

function openModalDetalheMaquina() {
    document.getElementById("modalDetalheMaquina").style.marginRight = 0
    document.getElementById("modalDetalheMaquina").style.visibility = 'visible'
    document.getElementById("backgroundCloseOffCanvaDetalheMaquina").style.display = 'flex'
}

function closeModalDetalheMaquina() {
    document.getElementById("modalDetalheMaquina").style.marginRight = "-576px"
    document.getElementById("modalDetalheMaquina").style.visibility = 'hidden'
    document.getElementById("backgroundCloseOffCanvaDetalheMaquina").style.display = 'none'
}

function alterarVisao(params) {
    switch (params) {
        case "maquinas":
            document.getElementById("visao-maquinas-filtro").classList.add("active")
            document.getElementById("visao-geral-filtro").classList.remove("active")

            document.getElementById("icone-maquinas-white").style.display = 'flex'
            document.getElementById("icone-maquinas-purple").style.display = 'none'
            document.getElementById("icone-geral-white").style.display = 'none'
            document.getElementById("icone-geral-purple").style.display = 'flex'
            break;
        case "geral":
            document.getElementById("visao-maquinas-filtro").classList.remove("active")
            document.getElementById("visao-geral-filtro").classList.add("active")

            document.getElementById("icone-geral-white").style.display = 'flex'
            document.getElementById("icone-geral-purple").style.display = 'none'
            document.getElementById("icone-maquinas-white").style.display = 'none'
            document.getElementById("icone-maquinas-purple").style.display = 'flex'
            break;
    
        default:
            break;
    }
}