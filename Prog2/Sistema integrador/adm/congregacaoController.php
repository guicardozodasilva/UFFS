<?php include "cabecalhoAdm.php"; ?>
<?php include "menuLateralAdm.php"; ?>
<div class="container">
	<main>
	<?php
	require "../classes/Congregacao.php";
	require "../includes/functions.php";

	if(isset($_GET['acao'])){
		switch($_GET['acao']){

			case "cadastro":
				if(isset($_POST['cadastrar'])){
					//dados foram submetidos
					$dados = array();
					$dados['nome'] = addslashes($_POST['nome']);
					$dados['cnpj'] = $_POST['cnpj'];
					$dados['endereco'] = $_POST['endereco'];
					$dados['bairro'] = $_POST['bairro'];
					$dados['cidade'] = $_POST['cidade'];
					$dados['uf'] = $_POST['uf'];
					$dados['email'] = $_POST['email'];
					$dados['telefone'] = $_POST['telefone'];
					$congregacao = new Congregacao();
					$resultado = $congregacao->cadastrar($dados);
					if($resultado){
						$mensagem = "A congregação <strong>".stripslashes($dados['nome'])."</strong> foi cadastrada com sucesso";
					}
					else{
						$mensagem = "Erro. A congregação <strong>{$dados['nome']}</strong> não foi cadastrada<br>";
						$mensagem .= $congregacao->erro();
					}
					include "views/congregacaoConfirmacao.php";
				}
				/*else{
					include "../cad_congregacao.php";
				}*/
				break;
			
			case "altera":
				$titulo = "Alteração das informações da Congregação";
				if(isset($_POST['alterar'])){
					//dados foram submetidos
					$dados = array();
					$dados['id'] = $_POST['idCongregacao'];
					$dados['nome'] = $_POST['nome'];
					$dados['cnpj'] = $_POST['cnpj'];
					$dados['endereco'] = $_POST['endereco'];
					$dados['bairro'] = $_POST['bairro'];
					$dados['cidade'] = $_POST['cidade'];
					$dados['uf'] = $_POST['uf'];
					$dados['email'] = $_POST['email'];
					$dados['telefone'] = $_POST['telefone'];
					$congregacao = new Congregacao();
					$resultado = $congregacao->alterar($dados);
					if($resultado)
						$mensagem = "A congregação <strong>{$dados['nome']}</strong> foi alterada com sucesso";
					else{
						$mensagem = "Erro. A congregação <strong>{$dados['nome']}</strong> não foi alterada";
						$mensagem .= $congregacao->erro();
					}
					include "views/congregacaoConfirmacao.php";
				}
				else{ // carrega dados atuais
					$congregacao = new Congregacao();
					$congreg = $congregacao->consultaCongregacao($_GET['id']);
					include "views/congregacaoAltera.php";
				}
				break;
			case "exclui":
				$titulo = "Exclusão de Congregação";
				if(is_numeric($_GET['id'])){
					$congregacao = new Congregacao();
					$resultado = $congregacao->excluir($_GET['id']);
					if($resultado){
						$mensagem = "Congregação excluída com sucesso";
					}
					else{
						$mensagem = "Erro. A congregação não foi excluída<br>";
						$mensagem .= $congregacao->erro();
					}
					
				}
				else{ // nao eh numero
					$mensagem = "O formato do código do produto é inválido";
				}
				include "views/congregacaoConfirmacao.php";
				break;		
		}
	}
	else {
		$titulo = "Congregações cadastradas";
		$congregacao = new Congregacao();
		if(isset($_GET['campo']) & isset($_GET['ordem']))
			$lista = $congregacao->listarTodos($_GET['campo'], $_GET['ordem']);
		else
			$lista = $congregacao->listarTodos();
		include "views/congregacaoIndex.php";
	} 
	?>

	</main>
	<br><br><br>
</div>

