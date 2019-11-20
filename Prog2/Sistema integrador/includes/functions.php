<?php
function formataPreco($valor){
	return "R$ ".str_replace(".", ",", number_format($valor, 2));
}
?>