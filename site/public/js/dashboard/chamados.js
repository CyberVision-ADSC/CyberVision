function loadTickets() {
    containerChamados.innerHTML = ""

    for (var posicao = 0; posicao < 2; posicao++) {
        var categoriaChamado = "Problema físico"
        var status = 'pendente'
        var identificadorAluno = '01221083'
        var mensagem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam habitasse pretium luctus urna, nisi, pellentesque. Facilisi tempor, viverra id tortor adipiscing mattis nisi. Id condimentum eget aliquet facilisi.'
        var andar = '01'
        var sala = '01'
        var idMaquina = '#4738572384'
        var sistemaOperacional = 'Linux'

        if (status == 'pendente') {
            containerChamados.innerHTML += `
            <div class="chamado">
            <div>
                <p>Data: <span>22/09/2022 08:50</span></p>
                <p>Categoria do chamado: <span>${categoriaChamado}</span></p>
                <p>RA do Aluno: <span>${identificadorAluno}</span></p>
                <p>Andar: <span>${andar}</span></p>
                <p>Sala: <span>${sala}</span></p>
                <p>Identificador da máquina: <span>${idMaquina}</span></p>
                <p>Sistema operacional: <span>${sistemaOperacional}</span></p>
                <p>Descrição: <span>${mensagem}</span></p>
            </div>
            <div>
                <button class="btn-pendente">Pendente!</button>
            </div>
        </div>
            `
        } else {
            containerChamados.innerHTML += `
            <div class="chamado">
            <div>
                <p>Data: <span>22/09/2022 08:50</span></p>
                <p>Categoria do chamado: <span>${categoriaChamado}</span></p>
                <p>RA do Aluno: <span>${identificadorAluno}</span></p>
                <p>Andar: <span>${andar}</span></p>
                <p>Sala: <span>${sala}</span></p>
                <p>Identificador da máquina: <span>${idMaquina}</span></p>
                <p>Sistema operacional: <span>${sistemaOperacional}</span></p>
                <p>Descrição: <span>${mensagem}</span></p>
            </div>
            <div>
                <button class="btn-resolvido">Resolvido!</button>
            </div>
        </div>
            `
        }
    }
}

function filtrarChamadosPor() {
    let opcao = document.getElementById('filtrarChamados').value

    switch (opcao) {
        case "CPU":
            console.log('cpu')
            break;
        case "DISCO":
            console.log('disco')
            break;
        case "RAM":
            console.log('ram')
            break;
        case "FISICO":
            console.log('fisico')
            break;
        default:
            break;
    }
}