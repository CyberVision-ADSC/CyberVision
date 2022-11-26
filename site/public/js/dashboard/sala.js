let idAndarGlobal = ''

function loadSalas(idAndar) {
  idAndarGlobal = idAndar
  document.getElementById("tituloMaquinas").innerHTML = " /  andar 1 / visão geral das salas"

  containerSalas.innerHTML = ""
  fetch(`/salas/listar?idAndar=${idAndar}`)
    .then(data => data.json())
    .then((data) => {
      for (var posicao = 0; posicao < data.length; posicao++) {
        if (data[posicao].total_problemas != null && data[posicao].total_problemas > 0) {
          if (data[posicao].id_sala != null && data[posicao].is_ativo == 1) {
            containerSalas.innerHTML += `
                    <div class="itemSala">
                        <div onclick="changeViewMaquinas('maquinasEspecificas', ${data[posicao].id_sala})">
                            <div>
                                <div class="circle" style="background-color: #FF3A3A;"></div>
                                <p style="color: #FF3A3A;">Máquinas com mal funcionamento: <span>${data[posicao].total_problemas}</span></p>
                            </div>
                            <p>${data[posicao].identificador_sala}</p>
                            <p><span>Maquinas cadastradas: ${data[posicao].total_computador != null ? data[posicao].total_computador : 0}</span></p>
                        </div>
                        <div>
                            <img src="icons/icon-editar.svg" onclick="openModalAtualizarSala(${data[posicao].id_sala})">
                            <img src="icons/icon-deletar.svg" onclick="apagarSala(${data[posicao].id_sala})">
                        </div>
                    </div>
                `
          }
        } else {
          if (data[posicao].id_sala != null && data[posicao].is_ativo == 1) {
            containerSalas.innerHTML += `
                    <div class="itemSala">
                        <div onclick="changeViewMaquinas('maquinasEspecificas', ${data[posicao].id_sala})">
                            <div>
                                <div class="circle" style="background-color: #32BF00;"></div>
                                <p style="color: #32BF00;">Todas as máquinas funcionando</span></p>
                            </div>
                            <p>${data[posicao].identificador_sala}</p>
                            <p><span>Maquinas cadastradas: ${data[posicao].total_computador != null ? data[posicao].total_computador : 0}</span></p>
                        </div>
                        <div>
                            <img src="icons/icon-editar.svg" onclick="openModalAtualizarSala(${data[posicao].id_sala})">
                            <img src="icons/icon-deletar.svg" onclick="apagarSala(${data[posicao].id_sala})">
                        </div>
                    </div>
                `
          }
        }
      }
    })
}

function openModalAdicionarSala() {
  document.getElementById('modal-adicionar-sala').style.display = 'flex'
}

function adicionarSala() {
  var identificadorSala = document.getElementById('inputIdentificadorSala').value;
  var descricaoSala = document.getElementById('inputDescricaoSala').value;

  if (identificadorSala && descricaoSala && idAndarGlobal) {
    fetch("/salas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroSalaServer: identificadorSala,
        descricaoServer: descricaoSala,
        idAndarServer: idAndarGlobal,
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
          title: 'Sala cadastrada com sucesso!'
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
          title: 'Houve um erro ao cadastrar a sala!'
        })
      }
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Houve um erro ao cadastrar a sala!',
      });
      console.log(e)
    })
  }

  closeModal('modal-adicionar-sala')
}

function openModalAtualizarSala(idSala) {
  document.getElementById('modal-atualizar-sala').style.display = 'flex'

  fetch(`/salas/listarPorId?idSala=${idSala}`)
    .then(data => data.json())
    .then((data) => {
      document.getElementById('modal-atualizar-sala').innerHTML = `
              <div class="modal-content">
                  <div class="container_modal">
                      <span class="titulo_modal">Atualizar sala</span>
                      <span id="x" class="close" onclick="closeModal('modal-atualizar-sala')">&times;</span>
                  </div>
                  <div class="div_campo_modal">
                      <label>Identificador da sala</label>
                      <input value="${data[0].identificador_sala}" id="inputIdentificadorAtualizarSala" placeholder="">
                  </div>
                  <div class="div_campo_modal">
                      <label>descrição da sala</label>
                      <input value="${data[0].descricao_sala}" id="inputDescricaoAtualizarSala" placeholder="">
                  </div>
                 
                  <p id="demo"></p>
                  <button class="btn_add" onclick="editarSala(${data[0].id_sala})">Atualizar</button>
              </div>
    `
    })
}

function editarSala(idSala) {
  var identificadorSala = document.getElementById('inputIdentificadorAtualizarSala').value;
  var descricaoSala = document.getElementById('inputDescricaoAtualizarSala').value;

  if (identificadorSala && descricaoSala && idSala) {
    fetch("/salas/atualizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroSalaServer: identificadorSala,
        descricaoServer: descricaoSala,
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
          title: 'Sala atualizada com sucesso!'
        })

        closeModal('modal-atualizar-sala')
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
          title: 'Houve um erro ao atualizar a sala!'
        })
      }
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Houve um erro ao atualizar a sala!',
      });
      console.log(e)
    })
  }
}

function apagarSala(idSala) {
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
        fetch("/salas/excluir", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idSalaServer: idSala
          })
        }).then(function (resposta) {
          if (resposta.status == 200) {
            Swal.fire(
              'OK!',
              'Sala excluida com sucesso!',
              'success'
            )
          }
        }).catch(function (erro) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Houve um erro ao apagar a sala!",
          });
          console.log(erro);
        })
      }
    }
  })
}