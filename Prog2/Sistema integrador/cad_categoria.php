<?php include "includes/cabecalho.php"; ?>
<?php include "includes/menu_lateral.php"; ?>
	<section class="col-2">
		<h2>Cadastrar categoria</h2>
		<br>
		<div>
			<form action="" method="post" id="form-cadastro">
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