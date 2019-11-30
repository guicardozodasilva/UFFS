<?php 
require_once ("BD.php");
class Categoria
{
    private $conexao;
    
    function __construct() {
        $this->conexao = new BD();
    }
    
    function listarTodos($campo = "categoria.nome", $ordem = "asc") {
        $sql = "SELECT categoria.id as idCategoria, 
                       categoria.nome as nomeCategoria
                  FROM categoria  
                 ORDER BY $campo $ordem";
        $result = $this->conexao->select($sql);
        return $result;
    }
    
   function cadastrar($dados) {
        $sql = 
        "INSERT INTO categoria (nome) 
        	    VALUES ('{$dados['nome']}')";                        
        return $this->conexao->query($sql);
    }

    function alterar($dados) {
        $sql = 
            "UPDATE categoria   
                SET nome = '{$dados['nome']}'
              WHERE id = {$dados['id']}";                        
        return $this->conexao->query($sql);
    }    
        
    function excluir($id) {
        $sql = "DELETE FROM categoria WHERE id = $id";
        return $this->conexao->query($sql);
    }

    function consultaCategoria($id) {
        $sql = "SELECT categoria.id as idCategoria, 
                       categoria.nome as nomeCategoria 
                  FROM categoria  
                 WHERE categoria.id = $id";
        $result = $this->conexao->select($sql);
        return $result;
    }
    
    function erro(){
        return $this->conexao->erro();
    }
}
?>