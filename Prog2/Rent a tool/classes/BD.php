<?php 
class BD {
    private $host = "localhost";
    private $user = "admrent";
    private $password = "12345";
    private $database = "rent";
    private $conexao;

    function __construct() {
        //faz a conexao
        $this->conexao = mysqli_connect($this->host, $this->user, 
            $this->password, $this->database);
        
        //seta a conexao como utf8
        mysqli_query($this->conexao, "set names 'utf8'");
    }

    //recebe um select qualquer, executa e devolve um array de resultados
    function select($sql) {
        $retorno = mysqli_query($this->conexao, $sql);
        $arrayResultados = array();
        
        //verifica se houve retorno
        if(mysqli_num_rows($retorno) > 0) {
            while($linha = mysqli_fetch_assoc($retorno)) {
            	$arrayResultados[] = $linha; 
            }
        }
        return $arrayResultados;
    }

    function query($sql) {
    	return mysqli_query($this->conexao, $sql);
    }

    function erro() {
        return mysqli_error($this->conexao);
    }
}
?>