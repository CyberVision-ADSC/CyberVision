
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

    if (razaoSocial.lenght > 2 && nomeFantasia.lenght > 2 && cnpj.lenght == 14 && cep.lenght == 8 && nome.lenght > 2 && email.lenght > 2 && email.indexOf('@') > 0 && email.indexOf('.') > 0 && senha.lenght >= 8) {
       alert("usuario cadastrado")
    }
}