<h2><?=$titulo;?></h2>
<br>
<p>| <a href="../cad_categoria.php">
Cadastrar nova categoria</a> |</p>
<br>
<table border="1" style="border-collapse: collapse">
	<tr>
		<th>Código <a href="?campo=idCategoria&ordem=asc">&and;</a>
		 <a href="?campo=idCategoria&ordem=desc">&or;</a></th>
		<th>Nome <a href="?campo=nomeCategoria&ordem=asc">&and;</a>
		 <a href="?campo=nomeCategoria&ordem=desc">&or;</a></th>
		<th>Ação</th>
	</tr>
	<?php
	if(empty($lista)){
		echo "<tr><td colspan='4'>Nenhuma categoria cadastrada</td></tr>";
	}
	else{
		foreach ($lista as $categoria){
			?>
			<tr>
				<td><?=$categoria['idCategoria'];?></td>
				<td><?=$categoria['nomeCategoria'];?></td>
				<td>
				<a href="categoriaController.php?acao=altera&id=<?=$categoria['idCategoria'];?>">alterar</a> | 
				<a href="categoriaController.php?acao=exclui&id=<?=$categoria['idCategoria'];?>" onclick="return confirm('Tem certeza de que deseja excluir esta categoria?')">excluir</a></td>
			</tr>
			<?php
		}
	}
	?>
</table>