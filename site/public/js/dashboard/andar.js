function loadAndares() {
  document.getElementById("tituloMaquinas").innerHTML = " / visão geral dos andares"
  containerAndares.innerHTML = ""
  var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
  fetch(`/andares/listar?idFaculdade=${idFaculdade}`)
    .then(data => data.json())
    .then((data) => {
      for (var posicao = 0; posicao < data.length; posicao++) {
        if (data[posicao].total_problemas != null && data[posicao].total_problemas > 0) {
          if (data[posicao].id_andar != null && data[posicao].is_ativo == 1) {
            containerAndares.innerHTML += `
                      <div class="itemAndar">
                          <div onclick="changeViewMaquinas('salas', ${data[posicao].id_andar})">
                              <div>
                                  <div class="circle" style="background-color: #FF3A3A;"></div>
                                  <p style="color: #FF3A3A;">Máquinas com mal funcionamento: <span>${data[posicao].total_problemas}</span></p>
                              </div>
                              <p>${data[posicao].identificador_andar}</p>
                              <p><span>Salas cadastradas: ${data[posicao].total_sala != null ? data[posicao].total_sala : 0}</span><span>Maquinas cadastradas: ${data[posicao].total_computador != null ? data[posicao].total_computador : 0}</span></p>
                          </div>
                          <div>
                              <img src="icons/icon-editar.svg" onclick="editarAndar(${data[posicao].id_andar})">
                              <img src="icons/icon-deletar.svg" onclick="apagarAndar(${data[posicao].id_andar})">
                          </div>
                      </div>
                      `
          }
        } else {
          if (data[posicao].id_andar != null && data[posicao].is_ativo == 1) {
            containerAndares.innerHTML += `
                      <div class="itemAndar">
                          <div onclick="changeViewMaquinas('salas', ${data[posicao].id_andar})">
                              <div>
                                  <div class="circle" style="background-color: #32BF00;"></div>
                                  <p style="color: #32BF00;">Todas as máquinas funcionando</span></p>
                              </div>
                              <p>${data[posicao].identificador_andar}</p>
                              <p><span>Salas cadastradas: ${data[posicao].total_sala != null ? data[posicao].total_sala : 0}</span><span>Maquinas cadastradas: ${data[posicao].total_computador != null ? data[posicao].total_computador : 0}</span></p>
                          </div>
                          <div>
                              <img src="icons/icon-editar.svg" onclick="editarAndar(${data[posicao].id_andar})">
                              <img src="icons/icon-deletar.svg" onclick="apagarAndar(${data[posicao].id_andar})">
                          </div>
                      </div>
                      `
          }
        }

      }
    })
}

function adicionarAndar() {
  document.getElementById("modal-adicionar-andar").style.display = "block";
  var identificadorAndar = '5º Andar';
  var descricaoAndar = 'teste de adicionar andar';
  var idFaculdade = 1;

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

function closeModalAndar(){
  document.getElementById("modal-adicionar-andar").style.display = "none";
}

function editarAndar() {
  var identificadorAndar = '5º Andar';
  var descricaoAndar = 'teste de adicionar andar';
  var idAndar = 1;

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