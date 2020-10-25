def newton(f, f_linha, x0, erro, max_iteracao = 50):
    
    if abs(f(x0)) <= erro:
        return x0
    
    print("k\t x0\t\t f(x0)")
    k = 1

    while k <= max_iteracao:
        x1 = x0 - f(x0) / f_linha(x0)
        #print("%d\t%e\t%e"%(k, x1, f(x1)))
        print("xn->", x0)
        print("f(x)-> ", f(x0))
        print("f'(x)-> ", f_linha(x0))
        print("xn+1->", x1)
        print("")

        if abs(f(x1)) <= erro:
                return x1

        x0 = x1
        k = k + 1
    
    print("ERRO: Numero maximo de iteracoes atingido")
    return x1

#define f(x) e f_linha(x)
if __name__ == "__main__":
    def f(x):
        return -x**2 + 3.15122*x + 37.10474
    def f_linha(x):
        return -2*x + 3.15122

raiz = newton(f, f_linha,  6, 0.001)

print(raiz)


