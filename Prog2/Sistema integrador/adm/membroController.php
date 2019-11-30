<?php include "cabecalhoAdm.php"; ?>
<?php include "menuLateralAdm.php"; ?>
<div class="container">
	<main>
	<?php
	require "../classes/Membro.php";
	require "../includes/functions.php";

	if(isset($_GET['acao'])){
		switch($_GET['acao']){

			case "cadastro":
				if(isset($_POST['cadastrar'])){
					//dados foram submetidos
					$dados = array();
					$dados['nome'] = addslashes($_POST['nome']);
					$dados['cpf'] = $_POST['cpf'];
					$dados['idCongregacao'] = $_POST['idCongregacao'];
					$dados['endereco'] = $_POST['endereco'];
					$dados['bairro'] = $_POST['bairro'];
					$dados['cidade'] = $_POST['cidade'];
					$dados['uf'] = $_POST['uf'];
					$dados['email'] = $_POST['email'];
					$dados['telefone'] = $_POST['telefone'];
					$membro = new Membro();
					$resultado = $membro->cadastrar($dados);
					if($resultado){
						$mensagem = "O membro <strong>".stripslashes($dados['nome'])."</strong> foi cadastrado com sucesso";
					}
					else{
						$mensagem = "Erro. O membro <strong>{$dados['nome']}</strong> não foi cadastrado<br>";
						$mensagem .= $membro->erro();
					}
					include "views/membroConfirmacao.php";
				}
				/*else{
					include "../cad_congregacao.php";
				}*/
				break;
			
			case "altera":
				$titulo = "Alteração das informações do membro";
				if(isset($_POST['alterar'])){
					//dados foram submetidos
					$dados = array();
					$dados['id'] = $_POST['idMembro'];
					$dados['nome'] = addslashes($_POST['nome']);
					$dados['cpf'] = $_POST['cpf'];
					$dados['idCongregacao'] = $_POST['idCongregacao'];
					$dados['endereco'] = $_POST['endereco'];
					$dados['bairro'] = $_POST['bairro'];
					$dados['cidade'] = $_POST['cidade'];
					$dados['uf'] = $_POST['uf'];
					$dados['email'] = $_POST['email'];
					$dados['telefone'] = $_POST['telefone'];
					$membro = new Membro();
					$resultado = $membro->alterar($dados);
					if($resultado)
						$mensagem = "O membro <strong>{$dados['nome']}</strong> foi alterado com sucesso";
					else{
						$mensagem = "Erro. O membro <strong>{$dados['nome']}</strong> não foi alterado";
						$mensagem .= $membro->erro();
					}
					include "views/membroConfirmacao.php";
				}
				else{ // carrega dados atuais
					$membro = new Membro();
					$memb = $membro->consultaMembro($_GET['id']);
					include "views/membroAltera.php";
				}
				break;
			case "exclui":
				$titulo = "Exclusão de Membro";
				if(is_numeric($_GET['id'])){
					$membro = new Membro();
					$resultado = $membro->excluir($_GET['id']);
					if($resultado){
						$mensagem = "Membro excluído com sucesso";
					}
					else{
						$mensagem = "Erro. O membro não foi excluído<br>";
						$mensagem .= $membro->erro();
					}
					
				}
				else{ // nao eh numero
					$mensagem = "O formato do código do produto é inválido";
				}
				include "views/membroConfirmacao.php";
				break;		
		}
	}
	else {
		$titulo = "Membros cadastrados";
		$membro = new Membro();
		if(isset($_GET['campo']) & isset($_GET['ordem']))
			$lista = $membro->listarTodos($_GET['campo'], $_GET['ordem']);
		else
			$lista = $membro->listarTodos();
		include "views/membroIndex.php";
	} 
	?>

	</main>
	<br><br><br>
</div>

