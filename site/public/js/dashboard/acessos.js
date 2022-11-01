function loadAcessos() {
  document.getElementById("containerAcessos").innerHTML = ""
  document.getElementById("containerAcessos").innerHTML += `
            <div class="itemAcesso">
                    <div>
                        <p>Nome: <span>Teste Usuário</span></p>
                        <p>Email: <span>teste@usuario.com</span></p>
                        <p>Nível de acesso: <span>Comum</span></p>
                    </div>
                    <div>
                        <img onclick="openModalEditar()" src="icons/icon-editar.svg" alt="editar"
                            style="margin-left: 5px;">
                        <img onclick="desativarAcesso()" src="icons/icon-deletar.svg" alt="apagar"
                            style="margin-left: 5px;">
                    </div>
                </div>
  `
}

function openModalCriar() {

}

function openModalEditar() {

}

function adicionarAcesso() {

}

function atualizarAcesso() {

}

function desativarAcesso() {
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
        Swal.fire(
          'OK!',
          'O acesso foi excluido com sucesso!',
          'success'
        )
      }
    }
  })
}