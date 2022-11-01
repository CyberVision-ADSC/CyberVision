function setViewConfig() {
    var isAdmin = sessionStorage.getItem('TIPO_USUARIO') ? sessionStorage.getItem('TIPO_USUARIO') : false

    containerPerfil.innerHTML = ""
    if (isAdmin) {
        containerPerfil.innerHTML += `
        <div>
        <span>Dados do usuário</span>
        <div>
            <label for="nomePerfil">Nome</label>
            <input type="text" id="nomePerfil">
        </div>
        <div>
            <label for="emailPerfil">Email</label>
            <input type="email" id="emailPerfil">
        </div>
        <div>
            <label for="senhaPerfil">Senha</label>
            <input type="email" value="********" disabled id="senhaPerfil">
        </div>
        <div>
            <label>Nível de acesso</label>
            <input type="text" disabled value="Comum">
        </div>

        <button onclick="atualizarUsuario()">Atualizar informações</button>
    </div>

    <div>
        <span>Dados da empresa</span>
        <div>
            <label for="razaoSocialPerfil">Razão social</label>
            <input type="text" id="razaoSocialPerfil">
        </div>
        <div>
            <label for="nomeFantasiaPerfil">Nome fantasia</label>
            <input type="text" id="nomeFantasiaPerfil">
        </div>
        <div>
            <label for="cnpjPerfil">CNPJ</label>
            <input type="text" id="cnpjPerfil">
        </div>
        <div>
            <label for="cepPerfil">CEP</label>
            <input type="text" id="cepPerfil">
        </div>
        <div>
    </div>

        <button onclick="atualizarEmpresa()">Atualizar informações</button>
    </div>
    `
    } else {
        containerPerfil.innerHTML += `
        <div>
        <span>Dados do usuário</span>
        <div>
            <label for="nomePerfil">Nome</label>
            <input type="text" disabled id="nomePerfil">
        </div>
        <div>
            <label for="emailPerfil">Email</label>
            <input type="email" disabled id="emailPerfil">
        </div>
        <div>
            <label for="senhaPerfil">Senha</label>
            <input type="email" value="********" disabled id="senhaPerfil">
        </div>
        <div>
            <label>Nível de acesso</label>
            <input type="text" disabled value="Administrador">
        </div>

        <div class="avisoPerfil">
            <image src="icons/icon-warning.svg" alt="Informativo">
            <p>Para sua segurança desabilitamos campos considerados sensíveis. Caso necessite alterar alguma informação desabilitada entre em contato com o seu administrador</p>
        </div>
    </div>

    <div>
        <span>Dados da empresa</span>
        <div>
            <label for="razaoSocialPerfil">Razão social</label>
            <input type="text" disabled id="razaoSocialPerfil">
        </div>
        <div>
            <label for="nomeFantasiaPerfil">Nome fantasia</label>
            <input type="text" disabled id="nomeFantasiaPerfil">
        </div>
        <div>
            <label for="cnpjPerfil">CNPJ</label>
            <input type="text" disabled id="cnpjPerfil">
        </div>
        <div>
            <label for="cepPerfil">CEP</label>
            <input type="text" disabled id="cepPerfil">
        </div>

        <div class="avisoPerfil">
            <image src="icons/icon-warning.svg" alt="Informativo">
            <p>Para sua segurança desabilitamos campos considerados sensíveis. Caso necessite alterar alguma informação desabilitada entre em contato com o seu administrador</p>
        </div>
    </div>
    `
    }
}

function atualizarUsuario() {
    Swal.fire({
        icon: 'success',
        title: 'OK!!',
        text: 'Informações do usuário atualizadas com sucesso.',
    })
}

function atualizarEmpresa() {
    Swal.fire({
        icon: 'success',
        title: 'OK!!',
        text: 'Informações da empresa atualizadas com sucesso.',
    })
}