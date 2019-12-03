<h2>Alteração informações da Congregação</h2>
<br>
			<form action="congregacaoController.php?acao=altera" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="nome" class="rotulo">Nome:</label><br>
					<input type="text" id="nome" name="nome" size="50" placeholder="Nome da congregação" required autofocus
					value="<?=$congreg[0]['nomeCongregacao']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="cnpj" class="rotulo">CNPJ:</label><br>
					<input type="text" id="cnpj" name="cnpj" size="20" placeholder="Número do CNPJ" required value="<?=$congreg[0]['cnpj']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="endereco" class="rotulo">Endereço:</label><br>
					<input type="text" id="endereco" name="endereco" placeholder="Rua, número, complemento" size="50" required
					value="<?=$congreg[0]['endereco']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="bairro" class="rotulo">Bairro:</label><br>
					<input type="text" id="bairro" name="bairro" placeholder="Nome do bairro" size="50" required
					value="<?=$congreg[0]['bairro']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="cidade" class="rotulo">Cidade:</label><br>
					<input type="text" id="cidade" name="cidade" placeholder="Nome da cidade" size="50" required
					value="<?=$congreg[0]['cidade']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="uf" class="rotulo">Estado:</label><br>
					<select name="uf" id="uf">
						<option value="">Selecione o estado</option>
						<option value="AC" <?php echo $congreg[0]['uf'] == 'AC' ? 'selected' : '' ?>>AC</option>
						<option value="AL" <?php echo $congreg[0]['uf'] == 'AL' ? 'selected' : '' ?>>AL</option>
						<option value="AM" <?php echo $congreg[0]['uf'] == 'AM' ? 'selected' : '' ?>>AM</option>
						<option value="AP" <?php echo $congreg[0]['uf'] == 'AP' ? 'selected' : '' ?>>AP</option>
						<option value="BA" <?php echo $congreg[0]['uf'] == 'BA' ? 'selected' : '' ?>>BA</option>
						<option value="CE" <?php echo $congreg[0]['uf'] == 'CE' ? 'selected' : '' ?>>CE</option>
						<option value="DF" <?php echo $congreg[0]['uf'] == 'DF' ? 'selected' : '' ?>>DF</option>
						<option value="ES" <?php echo $congreg[0]['uf'] == 'ES' ? 'selected' : '' ?>>ES</option>
						<option value="GO" <?php echo $congreg[0]['uf'] == 'GO' ? 'selected' : '' ?>>GO</option>
						<option value="MA" <?php echo $congreg[0]['uf'] == 'MA' ? 'selected' : '' ?>>MA</option>
						<option value="MG" <?php echo $congreg[0]['uf'] == 'MG' ? 'selected' : '' ?>>MG</option>
						<option value="MS" <?php echo $congreg[0]['uf'] == 'MS' ? 'selected' : '' ?>>MS</option>
						<option value="MT" <?php echo $congreg[0]['uf'] == 'MT' ? 'selected' : '' ?>>MT</option>
						<option value="PA" <?php echo $congreg[0]['uf'] == 'PA' ? 'selected' : '' ?>>PA</option>
						<option value="PB" <?php echo $congreg[0]['uf'] == 'PB' ? 'selected' : '' ?>>PB</option>
						<option value="PE" <?php echo $congreg[0]['uf'] == 'PE' ? 'selected' : '' ?>>PE</option>
						<option value="PI" <?php echo $congreg[0]['uf'] == 'PI' ? 'selected' : '' ?>>PI</option>
						<option value="PR" <?php echo $congreg[0]['uf'] == 'PR' ? 'selected' : '' ?>>PR</option>
						<option value="RJ" <?php echo $congreg[0]['uf'] == 'RJ' ? 'selected' : '' ?>>RJ</option>
						<option value="RN" <?php echo $congreg[0]['uf'] == 'RN' ? 'selected' : '' ?>>RN</option>
						<option value="RS" <?php echo $congreg[0]['uf'] == 'RS' ? 'selected' : '' ?>>RS</option>
						<option value="RO" <?php echo $congreg[0]['uf'] == 'RO' ? 'selected' : '' ?>>RO</option>
						<option value="RR" <?php echo $congreg[0]['uf'] == 'RR' ? 'selected' : '' ?>>RR</option>
						<option value="SC" <?php echo $congreg[0]['uf'] == 'SC' ? 'selected' : '' ?>>SC</option>
						<option value="SE" <?php echo $congreg[0]['uf'] == 'SE' ? 'selected' : '' ?>>SE</option>
						<option value="SP" <?php echo $congreg[0]['uf'] == 'SP' ? 'selected' : '' ?>>SP</option>
						<option value="TO" <?php echo $congreg[0]['uf'] == 'TO' ? 'selected' : '' ?>>TO</option>
					</select>
				</div>
				<br>
				<div class="form-item">
					<label for="email" class="rotulo">E-mail:</label><br>
					<input type="email" id="email" name="email" placeholder="fulano@dominio" size="50" required
					value="<?=$congreg[0]['email']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="telefone" class="rotulo">Telefone:</label><br>
					<input type="tel" id="telefone" name="telefone" placeholder="(XX)XXXXX-XXXX" size="50" required
					value="<?=$congreg[0]['telefone']?>">
				</div>
				<br>
				<div class="form-item">
				<label class="rotulo"></label>
				<div>
					<table>
						<tr>
							<td>
								<div>
									<input class="button" id="btnGravar" type="submit" value="Alterar" name="alterar">
								</div>
							</td>
						</tr>
					</table>
				</div>


				<input type="hidden" name="idCongregacao" value="<?=$congreg[0]['idCongregacao'];?>">
			</div>
			</div>
		</form>
