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
            setSelected("div_painel")
            break;
        case "maquinas":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'flex'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'none'
            loadMaquinas()
            setSelected("div_maquinas")
            loadFiltros('FACULDADE')

            document.getElementById('botaoAdicionar').innerHTML = `
            <button onclick="adicionarMaquina()" class="add_maquina">Adicionar máquina
            <img src="./icons/icon-circlePlus.svg" alt="Adicionar" style="margin-left: 5px;">
            </button>
            `
            break;
        case "acessos":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'flex'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'none'
            setSelected("div_acessos")
            loadAcessos()
            break;
        case "chamados":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'flex'
            document.getElementById("configuracao").style.display = 'none'
            loadTickets()
            setSelected("div_chamados")
            break;
        case "configuracao":
            document.getElementById("painel").style.display = 'none'
            document.getElementById("maquinas").style.display = 'none'
            document.getElementById("acessos").style.display = 'none'
            document.getElementById("chamados").style.display = 'none'
            document.getElementById("configuracao").style.display = 'flex'
            setSelected("div_config")
            setViewConfig()
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

function setSelected(view) {
    switch (view) {
        case "div_painel":
            document.getElementById("div_painel").style.fontWeight = 'bold'
            document.getElementById("div_painel").style.borderRight = '4px solid #7197F9'

            document.getElementById("div_maquinas").style.fontWeight = '500'
            document.getElementById("div_maquinas").style.borderRight = '0px'

            document.getElementById("div_acessos").style.fontWeight = '500'
            document.getElementById("div_acessos").style.borderRight = '0px'

            document.getElementById("div_chamados").style.fontWeight = '500'
            document.getElementById("div_chamados").style.borderRight = '0px'

            document.getElementById("div_config").style.fontWeight = '500'
            document.getElementById("div_config").style.borderRight = '0px'

            break
        case "div_maquinas":
            document.getElementById("div_maquinas").style.fontWeight = 'bold'
            document.getElementById("div_maquinas").style.borderRight = '4px solid #7197F9'

            document.getElementById("div_painel").style.fontWeight = '500'
            document.getElementById("div_painel").style.borderRight = '0px'

            document.getElementById("div_acessos").style.fontWeight = '500'
            document.getElementById("div_acessos").style.borderRight = '0px'

            document.getElementById("div_chamados").style.fontWeight = '500'
            document.getElementById("div_chamados").style.borderRight = '0px'

            document.getElementById("div_config").style.fontWeight = '500'
            document.getElementById("div_config").style.borderRight = '0px'
            break;
        case "div_acessos":
            document.getElementById("div_acessos").style.fontWeight = 'bold'
            document.getElementById("div_acessos").style.borderRight = '4px solid #7197F9'

            document.getElementById("div_maquinas").style.fontWeight = '500'
            document.getElementById("div_maquinas").style.borderRight = '0px'

            document.getElementById("div_painel").style.fontWeight = '500'
            document.getElementById("div_painel").style.borderRight = '0px'

            document.getElementById("div_chamados").style.fontWeight = '500'
            document.getElementById("div_chamados").style.borderRight = '0px'

            document.getElementById("div_config").style.fontWeight = '500'
            document.getElementById("div_config").style.borderRight = '0px'
            break;
        case "div_chamados":
            document.getElementById("div_chamados").style.fontWeight = 'bold'
            document.getElementById("div_chamados").style.borderRight = '4px solid #7197F9'

            document.getElementById("div_maquinas").style.fontWeight = '500'
            document.getElementById("div_maquinas").style.borderRight = '0px'

            document.getElementById("div_painel").style.fontWeight = '500'
            document.getElementById("div_painel").style.borderRight = '0px'

            document.getElementById("div_acessos").style.fontWeight = '500'
            document.getElementById("div_acessos").style.borderRight = '0px'

            document.getElementById("div_config").style.fontWeight = '500'
            document.getElementById("div_config").style.borderRight = '0px'
            break;
        case "div_config":
            document.getElementById("div_config").style.fontWeight = 'bold'
            document.getElementById("div_config").style.borderRight = '4px solid #7197F9'

            document.getElementById("div_acessos").style.fontWeight = '500'
            document.getElementById("div_acessos").style.borderRight = '0px'

            document.getElementById("div_maquinas").style.fontWeight = '500'
            document.getElementById("div_maquinas").style.borderRight = '0px'

            document.getElementById("div_painel").style.fontWeight = '500'
            document.getElementById("div_painel").style.borderRight = '0px'

            document.getElementById("div_chamados").style.fontWeight = '500'
            document.getElementById("div_chamados").style.borderRight = '0px'

            break;
        default:
            document.getElementById("div_painel").style.fontWeight = 'bold'
            document.getElementById("div_painel").style.borderRight = '4px solid #7197F9'

            document.getElementById("div_maquinas").style.fontWeight = '500'
            document.getElementById("div_maquinas").style.borderRight = '0px'

            document.getElementById("div_acessos").style.fontWeight = '500'
            document.getElementById("div_acessos").style.borderRight = '0px'

            document.getElementById("div_chamados").style.fontWeight = '500'
            document.getElementById("div_chamados").style.borderRight = '0px'

            document.getElementById("div_config").style.fontWeight = '500'
            document.getElementById("div_config").style.borderRight = '0px'
            break;
    }
}

function loggout() {
    sessionStorage.clear()
    window.location.href = 'login.html'
}