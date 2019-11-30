<h2><?=$titulo;?></h2>
<br>
<p>| <a href="../cad_membro.php">
Cadastrar novo membro</a> |</p>
<br>
<table border="1" style="border-collapse: collapse">
	<tr>
		<th>Código <a href="?campo=idMembro&ordem=asc">&and;</a>
		 <a href="?campo=idMembro&ordem=desc">&or;</a></th>
		<th>Nome <a href="?campo=nomeMembro&ordem=asc">&and;</a>
		 <a href="?campo=nomeMembro&ordem=desc">&or;</a></th>
		<th>CPF</th>
		<th>Congregação pertencente</th>
		<th>Endereco</th>
		<th>Bairro</th>
		<th>Cidade</th>
		<th>Estado</th>
		<th>Email</th>
		<th>Telefone</th>
		<th>Ação</th>
	</tr>
	<?php
	if(empty($lista)){
		echo "<tr><td colspan='4'>Nenhum membro cadastrado</td></tr>";
	}
	else{
		foreach ($lista as $membro){
			?>
			<tr>
				<td><?=$membro['idMembro'];?></td>
				<td><?=$membro['nomeMembro'];?></td>
				<td><?=$membro['cpf'];?></td>
				<td><?=$membro['nomeCongregacao'];?></td>
				<td><?=$membro['endereco'];?></td>
				<td><?=$membro['bairro'];?></td>
				<td><?=$membro['cidade'];?></td>
				<td><?=$membro['uf'];?></td>
				<td><?=$membro['email'];?></td>
				<td><?=$membro['telefone'];?></td>
				<td>
				<a href="membroController.php?acao=altera&id=<?=$membro['idMembro'];?>">alterar</a> | 
				<a href="membroController.php?acao=exclui&id=<?=$membro['idMembro'];?>" onclick="return confirm('Tem certeza de que deseja excluir este membro?')">excluir</a></td>
			</tr>
			<?php
		}
	}
	?>
</table>