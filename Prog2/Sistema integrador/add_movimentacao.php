<?php include "includes/cabecalho.php"; ?>
<?php include "includes/menu_lateral.php"; ?>
	<section class="col-2">
		<h2>Adicionar movimentacao</h2>
		<br>
		<div>
			<form action="" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="tipoMovimentacao" class="rotulo">Tipo movimentacao:</label><br>
					<select name="tipoMovimentacao" id="tipoMovimentacao">
						<option value="EN">Entrada</option>
						<option value="SD">Saída</option>
					</select>
					<span class="msg-erro" id="msg-tipoMovimentacao"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="pagamento" class="rotulo">Pagamento em:</label><br>
					<select name="pagamento" id="pagamento">
						<option value="DN">Dinheiro</option>
						<option value="CC">Cartão de crédito</option>
						<option value="CD">Cartão de débito</option>
						<option value="CQ">Cheque</option>
						<option value="BB">Boleto bancário</option>
						<option value="DB">Depósito bancário</option>
						<option value="OT">Outros</option>
					</select>
					<span class="msg-erro" id="msg-pagamento"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="parcelas" class="rotulo">Total de parcelas:</label><br>
					<input type="text" id="parcelas" name="parcelas" size="5">
					<span class="msg-erro" id="msg-parcelas"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="valor" class="rotulo">Valor:</label><br>
					<input type="text" id="valor" name="valor" size="15">
					<span class="msg-erro" id="msg-valor"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="dia" class="rotulo">Data:</label><br>
					<input type="date" id="data" name="data">
					<span class="msg-erro" id="msg-data"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="categoria" class="rotulo">Categoria:</label><br>
					<select name="categoria" id="categoria">
						<option value="">Selecione</option>
					</select>
					<span class="msg-erro" id="msg-categoria"></span>
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
									<a class="button" id="btnEditar" href="adm/movimentacaoController.php">Ver movimentacoes</a>
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