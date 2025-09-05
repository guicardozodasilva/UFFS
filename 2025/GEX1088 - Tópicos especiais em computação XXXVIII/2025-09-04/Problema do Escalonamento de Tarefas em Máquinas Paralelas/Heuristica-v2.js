/* 
Desenvolver javascript para resolver o problema do escalonamento de tarefas em máquinas paralelas utilizando uma heurística

Função em javascript que lê 3 parâmetros:
- nm: número de máquinas
- nt: número de tarefas
- t: array com o tempo de execução de cada tarefa

A função deve retornar o valor máximo do tempo total de execução entre as máquinas após o escalonamento das tarefas utilizando a heurística de menor carga
*/

function escalonamentoTarefas(nm, nt, t) {
    let cargas = new Array(nm).fill(0);
    
    for (let i = 0; i < nt; i++) {
        let minIndex = cargas.indexOf(Math.min(...cargas));
        cargas[minIndex] += t[i];
    }
    return cargas;
}

let nm = 3;
let nt = 5;
let t = [2, 14, 4, 16, 6];

let resultado = escalonamentoTarefas(nm, nt, t);

console.log(Math.max(...resultado));