function loadIndicators() {
    fetch(`/kpi/quantidade-maquinas-ativas?idFaculdade=${1}`)
    .then(data => data.json())
    .then((data) => {
        document.getElementById("indicadorMaquinasAtivas").innerHTML = data[0].quantidade_ativo ? data[0].quantidade_ativo : 0
    })

    fetch(`/kpi/quantidade-maquinas-inativas?idFaculdade=${1}`)
    .then(data => data.json())
    .then((data) => {
        document.getElementById("indicadorMaquinasInativas").innerHTML = data[0].quantidade_inativo ? data[0].quantidade_inativo : 0
    })

    fetch(`/kpi/quantidade-maquinas-problemas?idFaculdade=${1}`)
    .then(data => data.json())
    .then((data) => {
        document.getElementById("indicadorMaquinasProblema").innerHTML = data[0].quantidade_problema ? data[0].quantidade_problema : 0
    })

    //integração com o JIRA
    document.getElementById("indicadorChamadosPendentes").innerHTML = 0
}

function loadGraficos() {
    
}