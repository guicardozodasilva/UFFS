<h2><?=$titulo;?></h2>
<br>
<p>| <a href="../add_movimentacao.php">
Cadastrar nova movimentação</a> |</p>
<br>
<table border="1" style="border-collapse: collapse">
	<tr>
		<th>Código <a href="?campo=idMovimentacao&ordem=asc">&and;</a>
		 <a href="?campo=idMovimentacao&ordem=desc">&or;</a></th>
		<th>Tipo movimentação <a href="?campo=tipoMovimentacao&ordem=asc">&and;</a>
		 <a href="?campo=tipoMovimentacao&ordem=desc">&or;</a></th>
    <th>Data<a href="?campo=data&ordem=asc">&and;</a>
		 <a href="?campo=data&ordem=desc">&or;</a></th>
		<th>nomeCategoria</th>
    <th>Forma de pagamento</th>
    <th>Parcela</th>
    <th>Valor</th>
    <th>Descricao</th>
		<th>Ação</th>
	</tr>
	<?php
	if(empty($lista)){
		echo "<tr><td colspan='4'>Nenhuma movimentacao cadastrada</td></tr>";
	}
	else{
		foreach ($lista as $movimentacao){
			?>
			<tr>
				<td><?=$movimentacao['idMovimentacao'];?></td>
				<td><?=$movimentacao['tipoMovimentacao'];?></td>
				<td><?=$movimentacao['data'];?></td>
				<td><?=$movimentacao['nomeCategoria'];?></td>
        <td><?=$movimentacao['formaPagamento'];?></td>
        <td><?=$movimentacao['parcela'];?></td>
        <td><?=str_replace(".", ",", number_format($movimentacao['valor'], 2));?></td>
        <td><?=$movimentacao['descricao'];?></td>
				<td>
				<a href="movimentacaoController.php?acao=altera&id=<?=$movimentacao['idMovimentacao'];?>">alterar</a> |
				<a href="movimentacaoController.php?acao=exclui&id=<?=$movimentacao['idMovimentacao'];?>" onclick="return confirm('Tem certeza de que deseja excluir esta congregacao?')">excluir</a></td>
			</tr>
			<?php
		}
	}
	?>
</table>
