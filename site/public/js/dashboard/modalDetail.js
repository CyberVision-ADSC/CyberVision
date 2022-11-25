function openModalDetalheMaquina(idMaquina) {
    fetch(`/maquinas/listarPorId?idMaquina=${idMaquina}`)
        .then(data => data.json())
        .then((data) => {
            console.log(data)
            document.getElementById("modalDetalheMaquina").innerHTML = `
        <div>
            <div onclick="closeModalDetalheMaquina()">
                <img src="icons/maquina/icon-close-modal.svg" alt="fechar">
            </div>
            <p>Detalhamento da Máquina</p>
        </div>
        <div class="divUsoGrafico">
            <p>Uso em tempo real</p>
            <div>
                <canvas id="grafico3" class="canvas1"></canvas>
            </div>
        </div>
        <div class="divInfoHardware">
            <p>Informações da máquina</p>
            <p><span>Hostname: ${data[0].hostname}</span> <span>Sistema operacional: ${data[0].sistema_operacional != null ? data[0].sistema_operacional : 'Não identificado'}</span></p>
            <p><span>Processador: ${data[0].processador != null ? data[0].processador : 'Não identificado'}</span> <span>Disco: ${data[0].disco != null ? data[0].disco : 'Não identificado'}</span></p>
            <p><span>arquitetura: ${data[0].arquitetura != null ? data[0].arquitetura : 'Não identificado'}</span> <span>Ram: ${data[0].ram != null ? data[0].ram : 'Não identificado'}</span></p>
            <p><span>Fabricante: ${data[0].fabricante != null ? data[0].fabricante : 'Não identificado'}</span> <span>Sala: ${data[0].identificador_sala} Andar: ${data[0].identificador_andar}</span></p>
        </div>
        <div class="divProcessosTempoReal">
            <p>Processos em tempo real</p>
            <div id="listaDeProcessos"></div>
        </div>

        <div class="btn-modificar-modalMaquina">
            <button onclick="openModalEditarMaquina(${idMaquina}, ${data[0].id_andar}, ${data[0].fk_sala}, '${data[0].identificador_computador}')">Editar maquina<img src="icons/icon-editar.svg""></button>
            <button onclick="apagarMaquina(${idMaquina})">Apagar maquina<img src="icons/icon-deletar.svg""></button>
        </div>
        `

            for (let index = 0; index < data.length; index++) {
                const processo = data[index];
                if (processo != undefined && processo.pid != null && processo.pid != undefined) {
                    document.getElementById("listaDeProcessos").innerHTML += `
              <div class="itemProcesso">
              <p>Nome: <span>${processo.nome}</span></p>
              <div onclick="AbrirmodalNotificarOuMatar(${processo.id_processo}, ${idMaquina}, ${processo.pid})">
                <img src="./icons/icon-more.svg" alt="ver mais">
              </div>
  
              <div class="subModal" id="subModal${processo.id_processo}" style="display: none">
              <div><span class="closeDetailProcesso" onclick="fecharModalNotificarOuMatar(${processo.id_processo})">X</span></div>
                <div onclick="notificarAluno(${processo.id_processo}, ${idMaquina}, ${processo.pid})">
                  <img style="margin-right: 10px" src="./icons/icon-notificar-aluno.svg" alt="ver mais">
                  <span>Notificar aluno</span>
                </div>
                <div onclick="matarProcesso(${processo.id_processo}, ${idMaquina}, ${processo.pid})">
                  <img style="margin-right: 10px" src="./icons/icon-finalizar-processo.svg" alt="ver mais">
                  <span style="color: #FF0707">Finalizar processo</span>
                </div>
              </div>
              </div>
              `
                } else {
                    document.getElementById("listaDeProcessos").innerHTML = `
              <p class="errorResponse">Nenhum processo encontrado!</p>
            `

                }
            }
        })

    document.getElementById("modalDetalheMaquina").style.marginRight = 0
    document.getElementById("modalDetalheMaquina").style.visibility = 'visible'
    document.getElementById("backgroundCloseOffCanvaDetalheMaquina").style.display = 'flex'
}

function closeModalDetalheMaquina() {
    document.getElementById("modalDetalheMaquina").style.marginRight = "-576px"
    document.getElementById("modalDetalheMaquina").style.visibility = 'hidden'
    document.getElementById("backgroundCloseOffCanvaDetalheMaquina").style.display = 'none'
}

function openModalEditarMaquina(idMaquina, idAndar, idSala, identificador) {
    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
    document.getElementById("modal-atualizar-maquina").style.display = 'flex'

    fetch(`/andares/listar?idFaculdade=${idFaculdade}`)
        .then(data => data.json())
        .then((data) => {
            for (var i = 0; i < data.length; i++) {
                selectAndarMaquinaAtualizar.innerHTML += `
        <option value=${data[i].id_andar}>${data[i].identificador_andar}</option>
      `
            }
        })

    document.getElementById("modal-atualizar-maquina").innerHTML = `
    <div class="modal-content">
                <div class="container_modal">
                    <span class="titulo_modal">Atualizar máquina</span>
                    <span id="x" class="close" onclick="closeModalAtualizarMaquina()">&times;</span>
                </div>
                <div class="div_campo_modal">
                    <label>Identificador do computador</label>
                    <input id="inputIdentificadorAtualizar" value='${identificador}' placeholder="">
                </div>
                <div class="div_campo_modal">
                    <label>Andar</label>
                    <select name="" selected="${idAndar}" id="selectAndarMaquinaAtualizar" onchange="loadSalasByAndarAtualizar()"></select>
                </div>
                <div class="div_campo_modal">
                    <label>Sala</label>
                    <select name="" selected="${idSala}" id="selectSalaMaquinaAtualizar"></select>
                </div>
                <p id="demo"></p>
                <button class="btn_add" onclick="atualizarMaquina(${idMaquina})">Atualizar</button>
            </div>
    `;

    document.getElementById('selectSalaMaquinaAtualizar').disabled = true
    loadSalasByAndarAtualizar(idAndar)
}

async function loadSalasByAndarAtualizar(idAndar) {

    if (idAndar == null) {
        idAndar = document.getElementById('selectAndarMaquinaAtualizar').value
    }

    selectSalaMaquinaAtualizar.innerHTML = ''

    fetch(`/salas/listar?idAndar=${idAndar}`)
        .then(data => data.json())
        .then((data) => {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id_sala != null && data[i].identificador_sala != null) {
                        selectSalaMaquinaAtualizar.innerHTML += `
                    <option value="${data[i].id_sala}">${data[i].identificador_sala}</option>
                    `
                    }
                }

                selectSalaMaquinaAtualizar.disabled = false
            }
        })
}

function atualizarMaquina(idMaquina) {
    var identificador = document.getElementById('inputIdentificadorAtualizar').value
    var idSala = document.getElementById('selectSalaMaquinaAtualizar').value

    fetch(`/maquinas/atualizar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identificadorComputadorServer: identificador,
            idSalaServer: idSala,
            idMaquinaServer: idMaquina,
        })
    }).then(function (resposta) {
        if (resposta.status == 200) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'success',
                title: 'Maquina atualizada com sucesso!'
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'error',
                title: "Oops...",
                text: 'Houve um erro ao atualizar a maquina!',
            })
        }
    }).catch(function (e) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Houve um erro ao atualizar a maquina!',
        });
        console.log(e)
    })
}

function closeModalAtualizarMaquina() {
    document.getElementById("modal-atualizar-maquina").style.display = "none";
}

function AbrirmodalNotificarOuMatar(idModal) {
    document.getElementById(`subModal${idModal}`).style.display = 'flex'
}

function fecharModalNotificarOuMatar(idModal) {
    document.getElementById(`subModal${idModal}`).style.display = 'none'
}

function matarProcesso(idModal, idMaquina, pid) {
    fetch(`/processos/kill`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquina: idMaquina,
            pid: pid,
        })
    }).then(function (resposta) {
        if (resposta.status == 200) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'success',
                title: 'Processo interrompido com sucesso!'
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'error',
                title: "Oops...",
                text: 'Houve um erro ao interromper o processo!',
            })
        }
    }).catch(function (e) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Houve um erro ao interromper o processo!',
        });
        console.log(e)
    })

    fecharModalNotificarOuMatar(idModal)
}

function notificarAluno(idModal, idMaquina) {
    fetch(`/processos/notificar-aluno`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquina: idMaquina,
        })
    }).then(function (resposta) {
        if (resposta.status == 200) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'success',
                title: 'Notificação enviada com sucesso!'
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'error',
                title: "Oops...",
                text: 'Houve um erro ao enviar a notificação!',
            })
        }
    }).catch(function (e) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Houve um erro ao enviar a notificação!',
        });
        console.log(e)
    })

    fecharModalNotificarOuMatar(idModal)
}

function apagarMaquina(idMaquina) {
    swal.fire({
        title: 'Você tem certeza?',
        text: "Você não será capaz de reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero apagar!',
        cancelButtonText: 'Não, cancelar!',
        confirmButtonColor: '#FF5353',
        cancelButtonColor: '#14B424',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
                fetch("/maquinas/excluir", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idComputadorServer: idMaquina
                    })
                }).then(function (resposta) {
                    if (resposta.status == 200) {
                        Swal.fire(
                            'OK!',
                            'Maquina excluida com sucesso!',
                            'success'
                        )
                    }
                }).catch(function (erro) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Houve um erro ao apagar a maquina!",
                    });
                    console.log(erro);
                })
            }
        }
    })
}