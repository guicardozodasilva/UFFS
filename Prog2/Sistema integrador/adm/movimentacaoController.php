<?php include "cabecalhoAdm.php"; ?>
<?php include "menuLateralAdm.php"; ?>
<div class="container">
	<main>
	<?php
	require "../classes/Movimentacao.php";
	require "../includes/functions.php";

	if(isset($_GET['acao'])){
		switch($_GET['acao']){

			case "cadastro":
				if(isset($_POST['cadastrar'])){
					//dados foram submetidos
					$dados = array();
					$dados['descricao'] = addslashes($_POST['descricao']);
					$dados['data'] = $_POST['data'];
					$dados['idCategoria'] = $_POST['idCategoria'];
          $dados['tipoMovimentacao'] = $_POST['tipoMovimentacao'];
          $dados['valor'] = $_POST['valor'];
          $dados['formaPagamento'] = $_POST['formaPagamento'];
          $dados['parcela'] = $_POST['parcela'];
					$movimentacao = new Movimentacao();
					$resultado = $movimentacao->cadastrar($dados);
					if($resultado){
						$mensagem = "A movimentação foi cadastrada com sucesso";
					}
					else{
						$mensagem = "Erro. A movimentacao não foi cadastrada<br>";
						$mensagem .= $movimentacao->erro();
					}
					include "views/movimentacaoConfirmacao.php";
				}
				break;

			case "altera":
				$titulo = "Alteração das informações da Movimentacao";
				if(isset($_POST['alterar'])){
					//dados foram submetidos
					$dados = array();
					$dados['id'] = $_POST['idMovimentacao'];
					$dados['descricao'] = addslashes($_POST['descricao']);
					$dados['data'] = $_POST['data'];
					$dados['idCategoria'] = $_POST['idCategoria'];
          $dados['tipoMovimentacao'] = $_POST['tipoMovimentacao'];
          $dados['valor'] = $_POST['valor'];
          $dados['formaPagamento'] = $_POST['formaPagamento'];
          $dados['parcela'] = $_POST['parcela'];
					$movimentacao = new Movimentacao();
					$resultado = $movimentacao->alterar($dados);
					if($resultado)
						$mensagem = "A movimentação foi alterada com sucesso";
					else{
						$mensagem = "Erro. A movimentação <strong>{$dados['nome']}</strong> não foi alterada";
						$mensagem .= $movimentacao->erro();
					}
					include "views/movimentacaoConfirmacao.php";
				}
				else{ // carrega dados atuais
					$movimentacao = new Movimentacao();
					$mov = $movimentacao->consultaMovimentacao($_GET['id']);
					include "views/movimentacaoAltera.php";
				}
				break;
			case "exclui":
				$titulo = "Exclusão de Movimentacao";
				if(is_numeric($_GET['id'])){
					$movimentacao = new Movimentacao();
					$resultado = $movimentacao->excluir($_GET['id']);
					if($resultado){
						$mensagem = "Movimentacao excluída com sucesso";
					}
					else{
						$mensagem = "Erro. A movimentacao não foi excluída<br>";
						$mensagem .= $movimentacao->erro();
					}

				}
				else{ // nao eh numero
					$mensagem = "O formato do código da movimentação é inválida";
				}
				include "views/movimentacaoConfirmacao.php";
				break;
		}
	}
	else {
		$titulo = "Movimentacao cadastradas";
		$movimentacao = new Movimentacao();
		if(isset($_GET['campo']) & isset($_GET['ordem']))
			$lista = $movimentacao->listarTodos($_GET['campo'], $_GET['ordem']);
		else
			$lista = $movimentacao->listarTodos();
		include "views/movimentacaoIndex.php";
	}
	?>

	</main>
	<br><br><br>
</div>

