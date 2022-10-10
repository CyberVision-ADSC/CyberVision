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