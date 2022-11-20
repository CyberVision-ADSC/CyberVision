function loadFiltros(tipo, idSala) {
    filtrosCategorias.innerHTML = ``
    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')

    if (tipo == 'FACULDADE') {
        fetch(`/maquinas/listarQuantidadeFiltroMaquinas?idFaculdade=${idFaculdade}`)
            .then(data => data.json())
            .then((data) => {
                console.log(data)
                filtrosCategorias.innerHTML = `
                    <button ${data[2].total == 0 ? 'disabled' : ''} onclick="filtrarPor('CPU')" style="background-color: #E9DF00">CPU (<span>${data[2].total}</span>)</button>
                    <button ${data[1].total == 0 ? 'disabled' : ''} onclick="filtrarPor('DISCO')" style="background-color: #FF7272">Disco (<span>${data[1].total}</span>)</button>
                    <button ${data[3].total == 0 ? 'disabled' : ''} onclick="filtrarPor('RAM')" style="background-color: #E911B9">RAM (<span>${data[3].total}</span>)</button>
                    <button ${data[0].total == 0 ? 'disabled' : ''} onclick="filtrarPor('FISICO')" style="background-color: #FFBE72">Físico (<span>${data[0].total}</span>)</button>
            `
            })
    } else if (tipo == 'SALAS') {
        fetch(`/maquinas/listarQuantidadeFiltroMaquinas?idFaculdade=${idFaculdade}&idSala=${idSala}`)
            .then(data => data.json())
            .then((data) => {
                filtrosCategorias.innerHTML = `
                    <button ${data[2].total == 0 ? 'disabled' : ''} onclick="filtrarPorSala('CPU', ${idSala})" style="background-color: #E9DF00">CPU (<span>${data[2].total}</span>)</button>
                    <button ${data[1].total == 0 ? 'disabled' : ''} onclick="filtrarPorSala('DISCO', ${idSala})" style="background-color: #FF7272">Disco (<span>${data[1].total}</span>)</button>
                    <button ${data[3].total == 0 ? 'disabled' : ''} onclick="filtrarPorSala('RAM', ${idSala})" style="background-color: #E911B9">RAM (<span>${data[3].total}</span>)</button>
                    <button ${data[0].total == 0 ? 'disabled' : ''} onclick="filtrarPorSala('FISICO', ${idSala})" style="background-color: #FFBE72">Físico (<span>${data[0].total}</span>)</button>
            `
            }).catch(function (e) {
                console.log(e)
            })
    } else {
        console.log('escolha uma opcao para o componente de filtro')
    }
}

function filtrarPor(componente) {
    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
    containerMaquinas.innerHTML = ``

    switch (componente) {
        case "CPU":
            fetch(`/maquinas/filtrarPorComponente?componente=${'CPU'}&idFaculdade=${idFaculdade}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        case "DISCO":
            fetch(`/maquinas/filtrarPorComponente?componente=${'DISCO'}&idFaculdade=${idFaculdade}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        case "RAM":
            fetch(`/maquinas/filtrarPorComponente?componente=${'RAM'}&idFaculdade=${idFaculdade}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        case "FISICO":
            fetch(`/maquinas/filtrarPorComponente?componente=${'FISICO'}&idFaculdade=${idFaculdade}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        default:
            break;
    }
}

function filtrarPorSala(componente, idSala) {
    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
    containerMaquinasEspecificas.innerHTML = ''

    switch (componente) {
        case "CPU":
            fetch(`/maquinas/filtrarPorComponenteComSala?componente=${'CPU'}&idFaculdade=${idFaculdade}&idSala=${idSala}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinasEspecificas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        case "DISCO":
            fetch(`/maquinas/filtrarPorComponenteComSala?componente=${'DISCO'}&idFaculdade=${idFaculdade}&idSala=${idSala}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinasEspecificas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        case "RAM":
            fetch(`/maquinas/filtrarPorComponenteComSala?componente=${'RAM'}&idFaculdade=${idFaculdade}&idSala=${idSala}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinasEspecificas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        case "FISICO":
            fetch(`/maquinas/filtrarPorComponenteComSala?componente=${'FISICO'}&idFaculdade=${idFaculdade}&idSala=${idSala}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        if (data[posicao].is_ativo == 1 ? true : false) {
                            containerMaquinasEspecificas.innerHTML += `
                                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                                        <div class="status">
                                        ${data[posicao].problema_cpu ? '<div class="circle" style="background-color: #E9DF00"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_disco ? '<div class="circle" style="background-color: #FF7272"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_memoria ? '<div class="circle" style="background-color: #E911B9"></div>' : '<div class="circle"></div>'}
                                        ${data[posicao].problema_fisico ? '<div class="circle" style="background-color: #FFBE72"></div>' : '<div class="circle"></div>'}
                                        </div>
                                        <div class="pc">
                                            <img src="images/pc.png" alt="ver detalhes">
                                        </div>
                                        <span class="apelido">${data[posicao].identificador_computador}</span>
                                        <div class="dados">
                                            <span><span>${data[posicao].identificador_andar}</span></span>
                                            <span><span>${data[posicao].identificador_sala}</span></span>
                                        </div>
                                        <div class="hostname">
                                            <span>#${data[posicao].hostname}</span>
                                        </div>
                                    </div>
                                `
                        }
                    }
                })
            break;
        default:
            break;
    }
}