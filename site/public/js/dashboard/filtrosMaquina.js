function loadFiltros() {
    filtrosCategorias.innerHTML = ``
    filtrosCategorias.innerHTML = `
        <button onclick="filtrarPor('CPU')" style="background-color: #E9DF00">CPU (<span>2</span>)</button>
        <button onclick="filtrarPor('DISCO')" style="background-color: #FF7272">Disco (<span>2</span>)</button>
        <button onclick="filtrarPor('RAM')" style="background-color: #E911B9">RAM (<span>2</span>)</button>
        <button onclick="filtrarPor('FISICO')" style="background-color: #FFBE72">Físico (<span>2</span>)</button>
    `
}

function filtrarPor(componente) {
    switch (componente) {
        case "CPU":
            console.log('cpu')
            break;
        case "DISCO":
            console.log('disco')
            break;
        case "RAM":
            console.log('ram')
            break;
        case "FISICO":
            console.log('fisico')
            break;
        default:
            break;
    }
}