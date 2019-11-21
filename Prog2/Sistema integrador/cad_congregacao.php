<?php include "includes/cabecalho.php"; ?>
<?php include "includes/menu_lateral.php"; ?>
	<section class="col-2">
		<h2>Cadastrar congregação</h2>
		<br>
		<div>
			<form action="adm/congregacaoController.php?acao=cadastro" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="nome" class="rotulo">Nome:</label><br>
					<input type="text" id="nome" name="nome" size="50" placeholder="Nome da congregação" required autofocus>
					<span class="msg-erro" id="msg-nome"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="cnpj" class="rotulo">CNPJ:</label><br>
					<input type="text" id="cnpj" name="cnpj" size="20" placeholder="Número do CNPJ" required >
					<span class="msg-erro" id="msg-cnpj"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="endereco" class="rotulo">Endereço:</label><br>
					<input type="text" id="endereco" name="endereco" placeholder="Rua, número, complemento" size="50" required >
					<span class="msg-erro" id="msg-endereco"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="bairro" class="rotulo">Bairro:</label><br>
					<input type="text" id="bairro" name="bairro" placeholder="Nome do bairro" size="50" required >
					<span class="msg-erro" id="msg-bairro"></span>
				</div>
				<br>	
				<div class="form-item">
					<label for="cidade" class="rotulo">Cidade:</label><br>
					<input type="text" id="cidade" name="cidade" placeholder="Nome da cidade" size="50" required >
					<span class="msg-erro" id="msg-cidade"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="estado" class="rotulo">Estado:</label><br>
					<select name="uf" id="estado">
						<option value="">Selecione o estado</option>
						<option value="AC">AC</option>
						<option value="AL">AL</option>
						<option value="AM">AM</option>
						<option value="AP">AP</option>
						<option value="BA">BA</option>
						<option value="CE">CE</option>
						<option value="DF">DF</option>
						<option value="ES">ES</option>
						<option value="GO">GO</option>
						<option value="MA">MA</option>
						<option value="MG">MG</option>
						<option value="MS">MS</option>
						<option value="MT">MT</option>
						<option value="PA">PA</option>
						<option value="PB">PB</option>
						<option value="PE">PE</option>
						<option value="PI">PI</option>
						<option value="PR">PR</option>
						<option value="RJ">RJ</option>
						<option value="RN">RN</option>
						<option value="RS">RS</option>
						<option value="RO">RO</option>
						<option value="RR">RR</option>
						<option value="SC">SC</option>
						<option value="SE">SE</option>
						<option value="SP">SP</option>
						<option value="TO">TO</option>
					</select>
					<span class="msg-erro" id="msg-estado"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="email" class="rotulo">E-mail:</label><br>
					<input type="email" id="email" name="email" placeholder="fulano@dominio" size="50" required >
					<span class="msg-erro" id="msg-email"></span>
				</div>
				<br>		
				<div class="form-item">
					<label for="telefone" class="rotulo">Telefone:</label><br>
					<input type="tel" id="telefone" name="telefone" placeholder="(XX)XXXXX-XXXX" size="50" required s>
					<span class="msg-erro" id="msg-telefone"></span>
				</div>	
				<br>		    
				<div>
					<table>
						<tr>
							<td>
								<div>
									<input class="button" id="btnGravar" type="submit" value="Confirmar" name="cadastrar">
								<!-- <a class="button" id="btnGravar" href="adm/congregacaoController.php?acao=cadastro">Gravar</a> -->	
								</div>
							</td>
							<td>
								<div>
									<a class="button" id="btnEditar" href="adm/congregacaoController.php">Ver congregações</a>
								</div>
							</td>   
						</tr>
					</table>
				</div>
			</div>
		</form>
	</div>		
</section>
<script src="js/cad_congregacao.js"></script>
</body>
</html>