function validarSessao() {
    idUsuario = sessionStorage.ID_USUARIO
    nome = sessionStorage.NOME_USUARIO
    email = sessionStorage.EMAIL_USUARIO
  
    // if (idUsuario == null && nome == null && email == null) {
    //   window.location = "login.html";
    // }
}

function openSidebar() {
    document.getElementById("sidebar").style.marginLeft = 0
    document.getElementById("backgroundCloseOffCanva").style.display = 'flex'
}

function closeSidebar() {
    document.getElementById("sidebar").style.marginLeft = "-250px"
    document.getElementById("backgroundCloseOffCanva").style.display = 'none'
}

function changeView(view) {
    switch (view) {
        case "painel":
            document.getElementById("painel").style.display = 'flex'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'none'
            break;
        case "maquinas":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'flex'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'none'
            loadMaquinas()
            break;
        case "acessos":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'flex'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'none'
            break;
        case "chamados":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'flex'
            document.getElementById("configuracao").style.display = 'none'
            loadTickets()
            break;
        case "configuracao":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'flex'
            break;
        default:
            document.getElementById("painel").style.display = 'flex'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'none'
            break;
    }

    var largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (largura <= 900) {
        closeSidebar()
    }
}

function loggout() {
    sessionStorage.clear()
    window.location.href = 'login.html'
  }