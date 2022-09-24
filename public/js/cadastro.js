function ativarCheckbox() {
    var checkbox = document.querySelector("#checkbox");
    checkbox.checked = true;
}

function nextEtapa() {
    const razaoSocial = inputRazaoSocial.value
    const nomeFantasia = inputNomeFantasia.value
    const cnpj = inputCnpj.value
    const cep = inputCep.value
    
    if (razaoSocial && nomeFantasia && cnpj && cep) {
        document.getElementById("business").style.display = 'none'
        document.getElementById("user").style.display = 'flex'
        ativarCheckbox()
    } else {
        document.getElementById("errorLabel").style.opacity = 1
        document.getElementById("errorLabel").textContent = "Preencha os campos necessários!"
    }
}

function cadastrar() {
    const razaoSocial = inputRazaoSocial.value
    const nomeFantasia = inputNomeFantasia.value
    const cnpj = inputCnpj.value
    const cep = inputCep.value
    const nome = inputNome.value
    const email = inputEmail.value
    const senha = inputSenha.value

    if (razaoSocial, nomeFantasia, cnpj, cep, nome, email, senha) {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                cnpjServer: cnpj,
                nomeFantasiaServer: nomeFantasia,
                razaoServer: razaoSocial,
                cepServer: cep,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        setInterval(() => {
                            window.location.href = 'login.html'
                        }, 1500);
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Cadastrado com sucesso!'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Houve um erro ao tentar realizar o cadastro!',
                  })
            }
        }).catch(function (resposta) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro ao tentar realizar o cadastro!',
              })
            console.log(`#ERRO: ${resposta}`);
        });
    }
}