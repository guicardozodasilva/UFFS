<?php include "cabecalhoAdm.php"; ?>
<?php include "menuLateralAdm.php"; ?>
<div class="container">
	<main>
	<?php
	require "../classes/Categoria.php";
	require "../includes/functions.php";

	if(isset($_GET['acao'])){
		switch($_GET['acao']){

			case "cadastro":
				if(isset($_POST['cadastrar'])){
					//dados foram submetidos
					$dados = array();
					$dados['nome'] = addslashes($_POST['nome']);
					$categoria = new Categoria();
					$resultado = $categoria->cadastrar($dados);
					if($resultado){
						$mensagem = "A categoria <strong>".stripslashes($dados['nome'])."</strong> foi cadastrada com sucesso";
					}
					else{
						$mensagem = "Erro. A categoria <strong>{$dados['nome']}</strong> não foi cadastrada<br>";
						$mensagem .= $categoria->erro();
					}
					include "views/categoriaConfirmacao.php";
				}
				break;
			
			case "altera":
				$titulo = "Alteração das informações da Congregação";
				if(isset($_POST['alterar'])){
					//dados foram submetidos
					$dados = array();
					$dados['id'] = $_POST['idCategoria'];
					$dados['nome'] = $_POST['nome'];
					$categoria = new Categoria();
					$resultado = $categoria->alterar($dados);
					if($resultado)
						$mensagem = "A categoria <strong>{$dados['nome']}</strong> foi alterada com sucesso";
					else{
						$mensagem = "Erro. A categoria <strong>{$dados['nome']}</strong> não foi alterada";
						$mensagem .= $categoria->erro();
					}
					include "views/categoriaConfirmacao.php";
				}
				else{ // carrega dados atuais
					$categoria = new Categoria();
					$cat = $categoria->consultaCategoria($_GET['id']);
					include "views/categoriaAltera.php";
				}
				break;
			case "exclui":
				$titulo = "Exclusão de Categoria";
				if(is_numeric($_GET['id'])){
					$categoria = new Categoria();
					$resultado = $categoria->excluir($_GET['id']);
					if($resultado){
						$mensagem = "Categoria excluída com sucesso";
					}
					else{
						$mensagem = "Erro. A categoria não foi excluída<br>";
						$mensagem .= $categoria->erro();
					}
					
				}
				else{ // nao eh numero
					$mensagem = "O formato do código do produto é inválido";
				}
				include "views/categoriaConfirmacao.php";
				break;		
		}
	}
	else {
		$titulo = "Congregações cadastradas";
		$categoria = new Categoria();
		if(isset($_GET['campo']) & isset($_GET['ordem']))
			$lista = $categoria->listarTodos($_GET['campo'], $_GET['ordem']);
		else
			$lista = $categoria->listarTodos();
		include "views/categoriaIndex.php";
	} 
	?>

	</main>
	<br><br><br>
</div>

