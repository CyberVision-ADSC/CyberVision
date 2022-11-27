function loadTickets() {
    containerChamados.innerHTML = ""

    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
    fetch(`/chamados/listar?idFaculdade=${idFaculdade}`)
        .then(data => data.json())
        .then((data) => {
            for (var posicao = 0; posicao < data.length; posicao++) {
                containerChamados.innerHTML += `
                <div class="chamado">
                <div>
                    <p>Criado em: <span>${data[posicao].data_hora_criacao_formatada}</span></p>
                    <p>Resolvido em: <span>${data[posicao].data_hora_conclusao_formatada ? data[posicao].data_hora_conclusao_formatada : "--"}</span></p>
                    <p>RA do Aluno: <span>${data[posicao].ra_aluno}</span></p>
                    <p>Andar: <span>${data[posicao].identificador_andar}</span></p>
                    <p>Sala: <span>${data[posicao].identificador_sala}</span></p>
                    <p>Identificador da máquina: <span>#${data[posicao].hostname}</span></p>
                    <p>Sistema operacional: <span>${data[posicao].sistema_operacional}</span></p>
                    <p>Descrição: <span>${data[posicao].descricao_ocorrido}</span></p>
                </div>
                <div>
                    ${data[posicao].status_chamado == 'Pendente' ? `<button onclick="alterarStatus(${data[posicao].id_chamado})" class="btn-pendente">Pendente!</button>` : '<button class="btn-resolvido">Finalizado!</button>'}
                </div>
            </div>
                `
            }
        })
}

function alterarStatus(idChamado) {
    let data = moment().format("YYYY-MM-DD HH:mm:ss");

    swal.fire({
        title: 'Você tem certeza?',
        text: "Você não será capaz de reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero finalizar o chamado!',
        cancelButtonText: 'Não, cancelar!',
        confirmButtonColor: '#FF5353',
        cancelButtonColor: '#14B424',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
                fetch("/chamados/alterar-status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idChamado: idChamado,
                        dataAtual: data,
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
                            title: 'Chamado atualizado com sucesso!'
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
                            title: 'Houve um erro ao atualizar o chamado!'
                        })
                    }
                }).catch(function (e) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: 'Houve um erro ao atualizar o chamado!',
                    });
                    console.log(e)
                })
            }
        }
    })
}

function filtrarChamadosPor() {
    containerChamados.innerHTML = ""
    var idFaculdade = sessionStorage.getItem('ID_FACULDADE')
    let opcao = document.getElementById('filtrarChamados').value

    switch (opcao) {
        case "MAIS-RECENTE":
            fetch(`/chamados/listar-por-mais-recente?idFaculdade=${idFaculdade}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        containerChamados.innerHTML += `
                        <div class="chamado">
                        <div>
                            <p>Criado em: <span>${data[posicao].data_hora_criacao_formatada}</span></p>
                            <p>Resolvido em: <span>${data[posicao].data_hora_conclusao_formatada ? data[posicao].data_hora_conclusao_formatada : "--"}</span></p>
                            <p>RA do Aluno: <span>${data[posicao].ra_aluno}</span></p>
                            <p>Andar: <span>${data[posicao].identificador_andar}</span></p>
                            <p>Sala: <span>${data[posicao].identificador_sala}</span></p>
                            <p>Identificador da máquina: <span>#${data[posicao].hostname}</span></p>
                            <p>Sistema operacional: <span>${data[posicao].sistema_operacional}</span></p>
                            <p>Descrição: <span>${data[posicao].descricao_ocorrido}</span></p>
                        </div>
                        <div>
                            ${data[posicao].status_chamado == 'Pendente' ? `<button onclick="alterarStatus(${data[posicao].id_chamado})" class="btn-pendente">Pendente!</button>` : '<button class="btn-resolvido">Finalizado!</button>'}
                        </div>
                    </div>
                        `
                    }
                })
            break;
        case "MENOS-RECENTE":
            fetch(`/chamados/listar-por-menos-recente?idFaculdade=${idFaculdade}`)
                .then(data => data.json())
                .then((data) => {
                    for (var posicao = 0; posicao < data.length; posicao++) {
                        containerChamados.innerHTML += `
                        <div class="chamado">
                        <div>
                            <p>Criado em: <span>${data[posicao].data_hora_criacao_formatada}</span></p>
                            <p>Resolvido em: <span>${data[posicao].data_hora_conclusao_formatada ? data[posicao].data_hora_conclusao_formatada : "--"}</span></p>
                            <p>RA do Aluno: <span>${data[posicao].ra_aluno}</span></p>
                            <p>Andar: <span>${data[posicao].identificador_andar}</span></p>
                            <p>Sala: <span>${data[posicao].identificador_sala}</span></p>
                            <p>Identificador da máquina: <span>#${data[posicao].hostname}</span></p>
                            <p>Sistema operacional: <span>${data[posicao].sistema_operacional}</span></p>
                            <p>Descrição: <span>${data[posicao].descricao_ocorrido}</span></p>
                        </div>
                        <div>
                            ${data[posicao].status_chamado == 'Pendente' ? `<button onclick="alterarStatus(${data[posicao].id_chamado})" class="btn-pendente">Pendente!</button>` : '<button class="btn-resolvido">Finalizado!</button>'}
                        </div>
                    </div>
                        `
                    }
                })
            break;
        default:
            loadTickets()
            break;
    }
}