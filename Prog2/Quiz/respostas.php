<?php
$q1 = (isset($_POST['q1']) && ($_POST['q1'] === "HTML")) ? true : false;

$q2 = (isset($_POST['q2']) && ($_POST['q2'] === "CSS")) ? true : false;

$q3 = (isset($_POST['q3']) && count($_POST['q3']) == 3 && 
    in_array('b',$_POST['q3']) && in_array('d',$_POST['q3']) &&
    in_array('e',$_POST['q3'])) ? true : false;

$q4 = (isset($_POST['q4']) && ($_POST['q4']) == 'a') ? true : false;

$q5 = (isset($_POST['q5']) && count($_POST['q5']) == 4 && 
    in_array('a',$_POST['q5']) && in_array('d',$_POST['q5']) &&
    in_array('e',$_POST['q5']) && in_array('f',$_POST['q5'])) ? true : false;

$q6 = (isset($_POST['q6']) && ($_POST['q6']) == 'a') ? true : false;

$q7 = (isset($_POST['q7']) && ($_POST['q7']) == 'Apache') ? true : false;

$q8 = (isset($_POST['q8']) && ($_POST['q8']) == 'Mosaic') ? true : false;

$contAcertos = 0;

$comentario = nl2br(($_POST['comentario']));

$concordo = (isset($_POST['concordo'])) ? true : false;

$email = ($_POST['email']);
?>

<!doctype html>
<html lang="pt-br">
<head>
    <title>Quiz Web</title>
    <meta charset="utf-8">
    <style>
    body {
    	font-family: Verdana;
    	color:#0d244c;
    	font-size:1.2em;
    }
    legend {
    	color:#786007;
    	font-weight:bold;
    }
    h1 {
    	font-size:2em;
    	color:#1b1050;
    	font-weight:bolder;
        text-align: center;
        text-shadow: 2px 0px 2px #6D6498;
        text-shadow: 0px 3px 3px  #Dccc86; 
    }
    div.opcao {
    	width:150px;
    	float:left;
    }
    input, select, textarea{
        color: #735F0A;
        background-color: #fff7D5;
        border: 1px solid #1b1050;
    }

</style>
</head>
<body>
    <h1>Resultados</h1>
    <br><br>
    <fieldset>
        <legend>Questões</legend>
        <p>1: <?php 
        if($q1 == true) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <p>2: <?php 
        if($q2 == true) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <p>3: <?php 
        if($q3 == true) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <p>4: <?php 
        if($q4 == true) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <p>5: <?php 
        if($q5 == true) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <p>6: <?php 
        if($q6 == true) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <p>7: <?php 
        if(($q7 == true) && ($q8 == true)) {
            print_r("correta");
            $contAcertos++;
        }
        else
            print_r("incorreta");?></p>
        <br>
        <p>Total de acertos: <?php 
        $porcentagemAcertos = (int) (($contAcertos/7)*100);
        print_r($contAcertos. " (".$porcentagemAcertos."%)"); ?> </p>
    </fieldset>
    <br>
    <fieldset>
        <legend>Comentário</legend>
        <?php print_r($comentario); ?>
    </fieldset>
    <br>
    <fieldset>
        <p><?php 
        if($concordo == true)
            print_r("Você autorizou o recebimento de propagandas no endereço ". $_POST['email'].".");
        else
            print_r("Você não autorizou o recebimento de propagandas no endereço ". $_POST['email'].".");
        ?></p>
    </fieldset>
</form>
<br>
</body>
</html>
