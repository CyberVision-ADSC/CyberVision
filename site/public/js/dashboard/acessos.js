function loadAcessos() {
  document.getElementById("containerAcessos").innerHTML = ""

  var idFaculdade = sessionStorage.getItem('ID_FACULDADE')

  fetch(`/acessos/listar?idFaculdade=${idFaculdade}`)
    .then(data => data.json())
    .then((data) => {
      for (var posicao = 0; posicao < data.length; posicao++) {
        if (sessionStorage.getItem('TIPO_USUARIO') == 'admin') {

          document.getElementById("btnAdicionarAcesso").style.display = "flex"

          if (data[posicao].id_usuario == sessionStorage.getItem('ID_USUARIO')) {
            document.getElementById("containerAcessos").innerHTML += `
            <div class="itemAcesso">
                    <div>
                        <p>Nome: <span>${data[posicao].nome}</span></p>
                        <p>Email: <span>${data[posicao].email}</span></p>
                        <p>Nível de acesso: <span>${data[posicao].tipo_usuario && data[posicao].tipo_usuario != null ? data[posicao].tipo_usuario : "Comum"}</span></p>
                    </div>
                </div>
              `
          } else {
            document.getElementById("containerAcessos").innerHTML += `
            <div class="itemAcesso">
                    <div>
                        <p>Nome: <span>${data[posicao].nome}</span></p>
                        <p>Email: <span>${data[posicao].email}</span></p>
                        <p>Nível de acesso: <span>${data[posicao].tipo_usuario ? data[posicao].tipo_usuario : "Comum"}</span></p>
                    </div>
                    <div>
                        <img onclick="openModalAtualizar(${data[posicao].id_usuario})" src="icons/icon-editar.svg" alt="editar"
                            style="margin-left: 5px;">
                        <img onclick="desativarAcesso(${data[posicao].id_usuario})" src="icons/icon-deletar.svg" alt="apagar"
                            style="margin-left: 5px;">
                    </div>
                </div>
              `
          }
        } else {
          document.getElementById("containerAcessos").innerHTML += `
          <div class="itemAcesso">
                  <div>
                      <p>Nome: <span>${data[posicao].nome}</span></p>
                      <p>Email: <span>${data[posicao].email}</span></p>
                      <p>Nível de acesso: <span>${data[posicao].tipo_usuario ? data[posicao].tipo_usuario : "Comum"}</span></p>
                  </div>
              </div>
            `
        }
      }
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Houve um erro ao carregar os acessos!",
      });
      console.log(e)
    });
}

function openModalCriar() {
  document.getElementById("modal-adicionar-acesso").style.display = "block";
}

window.onclick = function (event) {
  if (event.target == document.getElementById("modal-adicionar-sala")) {
    document.getElementById("modal-adicionar-sala").style.display = "none";
  }
  if (event.target == document.getElementById("modal-adicionar-maquina")) {
    document.getElementById("modal-adicionar-maquina").style.display = "none";
  }
}

function adicionarAcesso() {
  var nome = document.getElementById("nomeAdicionarAcesso").value;
  var email = document.getElementById("emailAdicionarAcesso").value;
  var senha = document.getElementById("senhaAdicionarAcesso").value;
  var tipoUsuario = document.getElementById("tipoUsuarioAdicionarAcesso").value;
  var fk_faculdade = sessionStorage.getItem('ID_FACULDADE')

  if (nome.length > 3 && email && senha.length > 6 && fk_faculdade) {
    fetch("/acessos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha,
        tipoUsuarioServer: tipoUsuario,
        idFaculdadeServer: fk_faculdade,
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
          title: 'Acesso cadastrado com sucesso!'
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
          title: 'Houve um erro ao cadastrar o acesso!'
        })
      }
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Houve um erro ao cadastrar o acesso!',
      });
      console.log(e)
    })
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Preencha corretamente os campos para realizar o cadastro',
    });
  }

  closeModal('modal-adicionar-acesso')
}

function openModalAtualizar(id_usuario,) {
  fetch(`/acessos/listarporid?idAcesso=${id_usuario}`)
    .then(data => data.json())
    .then((data) => {
      var nome = data[0].nome
      var email = data[0].email
      var senhaAtual = data[0].senha
      var tipo_usuario = data[0].tipo_usuario

      document.getElementById("nomeAtualizarAcesso").value = nome;
      document.getElementById("emailAtualizarAcesso").value = email;
      document.getElementById("tipoUsuarioAtualizarAcesso").value = tipo_usuario;

      document.getElementById('btn-atualizar-acesso').innerHTML = `
      <button  class="btn_add" onclick="atualizarAcesso(${id_usuario}, ${senhaAtual})">Atualizar</button>
    `

      document.getElementById("modal-atualizar-acesso").style.display = "block";
    })
}

function atualizarAcesso(id_usuario, senha) {
  var nome = document.getElementById("nomeAtualizarAcesso").value;
  var email = document.getElementById("emailAtualizarAcesso").value;
  var tipoUsuario = document.getElementById("tipoUsuarioAtualizarAcesso").value;

  if (nome && email && senha && tipoUsuario && id_usuario) {
    fetch("/acessos/atualizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha,
        tipoUsuarioServer: tipoUsuario,
        idAcessoServer: id_usuario,
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
          title: 'Acesso atualizado com sucesso!'
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
          title: 'Houve um erro ao atualizar o acesso!'
        })
      }
    }).catch(function (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Houve um erro ao atualizar o acesso!',
      });
      console.log(e)
    })
  }

  closeModal('modal-atualizar-acesso')
}

function desativarAcesso(id_usuario) {
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
        fetch("/acessos/excluir", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idAcessoServer: id_usuario
          })
        }).then(function (resposta) {
          if (resposta.status == 200) {
            Swal.fire(
              'OK!',
              'Acesso excluido com sucesso!',
              'success'
            )
          }
        }).catch(function (erro) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Houve um erro ao apagar o acesso!",
          });
          console.log(erro);
        })
      }
    }
  })
}