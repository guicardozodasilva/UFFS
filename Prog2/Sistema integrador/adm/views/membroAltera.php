<h2>Alteração informações do Membro</h2>
<br>
			<form action="membroController.php?acao=altera" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="nome" class="rotulo">Nome:</label><br>
					<input type="text" id="nome" name="nome" size="50" placeholder="Nome da congregação" required autofocus
					value="<?=$memb[0]['nomeMembro']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="cpf" class="rotulo">CPF:</label><br>
					<input type="text" id="cpf" name="cpf" size="20" placeholder="Número do CPF" required value="<?=$memb[0]['cpf']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="idCongregacao" class="rotulo">Congregação pertencente:</label><br>
					<select name="idCongregacao" id="idCongregacao" value="<?=$memb[0]['idCongregacao']?>" selected="<?=$memb[0]['nomeCongregacao']?>">
						<option value="">Selecione a congregação</option>
						<?php
            $listaCongreg = $membro->listarCongregacoes();
						foreach($listaCongreg as $f) {
              $isCongreg = $f['id'] == $memb[0]['idCongregacao'] ? selected : '';
							echo "<option value=\"{$f['id']}\" {$isCongreg}>{$f['nome']}</option>";
            }?>
					</select>
					<span class="msg-erro" id="msg-idCongregacao"></span>
				</div>
				<br>
				<div class="form-item">
					<label for="endereco" class="rotulo">Endereço:</label><br>
					<input type="text" id="endereco" name="endereco" placeholder="Rua, número, complemento" size="50" required
					value="<?=$memb[0]['endereco']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="bairro" class="rotulo">Bairro:</label><br>
					<input type="text" id="bairro" name="bairro" placeholder="Nome do bairro" size="50" required
					value="<?=$memb[0]['bairro']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="cidade" class="rotulo">Cidade:</label><br>
					<input type="text" id="cidade" name="cidade" placeholder="Nome da cidade" size="50" required
					value="<?=$memb[0]['cidade']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="uf" class="rotulo">Estado:</label><br>
					<select name="uf" id="uf">
						<option value="">Selecione o estado</option>
						<option value="AC" <?=$memb[0]['uf'] === 'AC' ? 'selected' : '' ?>>AC</option>
						<option value="AL" <?=$memb[0]['uf'] === 'AL' ? 'selected' : '' ?>>AL</option>
						<option value="AM" <?=$memb[0]['uf'] === 'AM' ? 'selected' : '' ?>>AM</option>
						<option value="AP" <?=$memb[0]['uf'] === 'AP' ? 'selected' : '' ?>>AP</option>
						<option value="BA" <?=$memb[0]['uf'] === 'BA' ? 'selected' : '' ?>>BA</option>
						<option value="CE" <?=$memb[0]['uf'] === 'CE' ? 'selected' : '' ?>>CE</option>
						<option value="DF" <?=$memb[0]['uf'] === 'DF' ? 'selected' : '' ?>>DF</option>
						<option value="ES" <?=$memb[0]['uf'] === 'ES' ? 'selected' : '' ?>>ES</option>
						<option value="GO" <?=$memb[0]['uf'] === 'GO' ? 'selected' : '' ?>>GO</option>
						<option value="MA" <?=$memb[0]['uf'] === 'MA' ? 'selected' : '' ?>>MA</option>
						<option value="MG" <?=$memb[0]['uf'] === 'MG' ? 'selected' : '' ?>>MG</option>
						<option value="MS" <?=$memb[0]['uf'] === 'MS' ? 'selected' : '' ?>>MS</option>
						<option value="MT" <?=$memb[0]['uf'] === 'MT' ? 'selected' : '' ?>>MT</option>
						<option value="PA" <?=$memb[0]['uf'] === 'PA' ? 'selected' : '' ?>>PA</option>
						<option value="PB" <?=$memb[0]['uf'] === 'PB' ? 'selected' : '' ?>>PB</option>
						<option value="PE" <?=$memb[0]['uf'] === 'PE' ? 'selected' : '' ?>>PE</option>
						<option value="PI" <?=$memb[0]['uf'] === 'PI' ? 'selected' : '' ?>>PI</option>
						<option value="PR" <?=$memb[0]['uf'] === 'PR' ? 'selected' : '' ?>>PR</option>
						<option value="RJ" <?=$memb[0]['uf'] === 'RJ' ? 'selected' : '' ?>>RJ</option>
						<option value="RN" <?=$memb[0]['uf'] === 'RN' ? 'selected' : '' ?>>RN</option>
						<option value="RS" <?=$memb[0]['uf'] === 'RS' ? 'selected' : '' ?>>RS</option>
						<option value="RO" <?=$memb[0]['uf'] === 'RO' ? 'selected' : '' ?>>RO</option>
						<option value="RR" <?=$memb[0]['uf'] === 'RR' ? 'selected' : '' ?>>RR</option>
						<option value="SC" <?=$memb[0]['uf'] === 'SC' ? 'selected' : '' ?>>SC</option>
						<option value="SE" <?=$memb[0]['uf'] === 'SE' ? 'selected' : '' ?>>SE</option>
						<option value="SP" <?=$memb[0]['uf'] === 'SP' ? 'selected' : '' ?>>SP</option>
						<option value="TO" <?=$memb[0]['uf'] === 'TO' ? 'selected' : '' ?>>TO</option>
					</select>
				</div>
				<br>
				<div class="form-item">
					<label for="email" class="rotulo">E-mail:</label><br>
					<input type="email" id="email" name="email" placeholder="fulano@dominio" size="50" required
					value="<?=$memb[0]['email']?>">
				</div>
				<br>
				<div class="form-item">
					<label for="telefone" class="rotulo">Telefone:</label><br>
					<input type="tel" id="telefone" name="telefone" placeholder="(XX)XXXXX-XXXX" size="50" required
					value="<?=$memb[0]['telefone']?>">
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


				<input type="hidden" name="idMembro" value="<?=$memb[0]['idMembro'];?>">
			</div>
			</div>
		</form>
