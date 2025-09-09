/**
 * -------------------------------------------------
 * SCRIPT: Escalonamento em Máquinas Paralelas
 * MÉTODO: Heurística de Menor Carga (LPT)
 * -------------------------------------------------
 * COMO RODAR (Node.js)
 * 1) Abrir o terminal do VS Code (Ctrl + `)
 * 2) Ir até a pasta deste arquivo:
 *    cd "C:\UFFS\2025\GEX1088 - Tópicos especiais em computação XXXVIII\2025-09-04\Problema do Escalonamento de Tarefas em Máquinas Paralelas\JS"
 * 3) Executar:
 *    node .\heuristica.js
 * -------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

/**
 * Heurística LPT (Longest Processing Time):
 * - Ordena tarefas por tempo decrescente
 * - A cada tarefa, aloca na máquina com menor carga atual
 * Retorna:
 *  - makespan (máximo entre as cargas)
 *  - dist (array de arrays: tarefas de cada máquina)
 *  - cargas (somatório por máquina)
 */
function escalonamentoHeuristico(nm, nt, t) {
    // cópia para não alterar o vetor original externamente
    const tarefas = [...t].sort((a, b) => b - a);

    // cargas e distribuição por máquina
    const cargas = new Array(nm).fill(0);
    const dist = Array.from({ length: nm }, () => []);

    for (let i = 0; i < nt; i++) {
        // encontra a máquina de menor carga
        let idxMenor = 0;
        for (let m = 1; m < nm; m++) {
            if (cargas[m] < cargas[idxMenor]) idxMenor = m;
        }
        // aloca a tarefa i na máquina de menor carga
        cargas[idxMenor] += tarefas[i];
        dist[idxMenor].push(tarefas[i]);
    }

    const makespan = Math.max(...cargas);
    return { makespan, dist, cargas };
}

/**
 * Lê uma instância no formato:
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

// Caminho da pasta das instâncias (mesmo padrão do script anterior)
const pastaInstancias = path.join(__dirname, '../problema_escalonamento_instancias');

// Lista ordenada de .txt
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

    const { makespan, dist, cargas } = escalonamentoHeuristico(nm, nt, t);

    console.timeEnd(arquivo);

    console.log(`${arquivo} (${nm} máquinas, ${nt} tarefas): Makespan = ${makespan}`);
    console.log("Distribuição (heurística):");
    dist.forEach((maq, i) => {
        const soma = cargas[i];
        console.log(`  Máquina ${i + 1}: [${maq.join(', ')}] (total = ${soma})`);
    });
    console.log();

    resultados.push({ arquivo, makespan });
});

// Resumo geral
console.log("----- RESUMO GERAL (Heurística) -----");
resultados.forEach(r => console.log(`${r.arquivo}: ${r.makespan}`));
