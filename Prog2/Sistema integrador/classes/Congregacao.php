<?php 
require_once ("BD.php");
class Congregacao
{
    private $conexao;
    
    function __construct() {
        $this->conexao = new BD();
    }

    function filtroBusca($palavraChave) {
        $sql = "SELECT * FROM produto where nome like '%{$palavraChave}%' ORDER BY nome";
        $result = $this->conexao->select($sql);
        return $result;
    } 
    
    function listarTodos($campo = "produto.nome", $ordem = "asc") {
        $sql = "SELECT produto.id as idProduto, produto.nome as nomeProduto, imagem, descricao, tensao, catMarcenaria, catJardinagem, catLimpeza, catEscritorio, catMecanica, catOutros, qtde, valor, desconto, (valor - desconto) as valorFinal, fabricante.id as idFabricante, fabricante.nome as nomeFabricante FROM produto LEFT JOIN fabricante ON produto.idFabricante = fabricante.id ORDER BY $campo $ordem";
        $result = $this->conexao->select($sql);
        return $result;
    }
    
   function cadastrar($dados) {
        $sql = "INSERT INTO congregacao (nome, cnpj, endereco, bairro, cidade, uf, email, telefone) 
        	VALUES ('{$dados['nome']}', 
        	{$dados['cnpj']}, 
        	{$dados['endereco']}, 
        	{$dados['bairro']},  
        	{$dados['cidade']}, 
        	{$dados['uf']}, 
        	{$dados['email']}, 
        	{$dados['telefone']})";                        
        return $this->conexao->query($sql);
    }

    function alterar($dados) {
        $sql = "UPDATE produto SET 
        nome = '{$dados['nome']}', 
        idFabricante = {$dados['idFabricante']}, 
        imagem = '{$dados['imagem']}', 
        descricao = '{$dados['descricao']}', 
        tensao = {$dados['tensao']}, 
        catMarcenaria = {$dados['catMarcenaria']}, 
        catJardinagem = {$dados['catJardinagem']}, 
        catLimpeza = {$dados['catLimpeza']}, 
        catEscritorio = {$dados['catEscritorio']}, 
        catMecanica = {$dados['catMecanica']}, 
        catOutros = {$dados['catOutros']}, 
        qtde =  {$dados['qtde']} , 
        valor = {$dados['valor']}, 
        desconto = {$dados['desconto']} 
        WHERE id = {$dados['id']}";                        
        return $this->conexao->query($sql);
    }    
        
    function excluir($id) {
        $sql = "DELETE FROM produto WHERE id = $id";
        return $this->conexao->query($sql);
    }
    
    function erro(){
        return $this->conexao->erro();
    }
}
?>