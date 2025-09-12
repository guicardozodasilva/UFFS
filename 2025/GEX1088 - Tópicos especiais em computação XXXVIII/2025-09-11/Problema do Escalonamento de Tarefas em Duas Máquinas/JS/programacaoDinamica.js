/* 
 * -------------------------------------------------
 * COMO RODAR ESSE SCRIPT (Node.js)
 * -------------------------------------------------
 * 1) Abrir o terminal do VS Code (Ctrl + `)
 * 2) Entrar na pasta onde está o arquivo:
 *    cd "C:\UFFS\2025\GEX1088 - Tópicos especiais em computação XXXVIII\2025-09-11\Problema do Escalonamento de Tarefas em Duas Máquinas\JS"
 *
 * 3) Rodar o script:
 *    node .\programacaoDinamica.js
 *
 * Obs: se tiver espaços no nome da pasta, use aspas no caminho.
 * -------------------------------------------------
Problema do Escalonamento de Tarefas em Duas Máquinas
algoritmo de programação dinâmica 
*/

function solve(n, tempo_total_ml, tabela) {
    if (tabela[n][tempo_total_ml] !== undefined) {
        return tabela[n][tempo_total_ml];
    }

    if (n == 0) {
        if(tempo_total_ml == 0){
            tabela[n][tempo_total_ml] = true;
            return true;
        } else if(tempo_total_ml > 0){
            tabela[n][tempo_total_ml] = false;
            return false;
    } else {
            console.error("tempo_total_ml n˜ao pode ser negativo");
            return false;
        }
    }

    if (solve((n - 1), tempo_total_ml, tabela)) {
        tabela[n][tempo_total_ml] = true;
        return true;
    }

    if (tempo_total_ml >= t[n - 1] && solve(n - 1, tempo_total_ml - t[n - 1], tabela)) {
        tabela[n][tempo_total_ml] = true;
        return true;
    }

    tabela[n][tempo_total_ml] = false;
    return false;
}

var m = 2;
var n = 25; 
var t = [34, 24, 7, 42, 49, 14, 28, 34, 4, 47, 24, 41, 37, 27, 37, 30, 16, 13, 24, 13, 34, 40, 11, 25, 8]; 

var met_soma_tempos = 0;
for (let i = 0; i < t.length; i++) {
    met_soma_tempos += t[i];
}

var met_soma_tempos = Math.floor(met_soma_tempos / 2);

var tabela = [];
for (let i = 0; i <= n; i++) {
    tabela.push(new Array(met_soma_tempos + 1).fill(undefined));
}
var i = met_soma_tempos;
var inicio = performance.now();
while (solve(n, i, tabela) == false) {
    i -= 1;
}
var fim = performance.now();

//t.reduce((a, b) => a + b, 0) = sum(t) em Python
var makespan = Math.max(i, t.reduce((a, b) => a + b, 0) - i);

console.log("Tempo:", (fim - inicio).toFixed(3), "ms");
console.log("Machines:", m);
console.log("Makespan:", makespan);








