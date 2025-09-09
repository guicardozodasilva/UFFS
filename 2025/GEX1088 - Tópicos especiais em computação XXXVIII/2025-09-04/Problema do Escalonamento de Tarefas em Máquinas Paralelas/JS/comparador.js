/**
 * -------------------------------------------------
 * SCRIPT: Comparador de Métodos de Escalonamento
 * PROBLEMA: Máquinas Paralelas (Minimização do Makespan)
 * -------------------------------------------------
 * MÉTODOS COMPARADOS
 *  - Força Bruta (Exato via backtracking)  -> encontra o ÓTIMO global.
 *  - Heurística LPT (Longest Processing Time) -> ordena tempos desc. e aloca na máquina de menor carga.
 *  - Heurística Sem Ordenação -> segue a ordem original e aloca na máquina de menor carga.
 *
 * MÉTRICA
 *  - Makespan: valor máximo do tempo/carga entre as máquinas ao final do escalonamento.
 *
 * DEFINIÇÃO DE GAP (para heurísticas vs. ótimo)
 *  - Gap absoluto = Makespan_heurística - Makespan_ótimo
 *  - Gap percentual = (Gap absoluto / Makespan_ótimo) * 100
 *
 * PRINCIPAIS RESULTADOS OBSERVADOS (do experimento do aluno)
 *  - LPT ficou muito próximo do ótimo na maioria das instâncias e, quando não foi ótima,
 *    o desvio foi baixo (ex.: 6,25% em m03_n10_01).
 *  - A heurística sem ordenação teve desempenho mais fraco, chegando a ~35,56% acima do ótimo
 *    em alguns casos (ex.: m07_n10_02).
 *
 * CONCLUSÕES
 *  - Força Bruta garante o ótimo, porém tem custo exponencial (nm^nt) e escala mal.
 *  - LPT é uma alternativa prática: soluções de alta qualidade com baixo custo computacional.
 *  - A versão sem ordenação é simples, porém menos confiável (gaps maiores).
 *
 * COMO RODAR (Node.js)
 * 1) Abrir o terminal do VS Code (Ctrl + `)
 * 2) Ir até a pasta deste arquivo:
 *    cd "C:\UFFS\2025\GEX1088 - Tópicos especiais em computação XXXVIII\2025-09-04\Problema do Escalonamento de Tarefas em Máquinas Paralelas\JS"
 * 3) Executar:
 *    node .\comparador.js
 * -------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

// ====================== CONFIGURAÇÕES ======================
const SHOW_DISTRIBUTIONS = true; // coloque false se quiser esconder as distribuições por máquina
// ==========================================================

// ---------------------- Utilidades ------------------------
function fmt2(x) {
  return Number.isFinite(x) ? x.toFixed(2) : String(x);
}
function pad(str, width) {
  str = String(str);
  return str.length >= width ? str : str + ' '.repeat(width - str.length);
}
function soma(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
function printDistribuicao(titulo, dist, cargas) {
  console.log(titulo);
  dist.forEach((maq, i) => {
    const total = cargas ? cargas[i] : soma(maq);
    console.log(`  Máquina ${i + 1}: [${maq.join(', ')}] (total = ${total})`);
  });
}
// ----------------------------------------------------------

// ----------------- Leitura da Instância -------------------
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
// ----------------------------------------------------------

// --------------- Força Bruta (ÓTIMO, Exato) ---------------
function forcaBruta(nm, nt, t) {
  let melhor = Infinity;
  let melhorDist = [];
  let melhorCargas = [];

  function backtrack(i, cargas, dist) {
    if (i === nt) {
      const makespan = Math.max(...cargas);
      if (makespan < melhor) {
        melhor = makespan;
        melhorDist = dist.map(maquina => [...maquina]);
        melhorCargas = [...cargas];
      }
      return;
    }
    for (let m = 0; m < nm; m++) {
      cargas[m] += t[i];
      dist[m].push(t[i]);
      backtrack(i + 1, cargas, dist);
      dist[m].pop();
      cargas[m] -= t[i];
    }
  }

  backtrack(0, new Array(nm).fill(0), Array.from({ length: nm }, () => []));
  return { makespan: melhor, dist: melhorDist, cargas: melhorCargas };
}
// ----------------------------------------------------------

// -------- Heurística LPT (ordena desc e aloca no min) -----
function heuristicaLPT(nm, nt, t) {
  const tarefas = [...t].sort((a, b) => b - a);
  const cargas = new Array(nm).fill(0);
  const dist = Array.from({ length: nm }, () => []);

  for (let i = 0; i < nt; i++) {
    let idxMenor = 0;
    for (let m = 1; m < nm; m++) {
      if (cargas[m] < cargas[idxMenor]) idxMenor = m;
    }
    cargas[idxMenor] += tarefas[i];
    dist[idxMenor].push(tarefas[i]);
  }
  return { makespan: Math.max(...cargas), dist, cargas };
}
// ----------------------------------------------------------

// ---- Heurística simples (sem ordenar: segue a ordem t) ---
function heuristicaSemOrdenar(nm, nt, t) {
  const cargas = new Array(nm).fill(0);
  const dist = Array.from({ length: nm }, () => []);
  for (let i = 0; i < nt; i++) {
    let idxMenor = 0;
    for (let m = 1; m < nm; m++) {
      if (cargas[m] < cargas[idxMenor]) idxMenor = m;
    }
    cargas[idxMenor] += t[i];
    dist[idxMenor].push(t[i]);
  }
  return { makespan: Math.max(...cargas), dist, cargas };
}
// ----------------------------------------------------------

// ------------------- Principal (main) ---------------------
const pastaInstancias = path.join(__dirname, '../problema_escalonamento_instancias');
const arquivos = fs.readdirSync(pastaInstancias)
  .filter(f => f.toLowerCase().endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

console.log(`Total de ${arquivos.length} instâncias de teste\n`);

const resumo = []; // para o sumário final

arquivos.forEach((arquivo, idx) => {
  const caminho = path.join(pastaInstancias, arquivo);
  const { nm, nt, t } = lerInstancia(caminho);

  console.log(`Instância ${idx + 1}: ${arquivo} (${nm} máquinas, ${nt} tarefas)`);

  console.time('Força Bruta');
  const opt = forcaBruta(nm, nt, t);
  console.timeEnd('Força Bruta');

  console.time('Heurística LPT');
  const lpt = heuristicaLPT(nm, nt, t);
  console.timeEnd('Heurística LPT');

  console.time('Heurística Sem Ordenar');
  const hno = heuristicaSemOrdenar(nm, nt, t);
  console.timeEnd('Heurística Sem Ordenar');

  // Resultados
  console.log(`  ÓTIMO (Força Bruta):        ${opt.makespan}`);
  console.log(`  Heurística LPT:             ${lpt.makespan}  (gap = +${lpt.makespan - opt.makespan}, ${fmt2(((lpt.makespan - opt.makespan) / opt.makespan) * 100)}%)`);
  console.log(`  Heurística Sem Ordenar:     ${hno.makespan}  (gap = +${hno.makespan - opt.makespan}, ${fmt2(((hno.makespan - opt.makespan) / opt.makespan) * 100)}%)`);

  if (SHOW_DISTRIBUTIONS) {
    printDistribuicao('  Dist. ÓTIMA (Força Bruta):', opt.dist, opt.cargas);
    printDistribuicao('  Dist. Heurística LPT:', lpt.dist, lpt.cargas);
    printDistribuicao('  Dist. Heurística Sem Ordenar:', hno.dist, hno.cargas);
  }
  console.log();

  resumo.push({
    arquivo,
    opt: opt.makespan,
    lpt: lpt.makespan,
    gapLPT: lpt.makespan - opt.makespan,
    pctLPT: ((lpt.makespan - opt.makespan) / opt.makespan) * 100,
    hno: hno.makespan,
    gapHNO: hno.makespan - opt.makespan,
    pctHNO: ((hno.makespan - opt.makespan) / opt.makespan) * 100,
  });
});

// --------------------- Resumo Final -----------------------
console.log('----- RESUMO GERAL -----');
const header =
  pad('Arquivo', 32) +
  pad('Ótimo', 8) +
  pad('LPT', 8) +
  pad('Gap LPT', 10) +
  pad('% LPT', 8) +
  pad('SemOrd', 8) +
  pad('Gap SOrd', 10) +
  pad('% SOrd', 8);
console.log(header);
console.log('-'.repeat(header.length));

resumo.forEach(r => {
  console.log(
    pad(r.arquivo, 32) +
    pad(r.opt, 8) +
    pad(r.lpt, 8) +
    pad('+' + r.gapLPT, 10) +
    pad(fmt2(r.pctLPT) + '%', 8) +
    pad(r.hno, 8) +
    pad('+' + r.gapHNO, 10) +
    pad(fmt2(r.pctHNO) + '%', 8)
  );
});