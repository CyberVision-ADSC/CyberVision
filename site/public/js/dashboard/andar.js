async function loadAndares() {
  document.getElementById("tituloMaquinas").innerHTML = " / visão geral dos andares"
  containerAndares.innerHTML = ""
  var idFaculdade = sessionStorage.getItem('ID_FACULDADE')

  await fetch(`/andares/listar?idFaculdade=${idFaculdade}`)
    .then(data => data.json())
    .then(async (data) => {
      for (var posicao = 0; posicao < data.length; posicao++) {
        if (data[posicao].id_andar != null && data[posicao].is_ativo == 1) {

          var tem_problema = 0

          await fetch(`/andares/listarProblemasPorAndar?idAndar=${data[posicao].id_andar}`)
            .then(data => data.json())
            .then((data) => {
              tem_problema = data[0].total_problemas
            })

          containerAndares.innerHTML += `
                      <div class="itemAndar">
                          <div onclick="changeViewMaquinas('salas', ${data[posicao].id_andar})">
                          ${tem_problema != null && tem_problema != 0 ?

              `
                            <div>
                                  <div class="circle" style="background-color: #FF3A3A;"></div>
                                  <p style="color: #FF3A3A;">Máquinas com mal funcionamento: <span>${tem_problema}</span></p>
                              </div>
                            `

              :

              `
                            <div>
                                <div class="circle" style="background-color: #32BF00;"></div>
                                <p style="color: #32BF00;">Todas as máquinas funcionando</span></p>
                            </div>
                            `

            }
 
                              <p>${data[posicao].identificador_andar}</p>
                              <p><span>Salas cadastradas: ${data[posicao].total_sala != null ? data[posicao].total_sala : 0}</span><span>Maquinas cadastradas: ${data[posicao].total_computador != null ? data[posicao].total_computador : 0}</span></p>
                          </div>
                          <div>
                              <img src="icons/icon-editar.svg" onclick="openModalAtualizarAndar(${data[posicao].id_andar})">
                              <img src="icons/icon-deletar.svg" onclick="apagarAndar(${data[posicao].id_andar})">
                          </div>
                      </div>
                      `
        }
      }
    })
}

function openModalAdicionarAndar() {
  document.getElementById('modal-adicionar-andar').style.display = 'flex'
}

function adicionarAndar() {
  document.getElementById("modal-adicionar-andar").style.display = "flex";
  var identificadorAndar = document.getElementById('inputIdentificadorAndar').value;
  var descricaoAndar = document.getElementById('inputDescricaoAndar').value;
  var idFaculdade = sessionStorage.getItem('ID_FACULDADE');

  if (identificadorAndar && descricaoAndar && idFaculdade) {
    fetch("/andares/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroAndarServer: identificadorAndar,
        descricaoServer: descricaoAndar,
        idFaculdadeServer: idFaculdade,
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
          title: 'Andar cadastrado com sucesso!'
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
          title: 'Houve um erro ao cadastrar o andar!'
        })
      }

      closeModal('modal-adicionar-andar')
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Houve um erro ao cadastrar o andar!',
      });
      console.log(e)
    })
  }
}

function openModalAtualizarAndar(idAndar) {
  document.getElementById('modal-atualizar-andar').style.display = 'flex'

  fetch(`/andares/listarPorId?idAndar=${idAndar}`)
    .then(data => data.json())
    .then((data) => {
      document.getElementById('modal-atualizar-andar').innerHTML = `
              <div class="modal-content">
                  <div class="container_modal">
                      <span class="titulo_modal">Atualizar andar</span>
                      <span id="x" class="close" onclick="closeModal('modal-atualizar-andar')">&times;</span>
                  </div>
                  <div class="div_campo_modal">
                      <label>Apelido do andar</label>
                      <input value="${data[0].identificador_andar}" id="inputIdentificadorAtualizarAndar" placeholder="">
                  </div>
                  <div class="div_campo_modal">
                      <label>descrição do andar</label>
                      <input value="${data[0].descricao_andar}" id="inputDescricaoAtualizarAndar" placeholder="">
                  </div>
                 
                  <p id="demo"></p>
                  <button class="btn_add" onclick="editarAndar(${data[0].id_andar})">Atualizar</button>
              </div>
    `
    })
}

function editarAndar(idAndar) {
  var identificadorAndar = document.getElementById('inputIdentificadorAtualizarAndar').value;
  var descricaoAndar = document.getElementById('inputDescricaoAtualizarAndar').value;

  if (identificadorAndar && descricaoAndar && idAndar) {
    fetch("/andares/atualizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroAndarServer: identificadorAndar,
        descricaoServer: descricaoAndar,
        idAndarServer: idAndar,
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
          title: 'Andar atualizado com sucesso!'
        })

        closeModal('modal-atualizar-andar')
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
          title: 'Houve um erro ao atualizar o andar!'
        })
      }
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Houve um erro ao atualizar o andar!',
      });
      console.log(e)
    })
  }

  closeModal('modal-atualizar-andar')
}

function apagarAndar(idAndar) {
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
        fetch("/andares/excluir", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idAndarServer: idAndar
          })
        }).then(function (resposta) {
          if (resposta.status == 200) {
            Swal.fire(
              'OK!',
              'Andar excluido com sucesso!',
              'success'
            )
          }
        }).catch(function (erro) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Houve um erro ao apagar o andar!",
          });
          console.log(erro);
        })
      }
    }
  })
}