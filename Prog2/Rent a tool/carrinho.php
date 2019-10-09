<?php
include "includes/cabecalho.php";
include "includes/menu-lateral.php";
?>

<section class="col-2">
	<h2>Meu Carrinho</h2>

	<table class="tab-produtos">
		<tr id="lin-1">
			<th>Nome do produto</th>
			<th>Valor unitário (R$)</th>
			<th>Quantidade</th>
			<th>Total produto (R$)</th>
		</tr>
		<tr>
			<td id="produto1">Projetor multimídia</td>
			<td id="valorUnProduto1">R$ 20,00</td>
			<td><input type="number" id="qntProduto1" name="qntProduto1" min="1" value="1" ></td>
			<td><span id="totalProduto1"></span></td>
			<td>✖</td>
		</tr>
		<tr>
			<td id="produto2">Mangueira</td>
			<td id="valorUnProduto2">R$ 10,00</td>
			<td><input type="number" id="qntProduto2" name="qntProduto2" min="1" value="1" ></td>
			<td><span id="totalProduto2"></span></td>
			<td>✖</td>
		</tr>       
		<tr>
			<td id="produto3">Lavadora de alta pressão</td>
			<td id="valorUnProduto3">R$ 30,00</td>
			<td><input type="number" id="qntProduto3" name="qntProduto3" min="1" value="1" ></td>
			<td><span id="totalProduto3"></span></td>
			<td>✖</td>
		</tr>    
	</table>

	<br>

	<fieldset>
		<legend>Frete</legend>
		<label class="frete">Retirar no local:</label>
		<label><input type="radio" name="frete" value="rl" id="retirarLocal" checked>R$ 0,00</label>
		<br>
		<label class="frete">Receber em casa:</label>
		<label><input type="radio" name="frete" value="rc" id="receberCasa">R$ 20,00</label>
	</fieldset>

	<br>

	<fieldset>
		<legend>Total a pagar (R$)</legend>
		<div id="totalPagar"></div>
	</fieldset>

	<br>

	<div class="botoes">	
		<a href="index.php"><input type="button" value="Continuar comprando" id="continuarComprando"></a>
		<a href="fecharPedido.php"><input type="button" value="Finalizar pedido" id="finalizarPedido"></a>
	</div>

</section>

<?php include "includes/mais-pedidos.php"; ?>

</div>
<!-- fim area central -->

<?php include "includes/footer.php"; ?>

<script src="js/index.js"></script>
<script src="js/carrinho.js"></script>

</body>
</html>