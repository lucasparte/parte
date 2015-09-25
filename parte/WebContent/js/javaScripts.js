/*******************************************************************************
 * Function: envoy() Detecta si ya se ha hecho un submit en un formulario
 * Parâmetros:no Retorno:messagem alert
 ******************************************************************************/       
// T.I.
	// abrePopup('http://192.168.240.211/psdc/cadastro.ConsultaIdentificacaoPessoaComponente.jsf?dados=CRURS90200927999',1100,700,window.location.host,'/crur');
	
	// T.U.
	abrePopup('/psdc/cadastro.ConsultaIdentificacaoPessoaComponente.jsf?dados=CRURS90200927999',1100,700,window.location.host,'/crur');

var count=0;
function envoy() {                       
  if (count == 0){
	  count++;
      return true;
  }else {
     alert("Os dados estão sendo processados...");
     return false;
  }
}

/************************************************
* function naoEspeciaisApenas
* Retorna apenas caracteres não especiais.
* Input: myfield, e 
************************************************/       
function naoEspeciaisApenas(myfield, e)
{
    var key;
    var keychar;
    
    if (window.event)
       key = window.event.keyCode;
    else if (e)
       key = e.which;
    else
       return true;
    keychar = String.fromCharCode(key);
    // control keys
    if ((key==null) || (key==0) || (key==8) || 
        (key==9) || (key==13) || (key==27) )
       return true;
    // caracteres especiais
    else if ((key==39) || (key==38) || (key==64) || 
        (key==60) || (key==62) || (key==59) || 
        (key==125) || (key==123) || (key==34))
       return false;
    else
       return true;
}

/************************************************
* function : hasValue
* Descrição : Verifica se a string nao e composta somente de 
* espaços.
* Input: texto 
************************************************/       
function hasValue(texto) {
    var novoTexto = ""  
    for(iTmp=0;iTmp<texto.length;iTmp++) {
        if(texto.charAt(iTmp) != " ") {
            return true;
        }
    }
    return false;
}

/************************************************
* Function  : max_car
* Descrição : Valida campo com mais de 255 caracteres
*************************************************/
function max_car(objeto,nome) {
    var desc = new String(objeto.value);
    if (desc.length > 255) {
        alert("Campo " + nome + " excedeu os 255 caracteres permitidos");
        objeto.value=desc.substring(0,255);		
        objeto.focus();			
        return false;
    }
}

/************************************************
* Function: showtip
* Cria um ToolTip
* Input: this, evento, texto
************************************************/

function showtip(current, e, text) {
    current.style.cursor = 'hand';
    if (document.all) {
        thetitle = text.split('<br>');
        if (thetitle.length > 1) {
            thetitles = '';
            for (i = 0; i < thetitle.length; i++)
                thetitles += thetitle[i];
            current.title = thetitles;
        } else 
            current.title = text;
    } else if (document.layers) {
        document.tooltip.document.write('<layer bgColor="white" style="border:1px solid black;font-size:12px;">' + text + '</layer>');
        document.tooltip.document.close();
        document.tooltip.left = e.pageX + 5;
        document.tooltip.top = e.pageY + 5;
        document.tooltip.visibility = "show";
    }
}


/************************************************
* Function: isMember
* Input: texto, texto
************************************************/
function isMember(strValue, strArray) {
    var isMemberResult = false;
    var strArrayLen = strArray.length;
    var iStrArray;

    for (iStrArray=0; iStrArray < strArrayLen; iStrArray++) {
        if (strValue == strArray[iStrArray]) {
            isMemberResult = true;
            break;
        }
    }

    return isMemberResult;
}

/************************************************
* Function: fieldFormat
* Input: inputObj, format, allowed
************************************************/
function fieldFormat(inputObj, format, allowed) {
    var thisValue = inputObj.value;
    var thisLength = thisValue.length;
    var formatLength = format.length;
    var validArray = new Array();

    for (var i=0; i < allowed.length; i++) {
        validArray[i] = allowed.substr(i,1);
    }

    for (var i=0; i < thisLength; i++) {
        if (i < formatLength) {
            if (format.substr(i,1) == '*') {
                if (!isMember(thisValue.substr(i,1), validArray)) {
                    thisValue = thisValue.substr(0,i) + thisValue.substr(i+1);
                    thisLength = thisValue.length;
                    i--;
                }
            } else {
                if (thisValue.substr(i,1) != format.substr(i,1)) {
                    thisValue = thisValue.substr(0,i) + format.substr(i,1) + thisValue.substr(i);
                    thisLength = thisValue.length;
                }
            }
        } else {
            thisValue = thisValue.substr(0,i);
            thisLength = thisValue.length;
        }
    }

    if (inputObj.value != thisValue) {
        inputObj.value = thisValue;
    }
}








/** **********************************************
* Function  : excluir
* Descrição : confirma a exclusão
************************************************ */
function excluir() {  
	if (confirm("Deseja Excluir?")){
	    return true;
	} else{
		return false;
	}
}

/** **********************************************
* Function  : excluir Registro
* Descrição : confirma a exclusão
************************************************ */
function excluirRegistro(){
	if(confirm("Deseja excluir o registro?")){
		return true;
	} else{
		return false;
	}
}

/** **********************************************
* Function  : excluir Cartorio
* Descrição : confirma a exclusão
************************************************ */
function excluirRegistroCartorio(){
	if(confirm("Deseja excluir o Cart\u00F3rio?")){
		return true;
	}else{
		return false;
	}
}

/** **********************************************
* Function  : excluir Area
* Descrição : confirma a exclusão
************************************************ */
function excluirArea(){
	if(confirm("Deseja excluir a \u00C1rea?")){
		return true;
	}else{
		return false;
	}
}

/** **********************************************
* Function  : excluir Distribuição Area
* Descrição : confirma a exclusão
************************************************ */
function excluirDistribuicaoArea(){
	if(confirm("Todos os itens relacionados a esta distribui\u00e7\u00e3o de \u00e1rea ser\u00e3o exclu\u00eddos automaticamente. Deseja continuar?")){
		return true;
	}else{
		return false;
	}
}

/** **********************************************
* Function  : alterar
* Descrição : confirma a alteração
************************************************ */

function alterar() {
	 if (confirm("Deseja Confirmar a Altera\u00E7\u00E3o?")){
		 alert("Altera\u00E7\u00E3o Efetuada com Sucesso!");
		 return true;
	 }else{
		 return false;
	 }
}


/** **********************************************
* Function  : cancelar
* Descrição : cancela e retorna para pagina
************************************************ */
function cancelar() {
    if (confirm("Deseja cancelar?")){
    	alert("Cancelado!");
    	return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : validar
* Descrição : confirma a inclusão
************************************************ */
function validar() {
    if (confirm("Deseja Validar as Informa\u00e7\u00f5es?")){
       alert("Atualiza\u00e7\u00e3o Efetuada com Sucesso!");
       return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : validarParametro
* Descrição : validar
************************************************ */
function validarParametro() {
       
	alert("Par\u00E2metro Validado com Sucesso!"); 
    
 }

/** **********************************************
* Function  : atualização
* Descrição : confirma a atualização 
************************************************ */
function atualizacao() {
    alert("Atualiza\u00e7\u00e3o Efetuada com Sucesso!");                                   
}

/** **********************************************
* Function  : aprovar
* Descrição : Confirma uma aprovação. 
************************************************ */
function aprovar() {
    alert("Par\u00E2metro Aprovado com Sucesso!");
}

/** **********************************************
* Function  : rejeitar
* Descrição : confirma a alteração
************************************************ */
function rejeitar() {
    if (confirm("Deseja Confirmar a Rejei\u00E7\u00E3o?")){
       alert("Par\u00E2metro Rejeitado com Sucesso!");
       return true;
    }else{
    	return false;
    }
}
/** **********************************************
* Function  : confirmarExclusao
* Descrição : confirma a alteração
************************************************ */
function confirmarExclusao() {
    if (confirm ("Deseja Confirmar a Exclus\u00E3o?")){
        alert("Par\u00E2metro Exclu\u00EDdo com Sucesso!");
        return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : confirmarExclusaoBloqueio
* Descrição : confirma a exclusao
************************************************ */
function confirmarExclusaoBloqueio() {
    if (confirm ("Deseja Confirmar a Exclus\u00E3o?")){
        return true;
    }else{
    	return false;
    }
}


/** **********************************************
* Function  : confirmarExclusao
* Descrição : confirma a alteração
************************************************ */
function confirmarExclusaoAgente() {
    if (confirm ("Deseja Confirmar a Exclus\u00E13o?")){
        alert("Agente Exclu\u00EDdo com Sucesso!");
        return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : confirmarInclusão
* Descrição : confirma a inclusão
************************************************ */
function confirmarInclusao() {
    if (confirm("Deseja Confirmar a Inclus\u00E3o?")){
       alert("Inclus\u00E3o Efetuada com Sucesso!");
       return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : confirmarInclusão
* Descrição : confirma a inclusão
************************************************ */
function incluir() {
    if (confirm("Deseja Confirmar a Inclus\u00E3o?")){
    	alert("Par\u00E2metro Inclu\u00EDdo com Sucesso!");
    	return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : retirar
* Descrição : confirma a retirada
************************************************ */
function retirar() {
    if (confirm("Deseja Confirmar a Retirada?")){
    	alert("Retirada Solicitada com Sucesso!");
    	return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : alterarPublico
* Descrição : confirma a alteração
************************************************ */
function alterarPublico() {
    if (confirm("Deseja alterar público alvo e enviar para restrições?")){
    	alert("Indicação de Negócios Cód.00001 alterada e enviada para restrição com sucesso!");
    	return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : imprimir
* Descrição : Impressão
************************************************ */
function imprimir() {
    alert("Impress\u00E3o Realizada com Sucesso!");
}

/** **********************************************
* Function  : gerarPDF
* Descrição : pdf
************************************************ */
function gerarPDF() {
    alert("PDF Gerado com Sucesso!");
}

/** **********************************************
* Function  : incluirOcorrencia
* Descrição : incluir uma ocorrencia
************************************************ */
function incluirOcorrencia() {
    alert("Ocorr\u00EAncia Inclu\u00EDda com Sucesso!");
}

/** **********************************************
* Function  : alterarOcorrencia
* Descrição : altera uma ocorrencia
************************************************ */
function alterarOcorrencia() {
    alert("Altera\u00e7\u00e3o Realizada com Sucesso!");
}

/** **********************************************
* Function  : excluirOcorrencia
* Descrição : exclui uma ocorrencia
************************************************ */
function excluirOcorrencia() {
	if (confirm("Confirmar Exclus\u00E3o?")){
    	return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : gerarBoleto
* Descrição : gera um boleto
************************************************ */
function gerarBoleto() {
    alert("Boleto Gerado com Sucesso!");
}

/** **********************************************
* Function  : salvarPromessa
* Descrição : salva uma promessa
************************************************ */
function salvarPromessa() {
    alert("Promessa Realizada com Sucesso!");
}

/** **********************************************
* Function  : bloquear
* Descrição : bloqueia uma ocorrencia
************************************************ */
function bloquear() {
	var confirm=confirm("Deseja Confirmar o Bloqueio?");
	if (confirm){
		alert("Bloqueio Efetuado com Sucesso");
    	return true;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : Desbloquear
* Descrição : Desbloqueia uma ocorrencia
************************************************ */
function desbloquear() {
	var confirm=confirm("Deseja Confirmar o Desbloqueio?");
	if (confirm){
		alert("Desbloqueio Efetuado com Sucesso");
    	return true;
    }else{
    	return false;
    }
}
/** **********************************************
* Function  : Remanejar
* Descrição : Remanejar um contrato
************************************************ */
function remanejar() {
	var confirm=confirm("Deseja Remanejar o Contrato?");
	if (confirm){
		alert("Remanejamento Efetuado com Sucesso");
    	return true;
    }else{
    	return false;
    }
}
/** **********************************************
* Function  : excluirAgente
* Descrição : confirma a exclusão
************************************************ */
function excluirAgente() {  
	if (confirm("Deseja Excluir o Agente?")){
	    return true;
	} else{
		return false;
	}
}  

/** **********************************************
* Function  : max_car_area
* Descrição : Valida campo com mais de 255 caracteres
************************************************ */
function contar(objeto,nome) {
    var desc = new String(objeto.value);
    if (desc.length > 5) {
        alert("Campo " + nome + " excedeu os 255 caracteres permitidos");
        objeto.value=desc.substring(0,255);		
        objeto.focus();			
        return false;
    }else{
    	return false;
    }
}

/** **********************************************
* Function  : gerar Protocolo
* Descrição : Confirma uma aprovação. 
************************************************ */
function gerarProtocolo() {
    alert("Protocolo Gerado com Sucesso!");
}




function estornar() {
    alert("Par\u00E2metro estornado com Sucesso!");
}




/** **********************************************
* Function  : excluir
* Descrição : confirma a exclusão
************************************************ */
function dotar() {  
	if (confirm("Deseja Confirmar a Dotacao?")){
	    return true;
	} else{
		return false;
	}
}  
/** **********************************************
* Function  : indicacao
* Descrição : confirma a exclusão
************************************************ */
function indicacao() {  
	if (confirm("Deseja Confirmar a Indicaç\u00E3o?")){
	    alert("Indicaç\u00E3o efetuada com sucesso!");
	    return true;
	} else{
		return false;
	}
}  

/** **********************************************
* Function  : indicacao
* Descrição : confirma a exclusão
************************************************ */
function rejeitaIndicacao() {  
	if (confirm("Deseja Cancelar a Indicação?")){
	    alert("Indicaç\u00E3o cancelada com sucesso!");
	    return true;
	} else{
		return false;
	}
}

/** **********************************************
* Function  : confirmaAlteracao
* Descrição : confirma a Indicação ao cliente
************************************************ */
function confirmaAlteracao() {  
	if (confirm("Deseja confirmar a altera\u00e7\u00E3o do p\u00FAblico alvo?")){
	    alert("Altera\u00e7\u00E3o do p\u00FAblico alvo enviada com sucesso!");
	    return true;
	} else{
		return false;
	}
}  

/** **********************************************


/*******************************************************************************
 * Function : indicacaoAoCliente Descrição : confirma a Indicação ao cliente
 ******************************************************************************/
function indicacaoCliente() {  
	if (confirm("Deseja Enviar a Indica\u00e7\u00E3o ao Cliente?")){
	    alert("Indica\u00e7\u00E3o enviada com sucesso!");
	    return true;
	} else{
		return false;
	}
}  

/** **********************************************


/*******************************************************************************
 * Function : indicacaoAoCliente Descrição : confirma a Indicação ao cliente
 ******************************************************************************/
function indicacaoAgencia() {  
	if (confirm("Indica\u00e7\u00E3o enviada às agências com sucesso!")){
	    //alert("Indica\u00e7\u00E3o enviada com sucesso!");
	    return true;
	} else{
		return false;
	}
}

/* Função para habilitar Botao Selecionar Publico Alvo */
function habilitaPublicoAlvo(num)
{
if (num=="S")
{
document.getElementById("selecionarPublicoAlvo").disabled = false;
}
else
	document.getElementById("selecionarPublicoAlvo").disabled = true;
}


function trim(str) {
	if (str != null) {
		return str.replace(/^\s+|\s+$/, "");
	}
	return "";
}

function mascara(o, tipo) {
	if (tipo == 'moeda') {
		transformaMoeda(o);
	}
	else if (tipo == 'percentual') {
		transformaPercentual(o);
	}	
}

function mascaraDecimal(o, tipo) {
	alert('aq');
	if (tipo == 'moeda') {
		transformaMoeda(o);
	}
	else if (tipo == 'percentual') {
		transformaPercentual(o);
	}	
}

function transformaMoeda(z){
    v = z.value;
    
    v=v.replace(/\D/g,"");  // permite digitar apenas números
    
    // remove os zeros iniciais
    if(v.substring(0, 2) == "00"){
		v = v.substring(2);
	}
    if(v.substring(0, 1) == "0"){
		v = v.substring(1);
	}
    
    switch (v.length) {
	    case 1: // acrescenta os 00 iniciais
	    	v = "00" + v;
	    	break;
	    case 2: // acrescenta o 0 inicial
	    	v = "0" + v;
	    	break;
	    
	    default: // do nothing
	    	break;
    }
    
    v=v.replace(/[0-9]{16}/,v.substring(0,15));   // limita pra máximo
													// 9.999.999.999.999,99
    v=v.replace(/(\d{1})(\d{14})$/,"$1.$2");  // coloca ponto antes dos
												// últimos 14 digitos
    v=v.replace(/(\d{1})(\d{11})$/,"$1.$2");  // coloca ponto antes dos
												// últimos 11 digitos
    v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");  // coloca ponto antes dos
												// últimos 8 digitos
    v=v.replace(/(\d{1})(\d{5})$/,"$1.$2");  // coloca ponto antes dos
												// últimos 5 digitos
    v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");// coloca virgula antes dos
												// últimos 2 digitos
   
    z.value = v;
}

function transformaPercentual(z){
    v = z.value;
    
    v=v.replace(/\D/g,"");  // permite digitar apenas números
    
    // remove os zeros iniciais
    if(v.substring(0, 4) == "0000"){
		v = v.substring(4);
	}
    if(v.substring(0, 3) == "000"){
		v = v.substring(3);
	}
    if(v.substring(0, 2) == "00"){
		v = v.substring(2);
	}
    if(v.substring(0, 1) == "0"){
		v = v.substring(1);
	}
    
    switch (v.length) {
	    case 1: // acrescenta os 00 iniciais
	    	v = "0000" + v;
	    	break;
	    case 2: // acrescenta o 0 inicial
	    	v = "000" + v;
	    	break;
	    case 3: // acrescenta o 0 inicial
	    	v = "00" + v;
	    	break;
	    case 4: // acrescenta o 0 inicial
	    	v = "0" + v;
	    	break;
	    
	    default: // do nothing
	    	break;
    }
    
    v=v.replace(/[0-9]{8}/,v.substring(0,7));   // limita pra máximo 999,9999
    v=v.replace(/(\d{1})(\d{1,4})$/,"$1,$2");// coloca virgula antes dos
												// últimos 2 digitos
   
    z.value = v;
}


function limpaVar(palavra,chars){
	var replaces = chars.split("");
		for(var i=0;i<replaces.length;i++){
		palavra = palavra.split(replaces[i]).join("");
	}
	return palavra;
}


function validarEnter() {
	
	if(event.keyCode==13){ 
		return true;
	}else{
		return false;
	}
}

function submitForm(botao){
	botao.disabled = false;
	botao.click();
}		 

/** *******************************************************************
* Function  : getSelecionaRadioGrid
* Descrição : retorna booleano para elemento radio selecionado na grid
********************************************************************* */
function getSelecionaRadioGrid(form){
	
	var elementos = form.elements;
	var find = false;
	
	for(i=0;i<elementos.length;i++){
		if(elementos[i].type == "radio"){
			if(elementos[i].checked){
				find=true;
				break;
			}
		}
	}
	
	
	return find;
	
}

function validarInteiro(element){
	var valor = element.value;
    valor = parseInt(valor);
    if (isNaN(valor)) {
    	element.value = "";
    }
}

/** **********************************************
* Function  : excluir Animais Aves e Outros
* Descrição : confirma a exclusão
************************************************ */
function excluirRegistroAnimais() {
	if(confirm("Deseja excluir os Animais /Aves /Outros?")) {
		return true;
	} else {
		
		return false;
	}
	
}

/** **********************************************
* Function  : cancelar Ficha cadastral rural
* Descrição : confirma a exclusão
************************************************ */
function cancelarFicha(){
	if(confirm("Confirma o cancelamento das altera\u00E7\u00F5es efetuadas na ficha cadastral rural?")){
		return true;
	} else{
		return false;
	}
}

function confirmarExclusaoLavoura() {
	if(confirm("Deseja Excluir a Lavoura?")) {
		return true;
	} else {
		
		return false;
	}
	
}

function excluirObjetoMaquinaRural() {
	if(confirm("Deseja Excluir a Maquina Rural?")) {
		return true;
	} else {
		return false;
	}
}


/** **********************************************
* Function  : validar Ficha cadastral rural
* Descrição : validar alterações Ficha
************************************************ */
function validarFicha(){
	if(confirm("Deseja Validar a Ficha Cadastral Rural?")){
		return true;
	} else{
		return false;
	}
}

/** **********************************************
* Function  : cancelar manutencao Ficha cadastral rural
* Descrição : cancelar alterações Ficha
************************************************ */
function cancelarManutencaoFicha(){
	if(confirm("Confirma o cancelamento das altera\u00E7\u00F5es efetuadas na ficha cadastral rural?")){
		return true;
	} else{
		return false;
	}
}/** **********************************************
* Function  : excluirImovel
* Descrição : confirma a exclusão
************************************************ */
function excluirImovel() {  
	if (confirm("Todos os Itens relacionados ao im\u00f3vel rural explorado ser\u00e3o exclu\u00eddos automaticamente. Deseja Continuar?")){
	    return true;
	} else{
		return false;
	}
}
/** **********************************************
* Function  : excluirBenfeitoria
* Descrição : confirma a exclusão
************************************************ */
function excluirRegistroBenfeitoria() {
	if(confirm("Deseja excluir a Benfeitoria ? ")) {
		return true;
	}else{
		return false;
	}
	
}


function confirmarExclusaoBanco() {  
	if (confirm("Deseja Excluir Responsabilidade Outros Bancos?")){
	    return true;
	} else{
		return false;
	}
}

function excluirRegistroObjetoProprietario() {
	if(confirm("Deseja Excluir o Propriet\u00E1rio?")){
		return true;
	}else{
		return false;
	}
}

/** **********************************************
* Function  : excluir Responsabilidade Rural
* Descrição : confirma a exclusão
************************************************ */
function excluirResponsabilidadeRural() {
	if(confirm("Deseja excluir a Responsabilidade Rural?")) {
		return true;
	} else {
		
		return false;
	}
	
}

function confirmarExclusaoRenda() {  
	if (confirm("Deseja Excluir a Renda Agropecu\u00E1ria?")){
	    return true;
	} else{
		return false;
	}
}

function confirmarExclusaoDadoComplementar() {  
	if (confirm("Deseja Excluir os Dados Complementares?")){
		return true;
	} else{
		return false;
	}
}

function modalAnswer(caller, action){
	clear_linkDummyForm();
	document.forms['linkDummyForm'].elements['autoScroll'].value=getScrolling();
	document.forms['linkDummyForm'].elements['linkDummyForm:_link_hidden_'].value=caller.id;
	document.forms['linkDummyForm'].elements['action'].value=action;
	document.forms['linkDummyForm'].submit();
}

function modalAnswerPopupSim(){
    modalAnswerPopupPrivate(true);
}

function modalAnswerPopupNao(){
    modalAnswerPopupPrivate(false);
}

function modalAnswerPopupPrivate(flag){
    var $botaoModalConfirmEnviar = $("#formModalConfirm\\:formModalConfirmPopup");
    var $botaoModalConfirmFlag = $("#formModalConfirm\\:formModalConfirmPopupFlag");
    $botaoModalConfirmFlag.attr("value", flag);
    $botaoModalConfirmEnviar.click();
}

//Chamada Fake para executar uma ação no botão pelo modal
function modalAnswerOpener(caller, action){
    window.opener.clear_linkDummyForm();
    window.opener.document.forms['linkDummyForm'].elements['autoScroll'].value=window.opener.getScrolling();
    window.opener.document.forms['linkDummyForm'].elements['linkDummyForm:_link_hidden_'].value=caller.id;
    window.opener.document.forms['linkDummyForm'].elements['action'].value=action;
    window.opener.document.forms['linkDummyForm'].submit();
}


//FUNCAO UTILIZADA PARA DESATIVAR BOTOES
function desabilitarBotoes(form, botoes, item) {
	
	itemSelecionado = document.getElementsByName(item);
	
	selecionado = false;
	
	if (itemSelecionado != null) {
		for(j=0; j < itemSelecionado.length; j++){
			if (itemSelecionado[j].attributes.checked.value == "true"){
				selecionado = true;
			}
		}
	}
	
	if (selecionado == false || itemSelecionado == null) {	
		for(i=0; i < botoes.length; i++) {
			button = document.getElementById(form + ":" + botoes[i]);
			if (button != null) {
				button.disabled = true;
			}
		}
	}
}


function validarTelefone(valor){
	if(valor.value.length<14){
		return '';
	}else{
		return valor.value;
	}
}


function mascaraTelefone(o, f) {
	v_obj = o;
    v_fun = f;
    setTimeout(execmascara, 1);
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function mtel(v) {
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}

function habilitarBotao(botao, campo) {

	valorInput = campo.value;
	botaoAdicionar = document
			.getElementById(botao);

	if (valorInput == "") {
		botaoAdicionar.disabled = true;
	} else if (valorInput != "") {
		botaoAdicionar.disabled = false;
	}
}

function arredondaMilhar(valor) {
	var resultado = valor;
	
	var centena = parseInt(valor.toString().slice(-3), 10);
					
	var resto = 1000 - centena;
	
	if (resto < 1000) {
		if (resto > 500) {
			resultado = valor - centena;
		} else {
			resultado = valor + resto;
		}
	}
	return resultado;
}

function obterPercentual(valorParcial, valorTotal, casasDecimais) {
	
	var resultado = ((valorParcial * 100) / valorTotal);
	if (resultado > 999.9999) {
		resultado = 999.9999;
	}
	
	return resultado.toFixed(casasDecimais);	
}

var tempPercentual = "";

function calculoPercentagem() {
	var formName = document.forms[0].name+":";
	var valorDotacao = document.getElementById(formName + "hiddenValorDotacao");
	var valor = document.getElementById(formName + "inputValor");
	var percentual = document.getElementById(formName + "inputPercentual");
	if (!valor.readOnly) {
		if (isEmptyOrNull(valor.value) == false) {
				
			var v = ((parseFloat(valor.value) * 100) / parseFloat(formatarPontoVirgula(valorDotacao.value)));
			if (v > 999.9999) {
				v = 999.9999;
			}

			tempPercentual = v;
			percentual.value = formatarVirgulaPonto(v.toFixed(4));
		} else {
			percentual.value = "";
		}
	}
}

function calculoValor() {
	var formName = document.forms[0].name+":";
	var valorDotacao = document.getElementById(formName + "hiddenValorDotacao");
	var valor = document.getElementById(formName + "inputValor");
	var percentual = document
			.getElementById(formName + "inputPercentual");

	if (!percentual.readOnly) {
		if (isEmptyOrNull(percentual.value) == false) {
			var percentualFloat = parseFloat(formatarPontoVirgula(percentual.value));
			var v = ((parseFloat(formatarPontoVirgula(valorDotacao.value)) * percentualFloat) / 100);

			tempPercentual = v;
			valor.value = formatarVirgulaPonto(v.toFixed(2));
		} else {
			valor.value = "";
		}
	}
}

function formatarPontoVirgula(v) {

	v = limpaVar(v, '.');

	return v.replace(',', '.');
}

function formatarVirgulaPonto(v) {
	return v.replace('.', ',');
}

function desabilitaPercentual() {
	var formName = document.forms[0].name+":";
	var valor = document.getElementById(formName + "inputValor");
	var percentual = document
			.getElementById(formName + "inputPercentual");
	/* Verifica se foi o botão shift não foi acionado e com o tab */
	if (event.shiftKey == false && (event.keyCode == 16)) {
		percentual.readOnly = true;
		valor.readOnly = false;
		valor.focus();
		valor.select();
		/* Verifica se foi o botão shift foi acionado e com o tab */
	} else if (event.shiftKey == true
			&& (event.keyCode == 9 || event.keyCode == 16)) {
		percentual.readOnly = true;
		valor.focus();
		valor.select();
	}
}

function desabilitaValor() {
	var formName = document.forms[0].name+":";
	var valor = document.getElementById(formName + "inputValor");
	var percentual = document
			.getElementById(formName + "inputPercentual");
	/* Verifica se foi o botão tab não acionado e campo percentual preenchido */
	if (event.keyCode != 9 && (isEmptyOrNull(percentual.value) == false)) {
		valor.readOnly = true;
		percentual.readOnly = false;
		/* Verifica se foi o botão tab acionado e campo percentual vazio */
	} else if (event.keyCode == 9 && (isEmptyOrNull(valor.value) == true)) {
		valor.readOnly = true;
		percentual.readOnly = false;
		percentual.focus();
		percentual.select();
		/* Verifica se foi o botão tab acionado e campo percentual preenchido */
	} else if (event.keyCode == 9 && (isEmptyOrNull(valor.value) == false)) {
		valor.readOnly = true;
		percentual.focus();
		percentual.select();
	}
}

function isEmptyOrNull(v) {
	var retorno = false
	if ((v == "") || (v == null)) {
		retorno = true;
	}
	return retorno;
}

function chamarTelaCadu() {
	//T.U.
	abrePopup('http://192.168.240.211/psdc/cadastro.ConsultaIdentificacaoPessoaComponente.jsf?dados=CRURS90200927999',1100,700,window.location.host,'/crur');
	
	// T.I.
	// abrePopup('/psdc/cadastro.ConsultaIdentificacaoPessoaComponente.jsf?dados=CRURS90200927999',1100,700,window.location.host,'/crur');
}

function validarNumerico(valores, campo) {
    for(var i =0; i < campo.value.length; i++) {
    	if(valores.indexOf(campo.value.charAt(i)) == -1) {
    		campo.value = campo.value.replace(campo.value.charAt(i),' ');
    	}
    }
    campo.value = campo.value.replace(' ','');
}

/**********************************************
* 
* IDENTIFICA O QUE FOI DIGITADO E CONVERTE PARA NUMEROS INTEIROS
* 
* @param campo
* @param event
* @param casas
* @param inteiros
* @return
*/
function mascaraDecimal(campo,event,casas,inteiros) {
   var BCK = 8, //backspace                
   ETR = 13, //enterR          
   DEL = 127, //delete 
   TAB = 9, //tab 
   key, tecla;
   var valores="1234567890";
   tecla = event.which?event.which:event.keyCode;
   key = String.fromCharCode(tecla);
   if (event.type == 'keyup') {
       if (campo.value == '') {
           return true;
       }
       switch (tecla) {
           case ETR:
           case TAB:
               return true;
           default:
               var casasDecimais = parseInt(casas);
               campo.value = campo.value.replace(/\D/g,"");
               while(campo.value.length < casasDecimais+1) {
                   campo.value = "0" + campo.value;
               }
               campo.value = campo.value.substr(0,campo.value.length-casasDecimais)+','+ campo.value.substr(campo.value.length-casasDecimais);
               
               while(campo.value.charAt(0) == '0') {
                   campo.value = campo.value.substr(1);
               }                
               var posVir = campo.value.indexOf(',');                
               for (var i = posVir - 3; i > 0; i=i-3) {                
                   campo.value = campo.value.substr(0,i) + '.' + campo.value.substr(i);                
               }                
               if (campo.value.charAt(0) == ',') {
                   campo.value = '0'+campo.value;
               }
       }                    
   } else if (event.type == 'keypress'){                           
       switch (tecla) {
           case ETR:
           case BCK:
           case DEL:
           case TAB:
               return true;
           default:                
               if (valores.indexOf(key) != -1) {
                   var numInteiros = parseInt(inteiros);
                   var casasDecimais = parseInt(casas);
                   if (campo.value.replace(/\D/g,"").length >= numInteiros + casasDecimais) {  
                       var textoSelecionado;
                       if (document.selection) {
                           textoSelecionado = document.selection.createRange().text;
                       } else {                            
                           textoSelecionado = campo.value.substring(campo.selectionStart,campo.selectionEnd);
                       }
                       if(textoSelecionado.length > 0) {
                           return true;
                       }
                       return false;                       
                   }
                   return true;
               }
       }   
       return false;   
   } else if(event.type == 'blur'){
      campo.value = campo.value.replace(/\D/g,"");
   }
   
   
}
/**********************************************
* 
* FUNCAO UTILIZADA NAS FUNCOES ONBLUR E ONPASTE
* 
* @param campo
* @return
*/
function mascaraNumero(campo){
        var v = campo.value;
        v=v.replace(/\D/g,"");
        campo.value=v;
}

/**********************************************
* 
* VARIAVEIS DE APOIO DA FUNCAO CHECARFORMS()
* 
*/

var pLim = new Array(50);
var functionDecimal = "mascaraDecimal";
var functionNumero = "mascaraNumero";
var functionCpfcnpj = "maskCpfCnpj";
var vLim = new Array (50);

/*******************************************************************************
 * 
 * EXECUCAO DA FUNCAO CHECARFORMS()
 * 
 */


checarForms();

/*******************************************************************************
 * 
 * FUNCAO UTILIZADA NAS FUNCOES ONBLUR E ONPASTE
 * 
 * @param texto
 * @param casas
 * @param inteiros
 * @return
 */

function mascaraDecimalOn(texto,casas,inteiros) {

      var valores="1234567890";

      var casasDecimais = parseInt(casas);
      texto = texto.replace(/\\D/g,"");
      while(texto.length < casasDecimais+1) {
            texto = "0" + texto; 
      } 
      texto = texto.substr(0,texto.length-casasDecimais)+','+ texto.substr(texto.length-casasDecimais); 
      
      while(texto.charAt(0) == '0') { 
            texto = texto.substr(1); 
      }                 
      var posVir = texto.indexOf(',');                 
      for (var i = posVir - 3; i > 0; i=i-3) {                 
            texto = texto.substr(0,i) + '.' + texto.substr(i);                 
      }                 
      if (texto.charAt(0) == ',') { 
            texto = '0'+texto; 
      }
      return texto;
} 

/**********************************************
* 
* FUNCAO UTILIZADA NAS FUNCOES ONBLUR E ONPASTE
* 
* @param field
* @return
*/

function mascaraCpfCnpjOn(field){
        var v = field.value;
        if ( v.length <= 14 ) {
            v=v.replace(/\D/g,"");
            v=v.replace(/(\d)(\d{8})$/,"$1.$2");
            v=v.replace(/(\d)(\d{5})$/,"$1.$2");
            v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
        } else if(v.length >= 15){
            v=v.replace(/\D/g,"");
            v=v.substr(0,14);
            v=v.replace(/(\d)(\d{12})$/,"$1.$2");
            v=v.replace(/(\d)(\d{9})$/,"$1.$2");
            v=v.replace(/(\d)(\d{6})$/,"$1/$2");
            v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
        }

        field.value = v;
}

/**********************************************
* 
* FUNCAO UTILIZADA NAS FUNCOES ONBLUR E ONPASTE
* 
* @param texto
* @return
*/


function mascaraNumeroOn(texto){
        var v = texto;
        v=v.replace(/\D/g,"");
        return v;
}

/**********************************************
* 
* FUNCAO UTILIZADA PARA TRATAR CARACTERES QUANDO UM CAMPO E SELECIONADO
* 
* @return
*/

function tratarCaracteresOnBlur() {
   var valor = this.value;
   valor = valor.replace(new RegExp("[^" + pLim + "]", "g"), "");
   event.returnValue = false;
   this.value = valor;
}


/**********************************************
* 
* FUNCAO UTILIZADA PARA TRATAR CARACTERES QUANDO COLADOS
* 
* @return
*/

function tratarCaracteresOnPaste() {
      var paramA;
      var ParamB;
        var campo = document.activeElement;
   idCmpDst = campo.id;
   lmt = "";
      
   for (var i = 0; i < vLim.length;i++) {
       if ( vLim[i][0] == idCmpDst ) {
           paramA = vLim[i][1];
           paramB = vLim[i][2];
       }
   }
   
   for (var i = 0; i < pLim.length; i++) {
         if (pLim[i][0] == idCmpDst) {
               lmt = pLim[i][1];
         }
   }

   var valor = window.clipboardData.getData("Text");
   valor = valor.replace(new RegExp("[^" + lmt + "]", "g"), "");
   event.returnValue = false;
   if (valor != "") {
     if ( paramA != "" & paramB != "" ) {
           
              if (valor.length > (parseInt(paramA) + parseInt(paramB))) {
                  valor = valor.substr(0,(parseInt(paramA) + parseInt(paramB)));
              }
            campo.value = mascaraDecimalOn(valor,paramA,paramB);
     } else {
         if (paramA == "cpfcnpj") {
            valor = valor.substr(0,15);
            campo.value = valor;
            mascaraCpfCnpjOn(campo);
         } else {
                    if (valor.length > parseInt(paramA)) {
                        valor = valor.substr(0,(parseInt(paramA)));
                    }
            campo.value = mascaraNumeroOn(valor);
         }
     }
   }

}

/**********************************************
* 
* FUNCAO UTILIZADA PARA TRATAR CARACTERES QUANDO ARRASTADOS
* 
* @return
*/

function tratarCaracteresOnDrag() {
        var paramA;
        var paramB;
        var campo = document.activeElement;
   idCmpDst = event.srcElement.id;
   lmt = "";

   for (var i = 0; i < vLim.length;i++) {
       if ( vLim[i][0] == idCmpDst ) {
           paramA = vLim[i][1];
           paramB = vLim[i][2];
       }
   }
   
   for (var i = 0; i < pLim.length; i++) {
         if (pLim[i][0] == idCmpDst) {
               lmt = pLim[i][1];
         }
   }
   cmpDst = document.getElementById(idCmpDst);
   var valor = event.dataTransfer.getData("Text");
   valor = valor.replace(new RegExp("[^" + lmt + "]", "g"), "");
   event.returnValue = false;
   if (valor != "") {
       if ( paramA != "" & paramB != "" ) {
             
              if (valor.length > (parseInt(paramA) + parseInt(paramB))) {
                  valor = valor.substr(0,(parseInt(paramA) + parseInt(paramB)));
              }
            cmpDst.value = mascaraDecimalOn(valor,paramA,paramB);
       } else {
         if (paramA == "cpfcnpj") {
            valor = valor.substr(0,15);
            cmpDst.value = valor;
            mascaraCpfCnpjOn(cmpDst);
         } else {
                     if (valor.length > parseInt(paramA)) {
                        valor = valor.substr(0,(parseInt(paramA)));
                    }
                   cmpDst.value = mascaraNumeroOn(valor);
         }
       }
     }
}

/**********************************************
* 
* INICIALIZA AS ARRAYS GLOBAIS DE APOIO A FUNCAO CHECARFORMS()
* 
* @return
*/

function inicializarArray() {
      for (var i = 0; i < pLim.length; i++) {
            pLim[i] = new Array(2);
      }
      for (var i = 0; i < vLim.length; i++) {
            vLim[i] = new Array(3);
      }
}

/**********************************************
* 
* FUNCAO QUE VARRE A TELA E DEFINE EM TODOS OS INPUTS OS ARGUMENTOS ONBLUR, ONPASTE, ONDRAG
* 
* @return
*/

function checarForms() {
   inicializarArray();
   x = document.getElementsByTagName("input");
   count = 0;
   countVLim = 0;
   for (var i=0; i < x.length; i++) {
         outer = x[i].outerHTML;
         if(outer){
                  posI = outer.indexOf(functionDecimal);


                  if (posI != -1) {
                        param = outer.slice(posI);
                      var qId1 = param.indexOf("'") + 1;
                      var qId2 = qId1 + param.slice(qId1).indexOf("'");
                      vLim1 = param.slice(qId1, qId2);

                      qId1 = qId2 + 3; 
                      qId2 = qId1 + param.slice(qId1).indexOf("'");
                      vLim2 = param.slice(qId1, qId2);
                        campo = document.getElementById(x[i].id);
                        vLim[count][0] = campo.id;
                        vLim[count][1]= vLim1;
                        vLim[count][2]= vLim2;
                        campo.ondrop = tratarCaracteresOnDrag;
                        campo.onpaste = tratarCaracteresOnPaste;
                        pLim[count][0] = x[i].id;
                        pLim[count][1] = '0123456789';
                        count++;  
                  } else if ( outer.indexOf(functionNumero) != -1 ) {
                        
                        campo = document.getElementById(x[i].id);
                            var qId1 = outer.indexOf("maxLength") + 10;
                            var qId2 = qId1 + 3;
                            vLim1 = outer.slice(qId1, qId2);
                        vLim[count][0] = campo.id;
                        vLim[count][1] = vLim1;
                        vLim[count][2] = "";
                        campo.ondrop = tratarCaracteresOnDrag;
                        campo.onpaste = tratarCaracteresOnPaste;
                        pLim[count][0] = x[i].id;
                        pLim[count][1] = '0123456789';
                        count++;  
                  } else if ( outer.indexOf(functionCpfcnpj) != -1 ) {
                        
                        campo = document.getElementById(x[i].id);
                            vLim1 = "cpfcnpj";
                        vLim[count][0] = campo.id;
                        vLim[count][1] = vLim1;
                        vLim[count][2] = "";
                        campo.ondrop = tratarCaracteresOnDrag;
                        campo.onpaste = tratarCaracteresOnPaste;
                        pLim[count][0] = x[i].id;
                        pLim[count][1] = '0123456789';
                        count++;  
                  }
         }
   }
}

/**********************************************/
/** Função que desabilita botoes ao paginar * */
function desabilitarBotoes(form, botoes) {
    for(i=0; i < botoes.length; i++) {
          button = document.getElementById(form + ":" + botoes[i]);
          if (button != null) {
                button.disabled = true;
          }
    }
}
/**********************************************/

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
          window.onload = func;
    } else {
          window.onload = function() {
                if (oldonload) {
                      oldonload();
                }
                func();
          }
    }
}

//-- Contador para objeto textarea
function limita(campo, tamanhoMaximo){
    var tamanho = campo.value.length;
    var tex=campo.value;
    if (tamanho>=tamanhoMaximo) {
        campo.value=tex.substring(0, tamanhoMaximo);
    }


    return true;   
}  

function limitadorCaracteres(formId, campoId, destinoId, totalMaximo) {
	var campo =  document.getElementById(formId + (":") + campoId);
	if(campo!=null && campo.value!=null){
		document.getElementById(formId + (":") + destinoId).innerText = (campo.value.length) + " / " + totalMaximo;
	}
}

/**********************************************
 * Marca ou desmarca todos os checks de uma tabela 
 */
 function checkOrUncheckAllItensFromDataTable(caller){
     
     var $caller = $(caller);
     var $frozenTable = $caller.parents(".divTabelaInicioColunasCongeladas");
     var $editableDataTable = $caller.parents(".UIEditableDataTable");
     var $escope = null;
     
     if($frozenTable != null && $frozenTable.size() > 0){
           //Tabela com colunas congeladas
           $escope = $caller.parents("div[id*='fixedColumns']").find("div[id*='fixedBody']");
     }else if($editableDataTable != null && $editableDataTable.size() > 0) {
           $escope = $caller.parents(".UIEditableDataTable-div");
     }else{
           //Tabela normal
           $escope = $caller.parent().parent().parent().parent();
     }
     
     $escope.find(":checkbox").attr("checked", $caller.attr("checked"));
     $caller = null;
     $escope = null;
}

 /**
  * Utilizado para formatar campos decimais, aceitando somente números, ponto e vírgula (Somente uma).
  * 
  * Caso o usuário copie um número "123,123,123,123", irá formatar para "1.231.231.231,23".
  * 
  * @param obj valor para ser validador
  * @param inteiros quantidade de inteiros
  * @param casasDecimais quantidade de casas decimais
  * @return
  */
 function formatarDecimal(obj,inteiros,casasDecimais){
    casasDecimais++;
    var valor = obj.value.replace(/\,/g,'').replace(/\./g,'').replace(/[^0-9]/g, '');
    var i=0,c=1;
    var saida = new String();
    
    if(valor.length >= (inteiros+casasDecimais)){
       valor = valor.substring(0,(inteiros+casasDecimais)-1);
    }
      for(i=valor.length-1;i>=0;i--,c++){
           if (c==casasDecimais){
                           saida = "," + saida;
           }else if (c==casasDecimais+3){
                           saida = "." + saida;
                           casasDecimais += 3;
           }
           saida = valor.charAt(i) + ""  + saida;
      }
    obj.value = saida;
    return true;
} 
 
 /**
  * Utilizado para validar campos inteiros. Aceita somente números inteiros.
  * 
  * @param obj valor a ser validado
  * @return
  */ 
 function validarCampoInteiro(obj){
	var valor = obj.value.replace(/[^0-9]/g, '');
    obj.value = valor;
    return true;
}
 
 /*
  * Utilizado para formatar campos de acordo com a máscara informada.
  * Não aceita a digitação de letras ou caracteres especiais.
  * evento: onkeypress 
  *
  * @param campo Campo a ser formatado
  * @param mascara Máscara a ser utilizada
  * @return
  */
function formatarCampo(campo, mascara){
	var key = window.event.keyCode;  
	
	if(key == 8 || key == 46 || key == 37 || key == 39 || (key > 47 && key < 58)){
		var i = campo.value.length;
		var saida = mascara.substring(0,1);
		var texto = mascara.substring(i);
		if (texto.substring(0,1) != saida){
		  campo.value += texto.substring(0,1);
		}
		return true;
	}else{
		return false;
	}
	
}

  /*
   * Utilizado para validar campos Hora no formato HH:MM:SS. Aceita somente números e dois pontos(:)
   * evento: onblur, onmouseout
   *
   * @param obj Campo a ser validado
   * @return
   */
function validarCampoHora(obj){
	 var valor = obj.value.replace(/[^0-9:]/g, '');
	 var hora = valor.substring(0,2);
	 var minuto = valor.substring(3,5);
	 var segundo = valor.substring(6,8);
			
	 if(hora > 23 || minuto > 59 || segundo > 59){
		valor = "";
	 }
	 if(valor.length == 1 && valor == ':'){
		 valor = "";
	 }
	 obj.value = valor;
	     
	 return true;
	 }

/*
 * Utilizado para não permitir a digitação de caracteres especiais. Aceita somente números, letras e hifen.
 */
function validarTextoNumeroOnKeyPress(){
   tecla = event.keyCode;  
   if ((tecla >= 33 && tecla <= 47) || (tecla >= 58 && tecla <= 64) || (tecla >= 91 && tecla <= 94) || (tecla >= 123 && tecla <= 159) 
   	    || (tecla >= 162 && tecla <= 191)){  
       return false;  
   }else{  
       return true;  
    }  
}
/*
 * Utilizado para não permitir a colar caracteres especiais. Aceita somente números, letras e hifen.
 */
function validarTextoNumeroOnBlur(campo){
	var valor = campo.value.replace(/[^0-9a-zA-Z]/g, '');
	
	campo.value = valor;
}
   
function confirmarExclusaoRendaAgropecuaria() {
	if (confirm("O Empreendimento ser\u00E1 Exclu\u00EDdo de Todos os Im\u00F3veis Rurais. Confirma a Exclus\u00E3o ?")){
		return true;
	} else {
		return false;
	}
} 

function mascaraHora(event, component) {
    var dig = /\d/.test(String.fromCharCode(event.keyCode));
    if (component.value.length > 7) {
          return false;
    }
    
    component.value = component.value.replace(/:/g,"");
    if (component.value == "" && dig) {
          if (new Number(String.fromCharCode(event.keyCode)) > 2) {
                component.value += "2";
          } else {
                component.value = String.fromCharCode(event.keyCode);
          }
          return false;
    }
    if (component.value.length == 1 && dig) {
          component.value += String.fromCharCode(event.keyCode);
          return false;
    }
    
    if (component.value.length == 2 && dig) {
          if (new Number(String.fromCharCode(event.keyCode)) > 5) {
                component.value += "5";
          } else {
                component.value += String.fromCharCode(event.keyCode);
          }
          component.value = component.value.replace(/(\d{2})(\d{1,2})(\d{1,2})$/,"$1:$2");
    } else {
                
          if (component.value.length > 2 && dig) {
                component.value += String.fromCharCode(event.keyCode);
                component.value = component.value.replace(/(\d{2})(\d{1,2})(\d{1,2})$/,"$1:$2:$3");
          }
    }
                
    if (component.value.length == 8) {
          var hora = component.value.substring(0,2)
          var min = component.value.substring(3,5)
          var seg = component.value.substring(6,8)
          if (new Number(hora) > 23) hora = 23;
          if (new Number(min) > 59) min = 59;
                                             if (new Number(seg) > 59) seg = 59;
          
          component.value = hora + ":" + min + ":" + seg;
    }
    
    return false;
}

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    len = objTextBox.value.length;
    for(i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
    aux = '';
    for(; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) objTextBox.value = '';
    if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
    if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
        objTextBox.value += aux2.charAt(i);
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}


function formatar(mascara, documento){
	  var i = documento.value.length;
	  var saida = mascara.substring(0,1);
	  var texto = mascara.substring(i);
	  
	  if (texto.substring(0,1) != saida){
	            documento.value += texto.substring(0,1);
	  }
	  documento.value;
	}

function mascaraTelefone(telefone){ 
	   if(telefone.value.length == 0)
	     telefone.value = '(' + telefone.value; //quando começamos a digitar, o script irá inserir um parênteses no começo do campo.
	   if(telefone.value.length == 3)
	      telefone.value = telefone.value + ') '; //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.
	 
	 if(telefone.value.length == 10)
	     telefone.value = telefone.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.
	  
	}


/* Máscaras ER */
function mascaraT(o,f){
    v_obj=o;
    v_fun=f;
    setTimeout("execmascara()",1);
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value);
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}




function moeda(campo, e)  
{  
   var SeparadorDecimal = ","  ;
   var SeparadorMilesimo = "."  ;
   var sep = 0;  
   var key = '';  
   var i = j = 0;  
   var len = len2 = 0;  
   var strCheck = '0123456789';  
   var aux = aux2 = '';  
   var whichCode = (window.Event) ? e.which : e.keyCode;  
  
  
    
   if (whichCode == 13) return true;  
   key = String.fromCharCode(whichCode); // Valor para o código da Chave  
    
   if (strCheck.indexOf(key) == -1) return true; // Chave inválida  
   len = campo.value.length;  
   for(i = 0; i < len; i++)  
  
       if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != SeparadorDecimal)) break;  
   aux = '';  
   for(; i < len; i++)  
  
       if (strCheck.indexOf(campo.value.charAt(i))!=-1) aux += campo.value.charAt(i);  
   aux += key;  
   len = aux.length;  
  
   if (len == 0) campo.value = '';  
   if (len == 1) campo.value = '0'+ SeparadorDecimal + '0' + aux;  
   if (len == 2) campo.value = '0'+ SeparadorDecimal + aux;  
   if (len > 2) {  
       aux2 = '';  
       for (j = 0, i = len - 3; i >= 0; i--) {  
           if (j == 3) {  
               aux2 += SeparadorMilesimo;  
               j = 0;  
           }  
           aux2 += aux.charAt(i);  
           j++;  
       }  
       campo.value = '';  
       len2 = aux2.length;  
       for (i = len2 - 1; i >= 0; i--)  
       campo.value += aux2.charAt(i);  
       campo.value += SeparadorDecimal + aux.substr(len - 2, len);  
}  
   return false;  
  
}  