<?php include "includes/cabecalho.php"; ?>
<?php include "includes/menu_lateral.php"; ?>
	<section class="col-2">
		<h2>Gerar relatório</h2>
		<br>
		<div>
			<form action="" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="tipo" class="rotulo">Tipo:</label><br>
					<select name="tipo" id="tipo">
						<option value="TD">Todos</option>
						<option value="RC">Recebimento</option>
					</select>
					<span class="msg-erro" id="msg-tipo"></span>
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
					<label for="dataInicial" class="rotulo">Data inicial:</label><br>
					<input type="date" id="dataInicial" name="dataInicial">
					<span class="msg-erro" id="msg-dataInicial"></span>
				</div>
				<br>	
				<div class="form-item">
                        <label for="dataFinal" class="rotulo">Data final:</label><br>
                        <input type="date" id="dataFinal" name="dataFinal">
                        <span class="msg-erro" id="msg-dataFinal"></span>
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
									<a class="button" id="btnAdicionar" href="#">Adicionar</a>
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