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
				<a href="#">                  
					<figure>                           
						<img src="img/produtos/<?=$lista[$n]['imagem'];?>" alt="<?=$lista[$n]['nome'];?>">
						<figcaption><?=$lista[$n]['nome'];?>
						<br><span class="precoFinal"><?=$lista[$n]['valor'] - $lista[$n]['desconto'];?></span>
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