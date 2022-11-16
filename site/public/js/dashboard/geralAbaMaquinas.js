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

function changeViewMaquinas(params, id) {
    switch (params) {
        case "maquinasComProblemas":
            document.getElementById("filtrosCategorias").style.display = 'flex'
            document.getElementById("containerMaquinas").style.display = 'flex'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadMaquinas()
            loadFiltros('FACULDADE')

            document.getElementById('botaoAdicionar').innerHTML = `
            <button onclick="adicionarMaquina()" class="add_maquina">Adicionar máquina
            <img src="./icons/icon-circlePlus.svg" alt="Adicionar" style="margin-left: 5px;">
            </button>
            `
            break;
        case "andares":
            document.getElementById("filtrosCategorias").style.display = 'none'
            document.getElementById("containerMaquinas").style.display = 'none'
            document.getElementById("containerAndares").style.display = 'flex'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadAndares()

            document.getElementById('botaoAdicionar').innerHTML = `
            <button onclick="adicionarAndar()" class="add_maquina">Adicionar andar
            <img src="./icons/icon-circlePlus.svg" alt="Adicionar" style="margin-left: 5px;">
            </button>
            `
            break;
        case "salas":
            document.getElementById("filtrosCategorias").style.display = 'none'
            document.getElementById("containerMaquinas").style.display = 'none'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'flex'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadSalas(id)

            document.getElementById('botaoAdicionar').innerHTML = `
            <button onclick="adicionarSala()" class="add_maquina">Adicionar sala
            <img src="./icons/icon-circlePlus.svg" alt="Adicionar" style="margin-left: 5px;">
            </button>
            `
            break;
        case "maquinasEspecificas":
            document.getElementById("filtrosCategorias").style.display = 'flex'
            document.getElementById("containerMaquinas").style.display = 'none'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'flex'
            loadMaquinasEspecificas(id)
            loadFiltros('SALAS', id)

            document.getElementById('botaoAdicionar').innerHTML = `
            <button onclick="adicionarMaquina()" class="add_maquina">Adicionar máquina
            <img src="./icons/icon-circlePlus.svg" alt="Adicionar" style="margin-left: 5px;">
            </button>
            `
            break;
        default:
            document.getElementById("filtrosCategorias").style.display = 'flex'
            document.getElementById("containerMaquinas").style.display = 'flex'
            document.getElementById("containerAndares").style.display = 'none'
            document.getElementById("containerSalas").style.display = 'none'
            document.getElementById("containerMaquinasEspecificas").style.display = 'none'
            loadMaquinas()

            document.getElementById('botaoAdicionar').innerHTML = `
            <button onclick="adicionarMaquina()" class="add_maquina">Adicionar máquina
            <img src="./icons/icon-circlePlus.svg" alt="Adicionar" style="margin-left: 5px;">
            </button>
            `
            break;
    }
}