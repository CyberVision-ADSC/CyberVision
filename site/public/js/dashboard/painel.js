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

    fetch(`/kpi/quantidade-chamados-pendentes?idFaculdade=${1}`)
        .then(data => data.json())
        .then((data) => {
            console.log(data)
            document.getElementById("indicadorChamadosPendentes").innerHTML = data[0].quantidade_chamados ? data[0].quantidade_chamados : 0
        })

}

let proximaAtualizacao;
function obterDadosGrafico(idFaculdade) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/kpi/quantidade-problemas/${idFaculdade}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log(idFaculdade)

                plotarGrafico(resposta, idFaculdade);
            });
        } if (response.status == 204) {
            console.log('sem dados')

        } else {
            console.error(' erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

let proximaAtualizacao2;
function obterDadosGraficoAndar(idFaculdade) {
    if (proximaAtualizacao2 != undefined) {
        clearTimeout(proximaAtualizacao2);
    }

    var idG = document.getElementById("grafico1")
    var idDiv = document.getElementById("div_gf_1")

    if (idG != null) {
        idDiv.removeChild(idG)
        clearTimeout(proximaAtualizacao2)
        var newCanva = document.createElement("canvas")
        idDiv.appendChild(newCanva)
        newCanva.id = "grafico1"
    }

    fetch(`/kpi/quantidade-problemas-andar/${idFaculdade}`).then(function (response) {
        console.log("----")
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log(idFaculdade)
                console.log("OBTIVE O GRAFICOOOOOOOOOOOOOOOOOOOOOOOOOOO")
                plotarGraficoAndar(resposta, idFaculdade);
            });
        } if (response.status == 204) {
            console.log('sem dados')

        } else {
            console.error(' erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

let proximaAtualizacao3;
function obterDadosGraficoTempoReal(idFaculdade) {
    if (proximaAtualizacao3 != undefined) {
        clearTimeout(proximaAtualizacao3);
    }

    var idG = document.getElementById("grafico3")
    var idDiv = document.getElementById("div_gf_3")

    if (idG != null) {
        idDiv.removeChild(idG)
        clearTimeout(proximaAtualizacao3)
        var newCanva = document.createElement("canvas")
        idDiv.appendChild(newCanva)
        newCanva.id = "grafico3"
    }

    fetch(`/kpi/tempo-real/${idFaculdade}`).then(function (response) {
        console.log("----")
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log()

                plotarGraficoTempoReal(resposta, idFaculdade);
            });
        } if (response.status == 204) {
            alert("Sem dados")
            // COLOCAR ALGO DE ERRO
        } else {
            console.error(' erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idFaculdade) {
    console.log('iniciando plotagem do gráfico...');

    let dados = {
        labels: ["RAM", "DISCO", "CPU", "FISICO"],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
        }]
    };

    console.log(resposta[0].ram)
    dados.datasets[0].data.push(resposta[0].ram);
    dados.datasets[0].data.push(resposta[1].ram);
    dados.datasets[0].data.push(resposta[2].ram);
    dados.datasets[0].data.push(resposta[3].ram);

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'pie',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('grafico2'),
        config
    );
    setTimeout(() => atualizarGrafico(idFaculdade, dados, myChart), 6000);
}

function plotarGraficoAndar(resposta, idFaculdade) {
    console.log('iniciando plotagem do gráfico...');
    var labeiu = []
    for (let c = 0; c < resposta.length; c++) {
        labeiu.push(resposta[c].andar)

    }
    let dados = {

        labels: labeiu,
        datasets: []

    };
    var barras = {
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
        ],
    }
    for (let c = 0; c < resposta.length; c++) {
        dados.datasets.push(barras)

    }
    for (let i = 0; i < resposta.length; i++) {
        dados.datasets[i].data.push(resposta[i].problemas_totais);
        dados.datasets[i].label = 'Andares' // incluir uma nova medida de umidade
        // incluir uma nova medida de umidade
    }
    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
    // Criando estrutura para plotar gráfico - config
    const config2 = {
        type: 'bar',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart2 = new Chart(
        document.getElementById('grafico1'),
        config2
    );
    setTimeout(() => atualizarGraficoAndar(idFaculdade, dados, myChart2), 6000);
}
function plotarGraficoTempoReal(resposta, idFaculdade) {
    console.log('iniciando plotagem do gráfico...');
    let dados = {
        labels: ["CPU", "DISCO", "RAM"],
        datasets: [{
            label: 'Maquina',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 206, 86, 1)',
            ],
        }]
    };
    console.log(resposta)
    for (let i = 0; i < resposta.length; i++) {
        dados.datasets[0].data.push(resposta[i].uso_cpu);
        dados.datasets[0].data.push(resposta[i].uso_disco);
        dados.datasets[0].data.push(resposta[i].uso_ram);
    }
    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
    // Criando estrutura para plotar gráfico - config
    const config3 = {
        type: 'bar',
        data: dados,
    };
    // Adicionando gráfico criado em div na tela
    let myChart3 = new Chart(
        document.getElementById('grafico3'),
        config3
    );
    setTimeout(() => atualizarGraficoTempoReal(idFaculdade, dados, myChart3), 3000);

}
// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idFaculdade, dados, myChart) {
    fetch(`/kpi/quantidade-problemas/${idFaculdade}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);
                // tirando e colocando valores no gráfico
                dados.datasets[0].data.shift();
                dados.datasets[0].data.shift();
                dados.datasets[0].data.shift();
                dados.datasets[0].data.shift();

                dados.datasets[0].data.push(novoRegistro[0].ram); // incluir uma nova medida de umidade
                dados.datasets[0].data.push(novoRegistro[1].ram);
                dados.datasets[0].data.push(novoRegistro[2].ram);// incluir uma nova medida de temperatura
                dados.datasets[0].data.push(novoRegistro[3].ram);
                myChart.update();
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idFaculdade, dados, myChart), 6000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idFaculdade, dados, myChart), 6000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function atualizarGraficoAndar(idFaculdade, dados, myChart2) {
    fetch(`/kpi/quantidade-problemas-andar/${idFaculdade}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);
                // tirando e colocando valores no gráfico
                for (let i = 0; i < dados.datasets.length; i++) {
                    dados.datasets[i].data.shift();
                }

                for (let i = 0; i < dados.datasets.length; i++) {
                    dados.datasets[i].data.push(novoRegistro[i].problemas_totais);
                }
                myChart2.update();
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao2 = setTimeout(() => atualizarGraficoAndar(idFaculdade, dados, myChart2), 6000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao2 = setTimeout(() => atualizarGraficoAndar(idFaculdade, dados, myChart2), 6000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoTempoReal(idFaculdade, dados, myChart3) {
    fetch(`/kpi/tempo-real/${idFaculdade}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);
                dados.datasets[0].data.shift();
                dados.datasets[0].data.shift();
                dados.datasets[0].data.shift();
                // tirando e colocando valores no gráfico
                dados.datasets[0].data.push(novoRegistro[0].uso_cpu);
                dados.datasets[0].data.push(novoRegistro[0].uso_disco);
                dados.datasets[0].data.push(novoRegistro[0].uso_ram);
                myChart3.update();

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao3 = setTimeout(() => atualizarGraficoTempoReal(idFaculdade, dados, myChart3), 3000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao3 = setTimeout(() => atualizarGraficoTempoReal(idFaculdade, dados, myChart3), 3000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

var sessao = sessionStorage.ID_FACULDADE;
obterDadosGrafico(sessao)

var sessao2 = sessionStorage.ID_FACULDADE;
obterDadosGraficoAndar(sessao2)