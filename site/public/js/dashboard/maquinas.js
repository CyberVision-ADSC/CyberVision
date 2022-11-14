function loadMaquinas() {
    document.getElementById("tituloMaquinas").innerHTML = " / máquinas com problemas"
    containerMaquinas.innerHTML = ""
    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
    fetch(`/maquinas/listar?idFaculdade=${idFaculdade}`)
        .then(data => data.json())
        .then((data) => {
            for (var posicao = 0; posicao < data.length; posicao++) {
                // style="background-color: #E9DF00" cpu
                // style="background-color: #FF7272" disco
                // style="background-color: #E911B9" ram
                // style="background-color: #FFBE72" fisico

                if (data[posicao].is_ativo == 1 ? true : false) {
                    containerMaquinas.innerHTML += `
                    <div class="item" onclick="openModalDetalheMaquina(${data[posicao].id_computador})">
                        <div class="status">
                            <div class="circle"></div>
                            <div class="circle" style="background-color: #FF7272"></div>
                            <div class="circle" style="background-color: #E911B9"></div>
                            <div class="circle"></div>
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
}

function loadMaquinasEspecificas(idSala) {
    document.getElementById("containerMaquinasEspecificas").innerHTML = " /  andar 1 / sala 1 / visão geral das máquinas"
    containerMaquinasEspecificas.innerHTML = ""
    fetch(`/maquinas/listarPorSala?idSala=${idSala}`)
        .then(data => data.json())
        .then((data) => {
            for (var posicao = 0; posicao < data.length; posicao++) {
                if (data[posicao].is_ativo == 1) {
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
                        <span class="apelido">${data[posicao].identificador_computador}</span>
                        <div class="dados">
                            <span>${data[posicao].identificador_andar}</span>
                            <span>${data[posicao].identificador_sala}</span>
                        </div>
                        <div class="hostname">
                            <span>${data[posicao].hostname}</span>
                        </div>
                    </div>
                    `
                }
            }
        })
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

function listarPorHostname() {
    var hostname = document.getElementById("inputPesquisaHostName").value

    fetch(`/maquinas/listarPorHostname?hostname=${hostname}`)
        .then(data => data.json())
        .then((data) => {
            console.log(data)
        }).catch(function (e) {
            console.log(e)
        })
}

function adicionarMaquina() {
    var identificadorComputador = 'teste maquina';
    var idSala = 1;
    var hostname = '123456789';

    if (identificadorComputador && idSala && !hostnameExiste(hostname)) {
        fetch("/maquinas/cadastrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identificadorComputadorServer: identificadorComputador,
                hostnameServer: hostname,
                idSalaServer: idSala,
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
                title: 'Máquina cadastrado com sucesso!'
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
                title: 'Houve um erro ao cadastrar a máquina!'
              })
            }
          }).catch(function (e) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'Houve um erro ao cadastrar a máquina!',
            });
            console.log(e)
          })
    }
}

function editarMaquina() {
    var identificadorComputador = 'ATUALIZAR MAQUINA';
    var idMaquina = 1;
    var hostname = '123456789';

    if (identificadorComputador && idMaquina && !hostnameExiste(hostname)) {
        fetch("/maquinas/atualizar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identificadorComputadorServer: identificadorComputador,
                hostnameServer: hostname,
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
                title: 'Máquina cadastrado com sucesso!'
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
                title: 'Houve um erro ao cadastrar a máquina!'
              })
            }
          }).catch(function (e) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'Houve um erro ao cadastrar a máquina!',
            });
            console.log(e)
          })
    }
}

function excluirMaquina(idMaquina) {
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

function hostnameExiste(hostname) {
    fetch(`/maquinas/validarhostname?hostname=${hostname}`)
    .then(data => data.json())
    .then((data) => {
        return data
    })
}