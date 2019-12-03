<?php
require_once ("BD.php");
class Membro
{
    private $conexao;

    function __construct() {
        $this->conexao = new BD();
    }

    function listarTodos($campo = "membro.nome", $ordem = "asc") {
        $sql = "SELECT membro.id as idMembro,
                       membro.nome as nomeMembro,
                       membro.cpf as cpf,
                       membro.endereco as endereco,
                       membro.bairro as bairro,
                       membro.cidade as cidade,
                       membro.uf as uf,
                       membro.email as email,
                       membro.telefone as telefone,
                       idCongregacao,
                       congregacao.nome as nomeCongregacao
                  FROM membro
                  JOIN congregacao ON membro.idCongregacao = congregacao.id
                 ORDER BY $campo $ordem";
        $result = $this->conexao->select($sql);
        return $result;
    }

   function cadastrar($dados) {
        $sql = "INSERT INTO membro (nome, cpf, idCongregacao, endereco, bairro, cidade, uf, email, telefone)
        	VALUES ('{$dados['nome']}',
        	'{$dados['cpf']}',
            '{$dados['idCongregacao']}',
        	'{$dados['endereco']}',
        	'{$dados['bairro']}',
        	'{$dados['cidade']}',
        	'{$dados['uf']}',
        	'{$dados['email']}',
        	'{$dados['telefone']}')";
        return $this->conexao->query($sql);
    }

    function alterar($dados) {
        $sql = "UPDATE membro SET nome = '{$dados['nome']}',
                cpf = '{$dados['cpf']}',
                idCongregacao = {$dados['idCongregacao']},
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
        $sql = "DELETE FROM membro WHERE id = $id";
        return $this->conexao->query($sql);
    }

    function consultaMembro($id) {
        $sql =
        "SELECT membro.id as idMembro,
                membro.nome as nomeMembro,
                membro.cpf as cpf,
                membro.endereco as endereco,
                membro.bairro as bairro,
                membro.cidade as cidade,
                membro.uf as uf,
                membro.email as email,
                membro.telefone as telefone,
                idCongregacao,
                congregacao.nome as nomeCongregacao
           FROM membro
           JOIN congregacao ON membro.idCongregacao = congregacao.id
          WHERE membro.id = $id";
        $result = $this->conexao->select($sql);
        return $result;
    }

    function listarCongregacoes() {
        $sql = "SELECT * FROM congregacao";
        $result = $this->conexao->select($sql);
        return $result;
    }

    function nomeCongregacao($id) {
        $sql = "SELECT congregacao.nome as nomeCongregacao
                  FROM congregacao
                 WHERE congregacao.id = $id";
        $result = $this->conexao->select($sql);
        return $result;
    }

    function existeEsseCpf($cpf) {
      $sql =
        "SELECT COUNT(cpf) as existe
           FROM membro
          WHERE cpf = $cpf
          LIMIT 1";
      $result = $this->conexao->select($sql);
      return $result;
  }

    function erro(){
        return $this->conexao->erro();
    }
}
?>
