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
                        <p>Nível de acesso: <span>${data[posicao].tipo_usuario ? data[posicao].tipo_usuario : "Comum"}</span></p>
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
                        <img onclick="openModalEditar(${data[posicao].id_usuario})" src="icons/icon-editar.svg" alt="editar"
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
  console.log("abriu o modal")
  document.getElementById("modal-adicionar-sala").style.display = "block";
}

// Usuário clica na <span> (x), fecha o modal
function closeModalCriar() {
  document.getElementById("modal-adicionar-sala").style.display = "none";
}

// Usuário clica em qualquer lugar fora do modal, fecha
window.onclick = function (event) {
  if (event.target == document.getElementById("modal-adicionar-sala")) {
    document.getElementById("modal-adicionar-sala").style.display = "none";
  }
  if (event.target == document.getElementById("modal-adicionar-maquina")) {
    document.getElementById("modal-adicionar-maquina").style.display = "none";
  }
}

function adicionarAcesso() {
  var nome = 'julia';
  var email = 'julia@gmail.com';
  var senha = '123456';
  var tipoUsuario = 'admin';

  // var nome =  document.getElementById("nomeAdicionarAcesso").innerHTML;
  // var email = document.getElementById("emailAdicionarAcesso").innerHTML;
  // var senha = document.getElementById("senhaAdicionarAcesso").innerHTML;
  // var tipoUsuario = document.getElementById("tipoUsuarioAdicionarAcesso").innerHTML;
  var fk_faculdade = sessionStorage.getItem('ID_FACULDADE')

  if (nome && email && senha && fk_faculdade) {
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
  }
}

function atualizarAcesso(id_usuario) {
  var nome = 'julia Silva';
  var email = 'juliaMaria@gmail.com';
  var senha = '12345678';
  var tipoUsuario = 'admin';

  // var nome =  document.getElementById("nomeAdicionarAcesso").innerHTML;
  // var email = document.getElementById("emailAdicionarAcesso").innerHTML;
  // var senha = document.getElementById("senhaAdicionarAcesso").innerHTML;
  // var tipoUsuario = document.getElementById("tipoUsuarioAdicionarAcesso").innerHTML;

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