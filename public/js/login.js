function entrar() {
    const email = input_email.value;
    const senha = input_senha.value;

    if (email.length && senha.length) {

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id_usuario;
                });

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        setInterval(() => {
                            // window.location.href = 'dashboard.html'
                        }, 1500);
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Logado com sucesso!'
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuário ou senha inválidos',
                  })
                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuário ou senha inválidos',
              })

            console.log(erro);
        })

    } else {
        document.getElementById("errorLabel").style.opacity = 1
        document.getElementById("errorLabel").textContent = "Preencha os campos necessários!"
    }
}
