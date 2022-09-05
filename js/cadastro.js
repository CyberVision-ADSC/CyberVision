function trocarPagina(){
    let etapa = 0
    if(etapa0.style.display == ""){
        for(let contador = 0; contador == etapa; contador++){
            etapa0.style.display = 'none'
            etapa1.style.display = ''
            document.getElementById("span_etapa").innerHTML = "Etapa 2/2"

        }
    }

    // if (etapa == 1) {
    //     etapa++
    //     etapa0.style.display = 'none'
    //     etapa1.style.display = 'none'
    //     etapa2.style.display = 'flex'
    //     isClickedButton = false
    // }
}

function voltar(){
    if(etapa0.style.display == ""){
        for(let contador = 1; contador == etapa; contador--){
            etapa0.style.display = ''
            etapa1.style.display = 'none'
            document.getElementById("span_etapa").innerHTML = "Etapa 1/2"

        }
    }

}