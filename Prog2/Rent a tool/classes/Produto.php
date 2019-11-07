<?php 
require_once "BD.php";
class Produto {
    private $conexao;

    function __construct() {
        $this->conexao = new BD();
    }    

    //filtro por categoria
    function filtroCategoria($cat) {
        $sql = 
            "SELECT * 
               FROM produto 
              WHERE $cat IS TRUE";

        //retorna um vetor de resultados
        return $this->conexao->select($sql);
    }

    function filtroBusca($palavraChave) {
        $sql = 
            "SELECT * 
               FROM produto  
              WHERE nome 
               LIKE '%$palavraChave%' 
              ORDER BY nome";

        //retorna um vetor de resultados
        return $this->conexao->select($sql);
    }

    function filtroNovidades() {
        $sql = 
            "SELECT * 
               FROM produto 
              ORDER BY id 
               DESC LIMIT 5";

        //retorna um vetor de resultados
        return $this->conexao->select($sql);
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
               LEFT JOIN fabricante ON produto.idFabricante = fabricante.id 
              WHERE produto.id = $id";

        return $this->conexao->select($sql);
    }

    function listarTodos($campo = "produto.nome", $ordem = "asc") {
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
               LEFT JOIN fabricante ON produto.idFabricante = fabricante.id
              ORDER BY $campo $ordem";

        return $this->conexao->select($sql);
    }

    function cadastrar($dados) {
        $sql = 
            "INSERT INTO
                    produto (nome, 
                             idFabricante,
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
                             desconto)
             VALUES ('{$dados['nome']}',
                     {$dados['idFabricante']},
                     '{$dados['imagem']}',
                     '{$dados['descricao']}',
                     {$dados['tensao']},
                     {$dados['catMarcenaria']},
                     {$dados['catJardinagem']},
                     {$dados['catLimpeza']},
                     {$dados['catEscritorio']},
                     {$dados['catMecanica']},
                     {$dados['catOutros']},
                     {$dados['qtde']},
                     {$dados['valor']},
                     {$dados['desconto']})";

        return $this->conexao->query($sql);    
    }

    function alterar($dados) {
        $sql = 
            "UPDATE produto 
                SET nome = '{$dados['nome']}',
                    idFabricante = {$dados['idFabricante']},
                    imagem = '{$dados['imagem']}',
                    descricao ='{$dados['descricao']}',
                    tensao = {$dados['tensao']},
                    catMarcenaria = {$dados['catMarcenaria']},
                    catJardinagem = {$dados['catJardinagem']},
                    catLimpeza = {$dados['catLimpeza']},
                    catEscritorio = {$dados['catEscritorio']},
                    catMecanica = {$dados['catMecanica']},
                    catOutros = {$dados['catOutros']},
                    qtde = {$dados['qtde']},
                    valor = {$dados['valor']},
                    desconto = {$dados['desconto']}
              WHERE id = {$dados['id']}";
        
        return $this->conexao->query($sql);
    }

    function excluir($id) {
        $sql = 
            "DELETE FROM produto WHERE id = $id";
        
        return $this->conexao->query($sql);
    }

    function erro() {
        return $this->conexao->erro();
    }
}
?>