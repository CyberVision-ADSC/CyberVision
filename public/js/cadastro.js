function ativarCheckbox() {
  var checkbox = document.querySelector("#checkbox");
  checkbox.checked = true;
}

function desativarCheckbox() {
  var checkbox = document.querySelector("#checkbox");
  checkbox.checked = false;
}

function dicas(){
    // Altera a cor da borda das inputs do cadastro caso o usuário não
    // preencha-as corretamente
    if (this.value === ''){
        this.style.border = "1px solid red";
    } else {
       this.style.border = "1px solid green";
    }

}
document.getElementById("inputRazaoSocial").addEventListener('blur', dicas);
document.getElementById("inputNomeFantasia").addEventListener('blur', dicas);
document.getElementById("inputCnpj").addEventListener('blur', dicas);
document.getElementById("inputCep").addEventListener('blur', dicas);

function nextEtapa() {
  const razaoSocial = inputRazaoSocial.value;
  const nomeFantasia = inputNomeFantasia.value;
  const cnpj = inputCnpj.value;
  const cep = inputCep.value;

  var cepRegex =  /^(\d{5})(\d{3})/;
  var cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;

  if (razaoSocial && nomeFantasia && cnpj && cep) {
    if (cnpj && cep) {
      document.getElementById("business").style.display = "none";
      document.getElementById("user").style.display = "flex";
      ativarCheckbox();
    }
  } else {
    document.getElementById("errorLabel").style.opacity = 1;
    document.getElementById("errorLabel").textContent =
      "Preencha os campos necessários!";
  }
}

function voltarEtapa() {
  document.getElementById("business").style.display = "";
  document.getElementById("user").style.display = "none";
  desativarCheckbox()
}

function cadastrar() {
  const razaoSocial = inputRazaoSocial.value;
  const nomeFantasia = inputNomeFantasia.value;
  const cnpj = inputCnpj.value;
  const cep = inputCep.value;
  const nome = inputNome.value;
  const email = inputEmail.value;
  const senha = inputSenha.value;

  if ((razaoSocial, nomeFantasia, cnpj, cep, nome, email, senha)) {
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha,
        cnpjServer: cnpj,
        nomeFantasiaServer: nomeFantasia,
        razaoServer: razaoSocial,
        cepServer: cep,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              setInterval(() => {
                window.location.href = "login.html";
              }, 1500);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Cadastrado com sucesso!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Houve um erro ao tentar realizar o cadastro!",
          });
        }
      })
      .catch(function (resposta) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Houve um erro ao tentar realizar o cadastro!",
        });
        console.log(`#ERRO: ${resposta}`);
      });
  }
}

function mascara(type) {
  if (type == "cnpj") {
    inputCnpj.value =  inputCnpj.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  } else {
    inputCep.value = inputCep.value.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1.$2-$3")
  }
}