function setViewConfig() {
    containerPerfil.innerHTML = ""
    var id_usuario = sessionStorage.getItem('ID_USUARIO')
    if (id_usuario) {
        fetch(`/acessos/listarporid?idAcesso=${id_usuario}`)
            .then(data => data.json())
            .then((data) => {
                if (sessionStorage.getItem('TIPO_USUARIO') == 'admin') {
                    containerPerfil.innerHTML += `
                <div>
                <span>Dados do usuário</span>
                <div>
                    <label for="nomePerfil">Nome</label>
                    <input type="text" id="nomePerfil" value='${data[0].nome}'>
                </div>
                <div>
                    <label for="emailPerfil">Email</label>
                    <input type="email" id="emailPerfil" value='${data[0].email}'>
                </div>
                <div>
                    <label>Nível de acesso</label>
                    <input type="text" disabled value='${data[0].tipo_usuario}'>
                </div>
        
                <button onclick="atualizarUsuario(${data[0].id_usuario})">Atualizar informações</button>
            </div>
        
            <div>
                <span>Dados da empresa</span>
                <div>
                    <label for="razaoSocialPerfil">Razão social</label>
                    <input type="text" id="razaoSocialPerfil" disabled value='${data[0].razao_social}'>
                </div>
                <div>
                    <label for="nomeFantasiaPerfil">Nome fantasia</label>
                    <input type="text" id="nomeFantasiaPerfil" disabled value='${data[0].nome_fantasia}'>
                </div>
                <div>
                    <label for="cnpjPerfil">CNPJ</label>
                    <input type="text" id="cnpjPerfil" disabled value='${mascaraCnpj(data[0].cnpj)}'>
                </div>
                <div>
                    <label for="cepPerfil">CEP</label>
                    <input type="text" id="cepPerfil" disabled value='${mascaraCep(data[0].cep)}'>
                </div>
                <div>
            </div>
        
            <div class="avisoPerfil">
                <image src="icons/icon-warning.svg" alt="Informativo">
                <p>Para sua segurança desabilitamos campos considerados sensíveis. Caso necessite alterar alguma informação desabilitada entre em contato com o seu administrador</p>
            </div>
            </div>
            `
                } else {
                    containerPerfil.innerHTML += `
                <div>
                <span>Dados do usuário</span>
                <div>
                    <label for="nomePerfil">Nome</label>
                    <input type="text" disabled id="nomePerfil" value='${data[0].nome}'>
                </div>
                <div>
                    <label for="emailPerfil">Email</label>
                    <input type="email" disabled id="emailPerfil" value='${data[0].email}'>
                </div>
                <div>
                    <label>Nível de acesso</label>
                    <input type="text" disabled value='${data[0].tipo_usuario}'>
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
                    <input type="text" disabled id="razaoSocialPerfil" value='${data[0].razao_social}'>
                </div>
                <div>
                    <label for="nomeFantasiaPerfil">Nome fantasia</label>
                    <input type="text" disabled id="nomeFantasiaPerfil" value='${data[0].nome_fantasia}'>
                </div>
                <div>
                    <label for="cnpjPerfil">CNPJ</label>
                    <input type="text" disabled id="cnpjPerfil" value='${mascaraCnpj(data[0].cnpj)}'>
                </div>
                <div>
                    <label for="cepPerfil">CEP</label>
                    <input type="text" disabled id="cepPerfil" value='${mascaraCep(data[0].cep)}'>
                </div>
        
                <div class="avisoPerfil">
                    <image src="icons/icon-warning.svg" alt="Informativo">
                    <p>Para sua segurança desabilitamos campos considerados sensíveis. Caso necessite alterar alguma informação desabilitada entre em contato com o seu administrador</p>
                </div>
            </div>
            `
                }
            }).catch(function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Houve um erro ao carregar o perfil!",
                });
                console.log(e)
            });
    }

    inserirMascaras()
}

function atualizarUsuario() {
    var id_usuario = sessionStorage.getItem('ID_USUARIO')
    var nome = document.getElementById("nomePerfil").value
    var email = document.getElementById("emailPerfil").value

    if (nome && email && id_usuario) {
        fetch("/usuarios/atualizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
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
                    title: 'Perfil atualizado com sucesso!'
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
                    title: 'Houve um erro ao atualizar o seu perfil!'
                })
            }
        }).catch(function (e) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Houve um erro ao atualizar o seu perfil!',
            });
            console.log(e)
        })
    }
}

function mascaraCnpj(valor) {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
}

function mascaraCep(valor) {
    return valor.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1.$2-$3");
}