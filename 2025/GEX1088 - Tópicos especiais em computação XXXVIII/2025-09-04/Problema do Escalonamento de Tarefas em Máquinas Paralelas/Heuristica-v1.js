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

/*instance_m03_n05_01_sol

3
5
18 27 21 27 36


Jobs: [18, 27, 21, 27, 36]
Machines: 3
Best Makespan: 48
Best Assignment: (0, 0, 1, 1, 2)

57
*/

/*instance_m03_n07_01

3
7
20 8 32 24 30 44 44


Jobs: [20, 8, 32, 24, 30, 44, 44]
Machines: 3
Best Makespan: 70
Best Assignment: (0, 1, 1, 2, 1, 0, 2)

76
*/

/*instance_m03_n10_01

3
10
32 20 34 33 24 15 15 29 35 48


Jobs: [32, 20, 34, 33, 24, 15, 15, 29, 35, 48]
Machines: 3
Best Makespan: 96
Best Assignment: (0, 0, 1, 2, 1, 0, 2, 0, 1, 2)

112
*/

/*instance_m05_n05_01

5
5
29 41 49 41 34


Jobs: [29, 41, 49, 41, 34]
Machines: 5
Best Makespan: 49
Best Assignment: (0, 1, 2, 3, 4)

49
*/

/*instance_m05_n06_01

5
6
11 8 34 39 28 44


Jobs: [11, 8, 34, 39, 28, 44]
Machines: 5
Best Makespan: 44
Best Assignment: (0, 0, 1, 2, 3, 4)

52
*/

/*instance_m05_n10_01_sol

5
10
4 33 21 40 9 44 47 47 7 46


Jobs: [4, 33, 21, 40, 9, 44, 47, 47, 7, 46]
Machines: 5
Best Makespan: 73
Best Assignment: (0, 1, 0, 1, 2, 0, 2, 3, 2, 4)

86
*/

let nm = 3;
let nt = 5;
let t = [18, 27, 21, 27, 36];

let resultado = escalonamentoTarefas(nm, nt, t);

console.log(Math.max(...resultado));