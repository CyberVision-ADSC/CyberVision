function loadMaquinas() {
  document.getElementById("tituloMaquinas").innerHTML = " / máquinas com problemas"
  containerMaquinas.innerHTML = ""
  var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
  fetch(`/maquinas/listar?idFaculdade=${idFaculdade}`)
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
function openModalAddMaquina(){
    console.log("abriu o modal")
    document.getElementById("modal-adicionar-maquina").style.display = "block";
  }
  
  // Usuário clica na <span> (x), fecha o modal
  function closeModalMaquina() {
    document.getElementById("modal-adicionar-maquina").style.display = "none";
  }

function openModalDetalheMaquina(idMaquina) {
  fetch(`/maquinas/listarPorId?idMaquina=${idMaquina}`)
    .then(data => data.json())
    .then((data) => {
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
          <div id="listaDeProcessos">
          </div>
      </div>
      `

      for (let index = 0; index < data.length; index++) {
        const processo = data[index];
        if (processo != undefined && processo.pid != null && processo.pid != undefined) {
          document.getElementById("listaDeProcessos").innerHTML += `
            <div class="itemProcesso">
            <p>Nome: <span>${processo.nome}</span></p>
            <div>
              <img src="./icons/icon-more.svg" alt="ver mais">
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
  document.getElementById("backgroundCloseOffCanvaDetalheMaquina").style.display = 'block'
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