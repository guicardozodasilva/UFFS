<h2><?$titulo?></h2>

<!-- container de produtos -->
<div class="lista-produtos">
	<!-- um produto -->
	<?php
	if(empty($lista)) {
		echo "<p>Nenhum produto encontrado</p>";
	}
	else {
		foreach ($lista as $n => $v) {
			?>	
			<div class="produto">    
				<a href="produto.php?acao=altera&id=<?=$lista[$n]['id'];?>">                  
					<figure>                           
						<img src="img/produtos/<?=mostraImagem($lista[$n]['imagem']);?>" alt="<?=$lista[$n]['nome'];?>">
						<figcaption><?=$lista[$n]['nome'];?>
						<br>
						<?php 
						if($lista[$n]['desconto'] == 0)  {
						?>
							<span class="precoFinal"><?=formataPreco($lista[$n]['valor']);?></span>
						<?php
						}
						else {
							?>
							De <span class="precoInicial"><?=formataPreco($lista[$n]['valor']);?></span>
							por <span class="precoFinal"><?=formataPreco($lista[$n]['valor'] - 
							$lista[$n]['desconto']);?></span>
							<?php
						}
						?>
					</figcaption>                          
				</figure>      
			</a>              
			<p class="rapida">compra rápida</p>
		</div>
		<?php
		}
	}
	?>
</div>	<!-- fim lista produtos -->		