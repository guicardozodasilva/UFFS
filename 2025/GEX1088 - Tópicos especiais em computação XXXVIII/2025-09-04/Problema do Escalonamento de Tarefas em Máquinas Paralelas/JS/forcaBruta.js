/**
 * -------------------------------------------------
 * SCRIPT: Escalonamento de Tarefas em Máquinas Paralelas
 * MÉTODO: Força Bruta (Exato via Backtracking)
 * -------------------------------------------------
 * 
 * O que faz:
 *  - Lê arquivos de teste (.txt) com 3 parâmetros:
 *       1ª linha -> número de máquinas (nm)
 *       2ª linha -> número de tarefas (nt)
 *       3ª linha -> tempos de execução das tarefas (t)
 * 
 *  - Resolve o problema de escalonamento com Força Bruta:
 *       -> Gera TODAS as distribuições possíveis das tarefas
 *          nas máquinas.
 *       -> Calcula o makespan (máximo da carga das máquinas).
 *       -> Retorna o menor makespan possível (ótimo global).
 * 
 *  - Mostra no console:
 *       • Total de instâncias de teste
 *       • Para cada instância:
 *            - Nome do arquivo
 *            - Quantidade de máquinas e tarefas
 *            - Makespan ótimo
 *            - Distribuição ótima (tarefas em cada máquina)
 *            - Tempo de execução
 *       • No final, imprime um resumo geral (arquivo: makespan).
 * 
 * -------------------------------------------------
 * COMO RODAR ESSE SCRIPT (Node.js)
 * -------------------------------------------------
 * 1) Abrir o terminal do VS Code (Ctrl + `)
 * 2) Entrar na pasta onde está o arquivo:
 *    cd "C:\UFFS\2025\GEX1088 - Tópicos especiais em computação XXXVIII\2025-09-04\Problema do Escalonamento de Tarefas em Máquinas Paralelas\JS"
 *
 * 3) Rodar o script:
 *    node .\forcaBruta.js
 *
 * Obs: se tiver espaços no nome da pasta, use aspas no caminho.
 * -------------------------------------------------
 */

const fs = require('fs');     // Módulo para ler arquivos
const path = require('path'); // Módulo para lidar com caminhos de forma segura

// -------------------------------------------------
// Função: escalonamentoForcaBruta
// -------------------------------------------------
// Entrada:
//   nm = número de máquinas
//   nt = número de tarefas
//   t  = vetor com tempos de execução das tarefas
//
// Saída:
//   Retorna um objeto com:
//     - melhor: valor do makespan ótimo
//     - melhorDist: distribuição ótima das tarefas
//
// Lógica:
//   - Usa backtracking para tentar colocar cada tarefa
//     em todas as máquinas possíveis.
//   - Quando todas as tarefas estão alocadas, calcula o
//     makespan da distribuição.
//   - Guarda a melhor solução encontrada.
// -------------------------------------------------
function escalonamentoForcaBruta(nm, nt, t) {
    let melhor = Infinity;   // valor inicial (pior caso possível)
    let melhorDist = [];     // para guardar a melhor distribuição

    // Função recursiva de backtracking
    function backtrack(i, cargas, dist) {
        // Caso base: todas as tarefas foram alocadas
        if (i === nt) {
            const makespan = Math.max(...cargas); // pega a máquina mais carregada
            if (makespan < melhor) {
                melhor = makespan;                // atualiza o melhor makespan
                melhorDist = dist.map(maquina => [...maquina]); // copia a distribuição
            }
            return;
        }

        // Passo recursivo: tenta colocar a tarefa i em cada máquina
        for (let m = 0; m < nm; m++) {
            cargas[m] += t[i];      // adiciona a tarefa i na máquina m
            dist[m].push(t[i]);     // registra essa tarefa na distribuição

            backtrack(i + 1, cargas, dist); // chama recursivo para próxima tarefa

            cargas[m] -= t[i];      // desfaz a adição (backtracking)
            dist[m].pop();          // remove da distribuição
        }
    }

    // Inicializa com cargas zeradas e distribuição vazia
    backtrack(0, new Array(nm).fill(0), Array.from({ length: nm }, () => []));

    return { melhor, melhorDist };
}

// -------------------------------------------------
// Função: lerInstancia
// -------------------------------------------------
// Lê um arquivo de instância no formato especificado.
// Retorna um objeto {nm, nt, t}.
// -------------------------------------------------
function lerInstancia(caminho) {
    const brut = fs.readFileSync(caminho, 'utf8').trim();
    const linhas = brut.split(/\r?\n/);

    const nm = parseInt(linhas[0], 10);                // número de máquinas
    const nt = parseInt(linhas[1], 10);                // número de tarefas
    const t = linhas[2].trim().split(/\s+/).map(Number); // tempos das tarefas

    // Aviso se a quantidade de tarefas lida não bate
    if (t.length !== nt) {
        console.warn(`Aviso: no arquivo "${path.basename(caminho)}", nt = ${nt} mas foram lidos ${t.length} tempos.`);
    }

    return { nm, nt, t };
}

// -------------------------------------------------
// Parte principal do programa
// -------------------------------------------------

// Caminho da pasta com os arquivos de instância
//const pastaInstancias = path.join(__dirname, '../problema_escalonamento_instancias');
const pastaInstancias = path.join(__dirname, '../problema_escalonamento_2_maquinas_instancias');

// Pega todos os arquivos .txt e ordena
const arquivos = fs.readdirSync(pastaInstancias)
  .filter(f => f.toLowerCase().endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

// Mostra total de instâncias
console.log(`Total de ${arquivos.length} instâncias de teste\n`);

// Guarda resultados para o resumo final
const resultados = [];

// Processa cada instância
arquivos.forEach((arquivo, idx) => {
    const caminho = path.join(pastaInstancias, arquivo);
    const instancia = lerInstancia(caminho);

    console.log(`Instância ${idx + 1}`);
    console.time(arquivo); // cronômetro

    // Resolve com força bruta
    const { melhor, melhorDist } = escalonamentoForcaBruta(instancia.nm, instancia.nt, instancia.t);

    console.timeEnd(arquivo);

    // Mostra resultado detalhado
    console.log(`${arquivo} (${instancia.nm} máquinas, ${instancia.nt} tarefas): Makespan = ${melhor}`);
    console.log("Distribuição ótima:");
    melhorDist.forEach((maq, i) => {
        const soma = maq.reduce((a, b) => a + b, 0);
        console.log(`  Máquina ${i + 1}: [${maq.join(', ')}] (total = ${soma})`);
    });
    console.log();

    // Salva no resumo
    resultados.push({ arquivo, melhor });
});

// -------------------------------------------------
// Resumo geral: só mostra arquivo + makespan
// -------------------------------------------------
console.log("----- RESUMO GERAL -----");
resultados.forEach(r => {
    console.log(`${r.arquivo}: ${r.melhor}`);
});