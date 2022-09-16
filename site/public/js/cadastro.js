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

        return {nomeFantasiaVar, razaoVar, cnpjVar, cepVar}
        

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

function enviar(){
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


    }else{


        
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

