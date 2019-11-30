<?php include "includes/cabecalho.php"; ?>
<?php include "includes/menu_lateral.php"; ?>
	<section class="col-2">
		<h2>Cadastrar categoria</h2>
		<br>
		<div>
			<form action="adm/categoriaController.php?acao=cadastro" method="post" id="form-cadastro">
				<div class="form-item">
					<label for="nome" class="rotulo">Nome categoria:</label><br>
					<input type="text" id="nome" name="nome" size="37">
					<span class="msg-erro" id="msg-nome"></span>
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
									<a class="button" id="btnEditar" href="adm/categoriaController.php">Ver categorias</a>
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