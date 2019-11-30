<?php 
require_once ("BD.php");
class Congregacao
{
    private $conexao;
    
    function __construct() {
        $this->conexao = new BD();
    }
    
    function listarTodos($campo = "congregacao.nome", $ordem = "asc") {
        $sql = "SELECT congregacao.id as idCongregacao, 
                       congregacao.nome as nomeCongregacao, 
                       cnpj, 
                       endereco, 
                       bairro, 
                       cidade, 
                       uf, 
                       email, 
                       telefone 
                  FROM congregacao  
                 ORDER BY $campo $ordem";
        $result = $this->conexao->select($sql);
        return $result;
    }
    
   function cadastrar($dados) {
        $sql = "INSERT INTO congregacao (nome, cnpj, endereco, bairro, cidade, uf, email, telefone) 
        	VALUES ('{$dados['nome']}', 
        	'{$dados['cnpj']}', 
        	'{$dados['endereco']}', 
        	'{$dados['bairro']}',  
        	'{$dados['cidade']}', 
        	'{$dados['uf']}', 
        	'{$dados['email']}', 
        	'{$dados['telefone']}')";                        
        return $this->conexao->query($sql);
    }

    function alterar($dados) {
        $sql = "UPDATE congregacao SET nome = '{$dados['nome']}', 
                cnpj = '{$dados['cnpj']}', 
                endereco = '{$dados['endereco']}', 
                bairro = '{$dados['bairro']}',  
                cidade = '{$dados['cidade']}', 
                uf = '{$dados['uf']}', 
                email = '{$dados['email']}', 
                telefone = '{$dados['telefone']}'
          WHERE id = {$dados['id']}";                        
        return $this->conexao->query($sql);
    }    
        
    function excluir($id) {
        $sql = "DELETE FROM congregacao WHERE id = $id";
        return $this->conexao->query($sql);
    }

    function consultaCongregacao($id) {
        $sql = "SELECT congregacao.id as idCongregacao, 
                       congregacao.nome as nomeCongregacao, 
                       cnpj, 
                       endereco, 
                       bairro, 
                       cidade, 
                       uf, 
                       email, 
                       telefone 
                  FROM congregacao  
                 WHERE congregacao.id = $id";
        $result = $this->conexao->select($sql);
        return $result;
    }
    
    function erro(){
        return $this->conexao->erro();
    }
}
?>