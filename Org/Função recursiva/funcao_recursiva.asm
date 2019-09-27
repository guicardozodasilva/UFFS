main:
	addi 	a0, zero, 5 		#fatorial de n
	jal 	fatorial
	ebreak
fatorial:
	beq 	a0, zero, fim_laco	#verifica se o laco acabou
	addi 	sp, sp, -8		
	sw 	a0, 4(sp)
	sw 	ra, 0(sp)
	addi	a0, a0, -1		
	jal 	fatorial 
	lw 	a0, 4(sp)
	lw 	ra, 0(sp)
	addi 	sp, sp, 8
	j 	mult
mult:
	mul 	a1,a1,a0
	ret
fim_laco: 	
	addi 	a1, zero, 1
	ret
