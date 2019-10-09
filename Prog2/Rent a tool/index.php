<?php
include "includes/cabecalho.php";
include "includes/menu-lateral.php";
?>

<!-- area central com 3 colunas -->
<div class="container">
	<br>
	<section class="col-2">
		<?php
		require_once "classes/Produto.php";
		$produto = new Produto();

		//controller
		if(isset($_GET['busca'])) {
			$lista = $produto->filtroBusca($_GET['busca']);
			$titulo = "Resultado da busca por \"{$_GET['busca']}\"";
		}
		else {
			$lista = $produto->filtroNovidades();
			$titulo = "Novidades";
		}

		require_once "views/listaProdutos.php"

		?>
	</section>

	<?php include "includes/mais-pedidos.php"; ?>

</div>
<!-- fim area central -->

<?php include "includes/footer.php"; ?>

<!-- chamando javascript  -->
<script src="js/index.js"></script>
</body>
</html>
