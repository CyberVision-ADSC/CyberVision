function loadTickets() {
    containerChamados.innerHTML = ""

    for (var posicao = 0; posicao < 5; posicao++) {
        var status = 'pendente'
        var nome = 'Ana'
        var mensagem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam habitasse pretium luctus urna, nisi, pellentesque. Facilisi tempor, viverra id tortor adipiscing mattis nisi. Id condimentum eget aliquet facilisi.'
        var andar = '01'
        var sala = '01'
        var idMaquina = '#4738572384'
        var sistemaOperacional = 'Linux'

        if (status == 'pendente') {
            containerChamados.innerHTML += `
            <div class="chamado">
            <div>
                <p>Aluno: <span>${nome}</span></p>
                <p>Mensagem: <span>${mensagem}</span></p>
                <p>Andar: <span>${andar}</span></p>
                <p>Sala: <span>${sala}</span></p>
                <p>ID máquina: <span>${idMaquina}</span></p>
                <p>Sistema operacional: <span>${sistemaOperacional}</span></p>
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
                <p>Aluno: <span>${nome}</span></p>
                <p>Mensagem: <span>${mensagem}</span></p>
                <p>Andar: <span>${andar}</span></p>
                <p>Sala: <span>${sala}</span></p>
                <p>ID máquina: <span>${idMaquina}</span></p>
                <p>Sistema operacional: <span>${sistemaOperacional}</span></p>
            </div>
            <div>
                <button class="btn-resolvido">Resolvido!</button>
            </div>
        </div>
            `
        }
    }
}