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
				$titulo = "Alteração de Produto";
				if(isset($_POST['alterar'])){
					//dados foram submetidos
					$dados = array();
					$dados['id'] = $_POST['idProduto'];
					$dados['nome'] = $_POST['nome'];
					$dados['idFabricante'] = ($_POST['idFabricante'] == 0)? 'NULL' : $_POST['idFabricante'];
					$dados['imagem'] = (!empty($_FILES['arquivo']['name']))? $_FILES['arquivo']['name']: $_POST['imagemAtual'];
					$dados['descricao'] = $_POST['descricao'];
					$dados['tensao'] = $_POST['tensao'];
					$dados['catMarcenaria'] = isset($_POST['marcenaria'])? 1 : 0;
					$dados['catJardinagem'] = isset($_POST['jardinagem'])? 1 : 0;
					$dados['catLimpeza'] = isset($_POST['limpeza'])? 1 : 0;
					$dados['catEscritorio'] = isset($_POST['escritorio'])? 1 : 0;
					$dados['catMecanica'] = isset($_POST['mecanica'])? 1 : 0;
					$dados['catOutros'] = isset($_POST['outros'])? 1 : 0;
					$dados['qtde'] = $_POST['quantidade'];
					$dados['valor'] = $_POST['valor'];
					$dados['desconto'] = $_POST['desconto'];
					$produto = new Produto();
					$resultado = $produto->alterar($dados);
					if($resultado){
						$mensagem = "O produto <strong>{$dados['nome']}</strong> foi alterado com sucesso";
						// TENTA O UPLOAD
						if(!empty($_FILES['arquivo']['name'])){
							if(!move_uploaded_file($_FILES['arquivo']['tmp_name'], "../img/produtos/{$_FILES['arquivo']['name']}")){
								$mensagem.="<br>No entanto, a imagem não pode ser enviada. Contate o suporte";
							}
						}
					}
					else{
						$mensagem = "Erro. O produto <strong>{$dados['nome']}</strong> não foi alterado";
						$mensagem .= $produto->erro();
					}
					include "views/produtoConfirmacao.php";
				}
				else{ // carrega dados atuais
					$produto = new Produto();
					$prod = $produto->consultaProduto($_GET['id']);
					include "views/produtoAltera.php";
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
