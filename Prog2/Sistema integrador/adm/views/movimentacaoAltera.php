<h2>Alteração informações da Congregação</h2>
<br>
<form action="movimentacaoController.php?acao=altera" method="post" id="form-cadastro">
 <div class="form-item">
   <label for="tipoMovimentacao" class="rotulo">Tipo movimentação::</label><br>
   <select name="tipoMovimentacao" id="tipoMovimentacao">
     <option value="EN" <?=$mov[0]['tipoMovimentacao'] === 'EN' ? 'selected' : '' ?>>Entrada</option>
       <option value="SD" <?=$mov[0]['tipoMovimentacao'] === 'SD' ? 'selected' : '' ?>>Saída</option>
   </select>
   <span class="msg-erro" id="msg-idCongregacao"></span>
  </div>
  <br>
<div class="form-item">
  <label for="formaPagamento" class="rotulo">Tipo movimentação::</label><br>
  <select name="formaPagamento" id="formaPagamento">
      <option value="DN" <?=$mov[0]['formaPagamento'] === 'DN' ? 'selected' : '' ?>>Dinheiro</option>
      <option value="CC" <?=$mov[0]['formaPagamento'] === 'CC' ? 'selected' : '' ?>>Cartão de crédito</option>
      <option value="CD" <?=$mov[0]['formaPagamento'] === 'CD' ? 'selected' : '' ?>>Cartão de débito</option>
      <option value="CQ" <?=$mov[0]['formaPagamento'] === 'CQ' ? 'selected' : '' ?>>Cheque</option>
      <option value="BB" <?=$mov[0]['formaPagamento'] === 'BB' ? 'selected' : '' ?>>Boleto bancário</option>
      <option value="DB" <?=$mov[0]['formaPagamento'] === 'DB' ? 'selected' : '' ?>>Depósito bancário</option>
      <option value="OT" <?=$mov[0]['formaPagamento'] === 'OT' ? 'selected' : '' ?>>Outros</option>
    </select>
    <span class="msg-erro" id="msg-idCongregacao"></span>
</div>
  <br>
  <div class="form-item">
    <label for="parcelas" class="rotulo">Total de parcelas:</label><br>
    <input type="number" id="parcelas" name="parcelas" size="5" value="<?=$mov[0]['parcela']?>">
    <span class="msg-erro" id="msg-parcelas"></span>
</div>
  <br>
  <div class="form-item">
  <label for="valor" class="rotulo">Valor:</label><br>
  <input type="text" id="valor" name="valor" size="15" placeholder="0.00"
      value="<?=str_replace(".", ",", number_format($mov[0]['valor'], 2));?>">
  <span class="msg-erro" id="msg-valor"></span>
</div>
<br>
<div>
  <table>
    <tr>
      <td>
        <div>
          <input class="button" id="btnGravar" type="submit" value="Alterar" name="alterar">
        </div>
      </td>
    </tr>
  </table>
</div>
<div>
  <input type="hidden" name="idMovimentacao" value="<?=$mov[0]['idMovimentacao'];?>">
</div>
</div>
</form>
