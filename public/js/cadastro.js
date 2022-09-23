function trocarPagina() {
    let nomeFantasiaVar = input_nome_fantasia.value,
        razaoVar = input_razao.value,
        cnpjVar = input_cnpj.value,
        cepVar = input_cep.value;


    if (nomeFantasiaVar == "" || razaoVar == "" || cnpjVar == "" || cepVar == "") {
        alert("Preencha todos os campos")


    } else {

        let etapa = 0
        if (etapa0.style.display == "") {
            for (let contador = 0; contador == etapa; contador++) {
                etapa0.style.display = 'none'
                etapa1.style.display = ''
                document.getElementById("span_etapa").innerHTML = "Etapa 2/2"

            }
        }

        return { nomeFantasiaVar, razaoVar, cnpjVar, cepVar }


    }






}


// if (etapa == 1) {
//     etapa++
//     etapa0.style.display = 'none'
//     etapa1.style.display = 'none'
//     etapa2.style.display = 'flex'
//     isClickedButton = false
// }


function voltar() {
    if (etapa0.style.display == "") {
        for (let contador = 1; contador == etapa; contador--) {
            etapa0.style.display = ''
            etapa1.style.display = 'none'
            document.getElementById("span_etapa").innerHTML = "Etapa 1/2"

        }
    }

}

// Validação da etapa 1 do cadastro
function validarCadastroE1() {
    var nome_fantasia = input_nome_fantasia.value
    var razao = input_razao.value
    var cnpj = input_cnpj.value
    var cep = input_cep.value


    if (nome_fantasia == "") {
        valida_nome_fantasia.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else if (cnpj.lenght < 18) {
        valida_nome_fantasia.innerHTML = `<span style="color: red">CNPJ Invalido !! Verifique se esta digitando corretamente</span>`;
    } else {
        valida_nome_fantasia.innerHTML = `Valido`;
    }

    if (razao == "") {
        valida_razao.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else if (razao.lenght < 2) {
        valida_razao.innerHTML = `<span style="color: red">CNPJ Invalido !! Verifique se esta digitando corretamente</span>`;
    } else {
        valida_razao.innerHTML = `Valido`;
    }

    if (cnpj == "") {
        valida_cnpj.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else if (cnpj.lenght < 18) {
        valida_cnpj.innerHTML = `<span style="color: red">CNPJ Invalido !! Verifique se esta digitando corretamente</span>`;
    } else {
        valida_cnpj.innerHTML = `Valido`;
    }

    if (cep == "") {
        valida_cep.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else {
        valida_cep.innerHTML = "Valido";
    }

    trocarPagina()

}

// Validação da etapa 2 do cadastro
function validarCadastroE2() {
    var nome = input_nome.value
    var email = input_email.value
    var senha = input_senha.value
    var confirma_senha = input_confirmar_senha.value


    if (nome == "") {
        valida_nome.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else if (nome.lenght < 2) {
        valida_nome.innerHTML = `<span style="color: red">Nome Invalido !! Verifique se esta digitando corretamente</span>`;
    } else {
        valida_nome.innerHTML = `Valido`;
    }

    if (email == "") {
        valida_email.style.display = "block";
        valida_email.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else if (email.indexOf("@") && email.endsWith(".com")) {
        valida_email.innerHTML = `Valido`;
    } else {
        valida_email.innerHTML = `<span style="color: red">Email Invalido !! Verifique se esta digitando corretamente</span>`;
    }

    if (senha == "") {
        valida_senha.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else {
        valida_senha.innerHTML = "Valido";
    }

    if (confirma_senha == "") {
        valida_confirma_senha.innerHTML = `<span style="color: red">Preencha este campo para prosseguir !!!</span>`;
    } else if (confirma_senha != senha) {
        valida_confirma_senha.innerHTML = `<span style="color: red">Senhas não conferem !!!</span>`;
    } else {
        valida_confirma_senha.innerHTML = "Valido";
    }

}

function enviar() {
    let valores = trocarPagina();


    let nomeFantasiaVar = valores.nomeFantasiaVar,
        razaoVar = valores.razaoVar,
        cnpjVar = valores.cnpjVar,
        cepVar = valores.cepVar;

    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var confirmarSenhaVar = input_confirmar_senha.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmarSenhaVar == "") {
        alert("Preencha todos os campos")


    } else {



        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar_empresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js

                nomeFantasiaServer: nomeFantasiaVar,
                razaoServer: razaoVar,
                cnpjServer: cnpjVar,
                cepServer: cepVar

            })

        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                console.log("Empresa cadastrada com sucesso")

            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar_usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000")


            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        return false;
    }

}

