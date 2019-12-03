<?php include "includes/cabecalho.php"; ?>
<?php include "includes/menu_lateral.php"; ?>
	<section class="col-2">
		<h2>Adicionar movimentacao</h2>
		<br>
		<div>
			<form action="adm/movimentacaoController.php?acao=cadastro" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="tipoMovimentacao" class="rotulo">Tipo movimentacao:</label><br>
					<select name="tipoMovimentacao" id="tipoMovimentacao" required>
						<option value="EN">Entrada</option>
						<option value="SD">Saída</option>
					</select>
					<span class="msg-erro" id="msg-tipoMovimentacao"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="formaPagamento" class="rotulo">Pagamento em:</label><br>
					<select name="formaPagamento" id="formaPagamento" required>
						<option value="DN">Dinheiro</option>
						<option value="CC">Cartão de crédito</option>
						<option value="CD">Cartão de débito</option>
						<option value="CQ">Cheque</option>
						<option value="BB">Boleto bancário</option>
						<option value="DB">Depósito bancário</option>
						<option value="OT">Outros</option>
					</select>
					<span class="msg-erro" id="msg-formaPagamento"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="parcela" class="rotulo">Total de parcelas:</label><br>
					<input type="number" id="parcela" name="parcela" size="5">
					<span class="msg-erro" id="msg-parcela"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="valor" class="rotulo">Valor:</label><br>
					<input type="text" id="valor" name="valor" size="15" required>
					<span class="msg-erro" id="msg-valor"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="dia" class="rotulo">Data:</label><br>
					<input type="date" id="data" name="data" required>
					<span class="msg-erro" id="msg-data"></span>
				</div>
				<br>
        <div class="form-item">
					<label for="idCategoria" class="rotulo">Categoria:</label><br>
					<select name="idCategoria" id="idCategoria">
						<option value="">Selecione a categoria</option>
						<?php
						require "classes/Movimentacao.php";
						$categoria = new Movimentacao();
						$listaCategoria = $categoria->listarCategoria();
						foreach($listaCategoria as $f)
							echo "<option value = \"{$f['id']}\">{$f['nome']}</option>";
						?>
					</select>
					<span class="msg-erro" id="msg-idCategoria"></span>
				</div>
        <br>
        <div class="form-item">
				  <label for="descricao" class="rotulo">Descrição:</label><br>
				  <textarea name="descricao" rows="5" cols="30" id="descricao"></textarea>
          <span class="msg-erro" id="msg-descricao"></span>
			  </div>
				<br>
				<div>
					<table>
						<tr>
							<td>
								<div>
									<input class="button" id="btnGravar" type="submit" value="Confirmar" name="cadastrar">
								</div>
							</td>
							<td>
								<div>
									<a class="button" id="btnEditar" href="adm/movimentacaoController.php">Ver Movimentações</a>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</form>
	</div>
</section>
</body>
</html>
