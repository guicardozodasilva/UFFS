/**
 * -------------------------------------------------
 * SCRIPT: Escalonamento em Máquinas Paralelas
 * MÉTODO: Heurística de Menor Carga (SEM ordenação)
 * -------------------------------------------------
 * COMO RODAR (Node.js)
 * 1) Abrir o terminal do VS Code (Ctrl + `)
 * 2) Ir até a pasta deste arquivo:
 *    cd "C:\UFFS\2025\GEX1088 - Tópicos especiais em computação XXXVIII\2025-09-04\Problema do Escalonamento de Tarefas em Máquinas Paralelas\JS"
 * 3) Executar:
 *    node .\heuristicaSemOrdenar.js
 * -------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

/**
 * Heurística simples (sem ordenar):
 * - Percorre as tarefas na ordem original
 * - Sempre coloca a próxima tarefa na máquina de menor carga
 * Retorna:
 *  - makespan (máximo das cargas)
 *  - dist (tarefas de cada máquina)
 *  - cargas (somatório de cada máquina)
 */
function escalonamentoHeuristicoSemOrdenar(nm, nt, t) {
    const cargas = new Array(nm).fill(0);                 // cargas das máquinas
    const dist = Array.from({ length: nm }, () => []);    // distribuição

    for (let i = 0; i < nt; i++) {
        // encontra índice da máquina com menor carga
        let idxMenor = 0;
        for (let m = 1; m < nm; m++) {
            if (cargas[m] < cargas[idxMenor]) idxMenor = m;
        }
        // aloca tarefa na máquina escolhida
        cargas[idxMenor] += t[i];
        dist[idxMenor].push(t[i]);
    }

    const makespan = Math.max(...cargas);
    return { makespan, dist, cargas };
}

/**
 * Lê instância no formato:
 * linha 1: nm
 * linha 2: nt
 * linha 3: tempos separados por espaço
 */
function lerInstancia(caminho) {
    const brut = fs.readFileSync(caminho, 'utf8').trim();
    const linhas = brut.split(/\r?\n/);

    const nm = parseInt(linhas[0], 10);
    const nt = parseInt(linhas[1], 10);
    const t = linhas[2].trim().split(/\s+/).map(Number);

    if (t.length !== nt) {
        console.warn(`Aviso: "${path.basename(caminho)}": nt = ${nt}, mas lidos ${t.length} tempos.`);
    }

    return { nm, nt, t };
}

// Caminho da pasta das instâncias
const pastaInstancias = path.join(__dirname, '../problema_escalonamento_instancias');

// Lista de arquivos .txt
const arquivos = fs.readdirSync(pastaInstancias)
  .filter(f => f.toLowerCase().endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

console.log(`Total de ${arquivos.length} instâncias de teste\n`);

const resultados = [];

// Processa cada instância
arquivos.forEach((arquivo, idx) => {
    const caminho = path.join(pastaInstancias, arquivo);
    const { nm, nt, t } = lerInstancia(caminho);

    console.log(`Instância ${idx + 1}`);
    console.time(arquivo);

    const { makespan, dist, cargas } = escalonamentoHeuristicoSemOrdenar(nm, nt, t);

    console.timeEnd(arquivo);

    console.log(`${arquivo} (${nm} máquinas, ${nt} tarefas): Makespan = ${makespan}`);
    console.log("Distribuição (heurística sem ordenar):");
    dist.forEach((maq, i) => {
        const soma = cargas[i];
        console.log(`  Máquina ${i + 1}: [${maq.join(', ')}] (total = ${soma})`);
    });
    console.log();

    resultados.push({ arquivo, makespan });
});

// Resumo geral
console.log("----- RESUMO GERAL (Heurística sem ordenação) -----");
resultados.forEach(r => console.log(`${r.arquivo}: ${r.makespan}`));