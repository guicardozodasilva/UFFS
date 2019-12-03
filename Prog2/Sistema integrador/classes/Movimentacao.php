<?php
require_once ("BD.php");
class Movimentacao
{
    private $conexao;

    function __construct() {
        $this->conexao = new BD();
    }

    function listarTodos($campo = "idMovimentacao", $ordem = "asc") {
        $sql = "SELECT movimentacao.id as idMovimentacao,
                        movimentacao.data as data,
                        CASE movimentacao.tipoMovimentacao
                        WHEN 'EN' THEN 'Entrada'
                        WHEN 'SD' THEN 'Saída'
                        END AS tipoMovimentacao,
                        CASE movimentacao.formaPagamento
                        WHEN 'DN' THEN 'Dinheiro'
                        WHEN 'CC' THEN 'Cartão de crédito'
                        WHEN 'CD' THEN 'Cartão de débito'
                        WHEN 'CQ' THEN 'Cheque'
                        WHEN 'BB' THEN 'Boleto bancário'
                        WHEN 'DB' THEN 'Depósito bancário'
                        WHEN 'OT' THEN 'Outros'
                        END AS formaPagamento,
                        movimentacao.descricao as descricao,
                        movimentacao.parcela as parcela,
                        movimentacao.valor as valor,
                        idCategoria,
                        categoria.nome as nomeCategoria
                    FROM movimentacao
                    JOIN categoria ON movimentacao.idCategoria = categoria.id
                 ORDER BY $campo $ordem";
        $result = $this->conexao->select($sql);
        return $result;
    }

   function cadastrar($dados) {
        $sql = "INSERT INTO movimentacao (data, descricao, idCategoria, tipoMovimentacao, valor, formaPagamento, parcela)
        	VALUES ('{$dados['data']}',
        	'{$dados['descricao']}',
        	'{$dados['idCategoria']}',
        	'{$dados['tipoMovimentacao']}',
        	'{$dados['valor']}',
          '{$dados['formaPagamento']}',
          '{$dados['parcela']}')";
        return $this->conexao->query($sql);
    }

    function alterar($dados) {
        $sql = "UPDATE movimentacao
                   SET data = '{$dados['data']}',
                       descricao = '{$dados['descricao']}',
                       idCategoria = '{$dados['idCategoria']}',
                       tipoMovimentacao = '{$dados['tipoMovimentacao']}',
                       valor = '{$dados['valor']}',
                       formaPagamento = '{$dados['formaPagamento']}',
                       parcela = '{$dados['parcela']}'
                 WHERE id = {$dados['id']}";
        return $this->conexao->query($sql);
    }

    function excluir($id) {
        $sql = "DELETE FROM movimentacao WHERE id = $id";
        return $this->conexao->query($sql);
    }

    function consultaMovimentacao($id) {
      $sql =
      "SELECT movimentacao.id as idMovimentacao,
              movimentacao.data as data,
              CASE movimentacao.tipoMovimentacao
              WHEN 'EN' THEN 'Entrada'
              WHEN 'SD' THEN 'Saída'
              END AS tipoMovimentacao,
              CASE movimentacao.formaPagamento
              WHEN 'DN' THEN 'Dinheiro'
              WHEN 'CC' THEN 'Cartão de crédito'
              WHEN 'CD' THEN 'Cartão de débito'
              WHEN 'CQ' THEN 'Cheque'
              WHEN 'BB' THEN 'Boleto bancário'
              WHEN 'DB' THEN 'Depósito bancário'
              WHEN 'OT' THEN 'Outros'
              END AS formaPagamento,
              movimentacao.descricao as descricao,
              movimentacao.parcela as parcela,
              movimentacao.valor as valor,
              idCategoria,
              categoria.nome as nomeCategoria
         FROM movimentacao
         JOIN categoria ON movimentacao.idCategoria = categoria.id
        WHERE movimentacao.id = $id";
      $result = $this->conexao->select($sql);
      return $result;
  }

    function listarCategoria() {
      $sql = "SELECT * FROM categoria";
      $result = $this->conexao->select($sql);
      return $result;
    }

    function erro(){
        return $this->conexao->erro();
    }
}
?>
