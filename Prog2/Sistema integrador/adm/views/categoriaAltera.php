<h2>Alteração informações da Categoria</h2>
<br>
			<form action="categoriaController.php?acao=altera" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="nome" class="rotulo">Nome:</label><br>
					<input type="text" id="nome" name="nome" size="50" placeholder="Nome da categoria" required autofocus
					value="<?=$cat[0]['nomeCategoria']?>">
				</div>
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
				
				
				<input type="hidden" name="idCategoria" value="<?=$cat[0]['idCategoria'];?>">
			</div>		
			</div>
		</form>