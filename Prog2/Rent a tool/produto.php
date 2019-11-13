<?php
include "includes/cabecalho.php";
?>

<!-- area central com 3 colunas -->
<div class="container">
	<?php include "includes/menu-lateral.php"; ?>
	<br>
	<section class="col-2">
		<?php
		require_once "classes/Produto.php";
		require_once "includes/functions.php";
		require "classes/Fabricante.php";
		$produto = new Produto();

		//controller
		if(isset($_GET['busca'])) {
			$lista = $produto->filtroBusca($_GET['busca']);
			$titulo = "Resultado da busca por \"{$_GET['busca']}\"";
		}
		elseif(isset($_GET['cat'])) {
			$lista = $produto->filtroCategoria($_GET['cat']);
			$titulo = $CATEGORIAS[$_GET['cat']];
		}
		else {
			$lista = $produto->filtroNovidades();
			$titulo = "Novidades";
		}

		


		$prod = $produto->consultaProduto($_GET['id']);
		?>

		<h2><?=$prod[0]['nomeProduto']?></h2>
		<br>
		<div class="produto-individual">		
			<figure> 
				<img src="img/produtos/<?=mostraImagem($prod[0]['imagem']);?>">
			</figure>
		</div>


		<div class="preco">
			<?php 
			if($prod[0]['desconto'] == 0)  {
			?>
				<span class="precoFinal"><?=formataPreco($prod[0]['valor']);?></span>
				<?php
			}
			else {
				?>
				De <span class="precoInicial"><?=formataPreco($prod[0]['valor']);?></span>
				por <span class="precoFinal"><?=formataPreco($prod[0]['valor'] - 
				$prod[0]['desconto']);?></span>
				<?php
			}
			?>
		</div>

		<br>

		<fieldset>
		<div class="form-item">
			<label for="qntProduto" class="rotulo">Quantidade:</label>
			<input type="number" id="qntProduto" name="qntProduto" min="1" value="1" >
		</div>	
		<br>
		<div class="form-item">
				<label class="rotulo"></label>
				<a href="adiciona.php"><input type="button" id="botao" value="Adicionar ao carrinho"></a>
		</div>
		</fieldset>

		<fieldset>
			<legend>Detalhes do produto</legend>
			<label for="nomeFabricante" class="rotulo">Nome do fabricante:</label> 
			<?=($prod[0]['nomeFabricante']!=NULL)? $prod[0]['nomeFabricante']:"não informado";?>
			<br>
			<br>
			<label for="tensao" class="rotulo">Tensão:</label> 
			<?=($prod[0]['tensao']!=0)? $prod[0]['tensao']:"não se aplica";?>
			<br>
			<br>
			<label for="desc" class="rotulo">Descrição:</label> <br> <?=nl2br($prod[0]['descricao'])?>
			<br>
			<br>
			<label for="cat" class="rotulo">Categorias:</label>
			
			<label><?=($prod[0]['catMarcenaria']==1)? "Marcenaria":"";?></label>
			<label><?=($prod[0]['catJardinagem']==1)? "Jardinagem":"";?></label>
			<label><?=($prod[0]['catLimpeza']==1)? "Limpeza":"";?></label>
			<label><?=($prod[0]['catEscritorio']==1)? "Escritório":"";?></label>
			<label><?=($prod[0]['catMecanica']==1)? "Mecânica":"";?></label>
			<label><?=($prod[0]['catOutros']==1)? "Outros":"";?></label>
		</fieldset>


		
	</section>

	<?php include "includes/mais-pedidos.php"; ?>

</div>
<!-- fim area central -->

<?php include "includes/footer.php"; ?>

<!-- chamando javascript  -->
<script src="js/index.js"></script>
</body>
</html>
