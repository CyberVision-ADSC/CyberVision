function loadSalas(idAndar) {
    document.getElementById("tituloMaquinas").innerHTML = " /  andar 1 / visão geral das salas"

    containerSalas.innerHTML = ""
    fetch(`/salas/listar?idAndar=${idAndar}`)
        .then(data => data.json())
        .then((data) => {
            console.log(data)
            for (var posicao = 0; posicao < data.length; posicao++) {
                if (data[posicao].id_sala != null && data[posicao].is_ativo == 1) {
                    containerSalas.innerHTML += `
                    <div class="itemSala">
                        <div onclick="changeViewMaquinas('maquinasEspecificas', ${data[posicao].id_sala})">
                            <div>
                                <div class="circle" style="background-color: #FF3A3A;"></div>
                                <p style="color: #FF3A3A;">Máquinas com mal funcionamento: <span></span></p>
                            </div>
                            <p>${data[posicao].identificador_sala}</p>
                            <p><span>Maquinas cadastradas: ${data[posicao].total_computador != null ? data[posicao].total_computador : 0}</span></p>
                        </div>
                        <div>
                            <img src="icons/icon-editar.svg" onclick="editarSala(${data[posicao].id_sala})">
                            <img src="icons/icon-deletar.svg" onclick="apagarSala(${data[posicao].id_sala})">
                        </div>
                    </div>
                `
                }
            }
        })
}

function adicionarSala() {
    var identificadorSala = 'POS GRADUACAO';
    var descricaoSala = 'sala bacana';
    var idAndar = 1;


    if (identificadorSala && descricaoSala && idAndar) {
        fetch("/salas/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            numeroSalaServer: identificadorSala,
            descricaoServer: descricaoSala,
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
}

function editarSala() {
  var identificadorSala = 'POS GRADUACAO';
  var descricaoSala = 'sala bacana';
  var idSala = 1;

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