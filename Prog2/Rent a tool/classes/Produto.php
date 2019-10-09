<?php 
require_once "BD.php";
class Produto {
    private $conexao;

    function __construct() {
        $this->conexao = new BD();
    }    

    //filtro por categoria
    function filtroCategooria($cat) {
        $sql = 
            "SELECT * 
               FROM produto 
              WHERE $cat IS TRUE";

        //retorna um vetor de resultados
        $this->conexao->select($sql);
    }

    function filtroBusca($palavraChave) {
        $sql = 
            "SELECT * 
               FROM produto  
              WHERE nome 
               LIKE '%$palavraChave%' 
              ORDER BY nome";

        //retorna um vetor de resultados
        $this->conexao->select($sql);
    }

    function filtroNovidades() {
        $sql = 
            "SELECT * 
               FROM produto 
              ORDER BY id 
               DESC LIMIT 5";

        //retorna um vetor de resultados
        $this->conexao->select($sql);
    }

    function consultaProduto($id) {
        $sql = 
            "SELECT produto.id as idProduto,
                    produto.nome as nomeProduto, 
                    imagem, 
                    descricao,
                    tensao,
                    catMarcenaria,
                    catJardinagem,
                    catLimpeza,
                    catEscritorio,
                    catMecanica,
                    catOutros, 
                    qtde,
                    valor,
                    desconto,
                    (valor-desconto) as valorFinal,
                    fabricante.id as idFabricante,
                    fabricante.nome as nomeFabricante
               FROM produto 
              INNER JOIN fabricante ON produto.idFabricante = fabricante.id 
              WHERE produto.id = 1";

        return $this->conexao->select($sql);
    }

    function listaTodos() {
        $sql = 
            "SELECT produto.id as idProduto,
                    produto.nome as nomeProduto, 
                    imagem, 
                    descricao,
                    tensao,
                    catMarcenaria,
                    catJardinagem,
                    catLimpeza,
                    catEscritorio,
                    catMecanica,
                    catOutros, 
                    qtde,
                    valor,
                    desconto,
                    (valor-desconto) as valorFinal,
                    fabricante.id as idFabricante,
                    fabricante.nome as nomeFabricante
               FROM produto 
              INNER JOIN fabricante ON produto.idFabricante = fabricante.id";

        return $this->conexao->select($sql);
    }
}
?>