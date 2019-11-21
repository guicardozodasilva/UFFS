<h2><?=$titulo;?></h2>
<p>| <a href="produtoController.php?acao=cadastro">
inserir novo</a> |</p>
<table border="1" style="border-collapse: collapse">
	<tr>
		<th>Código <a href="?campo=idCongregacao&ordem=asc">&and;</a>
		 <a href="?campo=idCongregacao&ordem=desc">&or;</a></th>
		<th>Nome <a href="?campo=nomeCongregacao&ordem=asc">&and;</a>
		 <a href="?campo=nomeCongregacao&ordem=desc">&or;</a></th>
		<th>CNPJ</th>
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
		echo "<tr><td colspan='4'>Nenhuma congregação cadastrada</td></tr>";
	}
	else{
		foreach ($lista as $congregacao){
			?>
			<tr>
				<td><?=$congregacao['idCongregacao'];?></td>
				<td><?=$congregacao['nomeCongregacao'];?></td>
				<td><?=$congregacao['cnpj'];?></td>
				<td><?=$congregacao['endereco'];?></td>
				<td><?=$congregacao['bairro'];?></td>
				<td><?=$congregacao['cidade'];?></td>
				<td><?=$congregacao['uf'];?></td>
				<td><?=$congregacao['email'];?></td>
				<td><?=$congregacao['telefone'];?></td>
				<td>
				<a href="congregacaoController.php?acao=altera&id=<?=$congregacao['idCongregacao'];?>">alterar</a> | 
				<a href="congregacaoController.php?acao=exclui&id=<?=$congregacao['idCongregacao'];?>" onclick="return confirm('Tem certeza de que deseja excluir esta congregacao?')">excluir</a></td>
			</tr>
			<?php
		}
	}
	?>
</table>