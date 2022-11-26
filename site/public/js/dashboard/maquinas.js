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

function openModalAddMaquina() {
  var idFaculdade = sessionStorage.getItem('ID_FACULDADE')

  selectAndarMaquina.innerHTML = `<option value="0">Selecione o andar</option>`
  selectSalaMaquina.innerHTML = `<option value="0">Selecione a sala</option>`
  selectSalaMaquina.disabled = true

  fetch(`/andares/listar?idFaculdade=${idFaculdade}`)
    .then(data => data.json())
    .then((data) => {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        selectAndarMaquina.innerHTML += `
        <option value=${data[i].id_andar}>${data[i].identificador_andar}</option>
      `
      }
    })

  document.getElementById("modal-adicionar-maquina").style.display = "flex";
}

function myFunction() {
  var x = document.getElementById("selectAndarMaquina").value;
  console.log(x, "id do andar")
  document.getElementById("demo").innerHTML = "You selected: " + x;
}

async function loadSalasByAndar() {
  selectSalaMaquina.innerHTML = ''

  var idAndar = await document.getElementById("selectAndarMaquina").value;
  fetch(`/salas/listar?idAndar=${idAndar}`)
    .then(data => data.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id_sala != null && data[i].identificador_sala != null) {
          selectSalaMaquina.innerHTML += `
          <option value="${data[i].id_sala}">${data[i].identificador_sala}</option>
        `
        }
      }

      selectSalaMaquina.disabled = false
    })
}

function closeModalMaquina() {
  document.getElementById("modal-adicionar-maquina").style.display = "none";
}

function fechaListaHostname() {
  document.getElementById("modal_pesquisa_hostname").style.display = "none";
}

function listarPorHostname() {
  var hostname = inputPesquisaHostName.value;
  document.getElementById("modal_pesquisa_hostname").style.display = "flex";
  listagem_maquinas.innerHTML = "";

  fetch(`/maquinas/listarPorHostname?hostname=${hostname}`)
    .then(data => data.json())
    .then((data) => {

console.log(data)

      for (var i = 0; i < data.length; i++) {
        listagem_maquinas.innerHTML += `    
            <div id="maquinas_lista">
              <div style="display: flex;">
              <img src="../../images/pc.png" height="55px">
                  <div class="maquinas_caracteristicas">
                      <span>${data[0].identificador_computador}</span>
                      <span>#${data[0].hostname}</span>
                  </div>
              </div>
              <div class="maquinas_caracteristicas">
                  <span>${data[0].identificador_andar}</span>
                  <span>${data[0].identificador_sala}</span>
             </div>
            </div>
            <div id="linha_maquinas"></div>`;
          }

    }).catch(function (e) {
      console.log(e)
    })
}

function adicionarMaquina() {
  var identificadorComputador = document.getElementById('inputIdentificador').value;
  var idSala = document.getElementById('selectSalaMaquina').value;
  var hostname = gerarHostname();

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
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Digite os campos corretamente",
    });
  }

  closeModalMaquina()
}

function gerarHostname() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
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