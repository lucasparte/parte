/*
   File: funcoesValida.js

   Funções genéricas de validação.
   Todas as funções deste arquivo mostram um aviso caso a validação falhe.
*/

/*
   Function: setColorBad

   Altera a cor de fundo de algum componente Utilizado pelas outras funções.

   Parâmetros:

      el - Componente a ser alterado.

   Retorno:

      nada.
*/
function setColorBad(el) {
  if (el.style) el.style.backgroundColor = "#ffaaaa";
}

/*
   Function: setColorGood

   Altera a cor de fundo de algum componente. Utilizado pelas outras funções.

   Parâmetros:

      el - Componente a ser alterado.

   Retorno:

      nada.
*/
function setColorGood(el) {
  if (el.style) el.style.backgroundColor = "white";
}


/*
   Function: fverEmail(obj)
   Verifica o campo EMAIL sea válida.
   Parâmetros:
      obj - Nome a ser apresentado caso o valor não passe na validação.
   Retorno:
      *true* caso o campo esteja corretamente formatado.
*/
function fverEmail(obj){
	a=obj.value;
	var err=0;
	if (a.indexOf('@')!=-1){
		if (a.substring(0,1)=='@')
			err=1;	
		if (a.indexOf(' ')!=-1)
			err=1;	
		if (a.indexOf('.')==-1)		
			err=1;
	} else {	
		err=1;
	}//se erro 
		
	if (err==1){
		alert('O e-mail está incorreto');
		return false;
	}
}


/*
   Function: isNumber

   Verifica se o campo está preenchido com um número.
   Pode ter vírgula e sinal de menos.

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.

   Retorno:

      *true* caso o campo contenha somente dígitos, vírgula e sinal de menos.

   Veja também:

      <isStrictNumber>
*/
function isNumber(campo, nome)
{
	valor = campo.value.toLowerCase();
	RefString = "0123456789,-";

	if (valor.length < 1)
	{
       alert("O campo " + nome + " deve ser preenchido.");
       setColorBad(campo);
       return (false);
	
	}	
	for (var i = 0; i < valor.length; i++)
	{
		var ch = valor.substr(i, 1)
		var a = RefString.indexOf(ch, 0)
		if (a == -1)		
		{			
			alert ("Digite somente números, vírgula ou sinal de menos.");	
			campo.focus();	
            setColorBad(campo);
            return (false);
		}
	}
    setColorGood(campo);
    return(true);
}

/*
   Function: isStrictNumber

   Verifica se o campo está preenchido com um número.

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.

   Retorno:

      *true* caso o campo contenha somente dígitos.

   Veja também:

      <isNumber>
*/
function isStrictNumber(campo, nome)
{
    valor = campo.value.toLowerCase();
	RefString = "0123456789";

	if (valor.length < 1)
	{
        alert("O campo " + nome + " deve ser preenchido.");
        campo.focus();	
        setColorBad(campo);
        return (false);
	} 
	for (var i = 0; i < valor.length; i++)
	{
		var ch = valor.substr(i, 1);
		var a = RefString.indexOf(ch, 0);
		if (a == -1)		
		{			
        alert ("O campo " + nome + " deve ter somente números.");	
        campo.focus();	
        setColorBad(campo);
        return (false);
		}
	}
    setColorGood(campo);
    return(true);
}

/*
   Function: isAlpha

   Verifica se o campo está preenchido somente com caracteres alfanuméricos.
   Isto é: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.

   Retorno:

      *true* caso o campo contenha somente alfanuméricos
*/
function isAlpha(campo, nome)
{
    valor = campo.value.toLowerCase();
	RefString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

	if (valor.length < 1)
	{
       alert("O campo " + nome + " deve ser preenchido.");
       setColorBad(campo);
       return (false);
	} 
	for (var i = 0; i < valor.length; i++)
	{
		var ch = valor.substr(i, 1);
		var a = RefString.indexOf(ch, 0);
		if (a == -1)		
		{			
			alert ("O campo " + nome + " deve ser alfanumérico.");	
			campo.focus();	
             setColorBad(campo);
            return (false);
		}
	}	
    setColorGood(campo);
    return(true);
}

/*
   Function: isAlphaConta

   Verifica se o campo está preenchido somente com caracteres alfanuméricos.
   Isto é: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.

   Retorno:

      *true* caso o campo contenha somente alfanuméricos
*/
function isAlphaConta(campo, nome)
{
    valor = campo.value.toLowerCase();
	RefString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	if (valor.length < 1)
	{
       alert("O campo " + nome + " deve ser preenchido.");
       setColorBad(campo);
       return (false);
	} 
	for (var i = 0; i < valor.length; i++)
	{
		var ch = valor.substr(i, 1);
		var a = RefString.indexOf(ch, 0);
		if (a == -1)		
		{			
			alert ("O campo " + nome + " deve ser alfanumérico.");	
			campo.focus();	
             setColorBad(campo);
            return (false);
		}
	}	
    setColorGood(campo);
    return(true);
}


/*
   Function: validaTamanho

   Verifica se o comprimento do campo está dentro de um determinado limite.

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.
      comprimentoMinimo - limite inferior do comprimento.
      comprimentoMaximo - limite superior do comprimento.

   Retorno:

      *true* caso o comprimento do campo esteja dentro dos limites estipulados.
*/
function validaTamanho(campo, nome, comprimentoMinimo, comprimentoMaximo)
{
    valor = campo.value.toLowerCase();  
    if (valor.length < 1) {
       alert("O campo " + nome + " deve ser preenchido.");
        setColorBad(campo);
        return false;
    }
    if (valor.length < comprimentoMinimo)
    {
        alert ("O campo " + nome + " deve ter no mínimo " + comprimentoMinimo + " caracteres."); 
        campo.focus();          
        setColorBad(campo);
        return false;
    }
    if (valor.length > comprimentoMaximo) {
        alert ("O campo " + nome + " deve ter no máximo " + comprimentoMaximo + " caracteres."); 
        campo.focus();          
        setColorBad(campo);
        return false;
    }
    setColorGood(campo);
    return true;
}

/*
   Function: validaValor

   Verifica se o valor digitado está na forma ####,## (obriga a ter vírgula e dois dígitos de centavos).

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.

   Retorno:

      *true* caso o formato esteja correto.
*/
function validaValor(campo, nome)
{
    valor = campo.value;
    posV = valor.indexOf(',');
    RefString = "0123456789,.";
    if ((valor.length < 4) || (posV != (valor.length - 3))) {
       alert("O campo " + nome + " deve estar na forma 999,99 (verifique os centavos).");
       campo.focus();
       setColorBad(campo);
       return false;
    }
    
    for (var i = 0; i < valor.length; i++)
    {
        if (i == posV) {
            i++;
        }
        var ch = valor.substr(i, 1)
        var a = RefString.indexOf(ch, 0)
        if (a == -1)        
        {           
            alert ("O campo " + nome + " deve ser um valor válido.");
            campo.focus();  
            setColorBad(campo);
            return (false);
        }
    }
    setColorGood(campo);
    return true;
}

/*
   Function: validaTaxa

   Verifica se a taxa digitada está na forma #####,#### (obriga a ter vírgula e 4 dígitos de centavos).

   Parâmetros:

      campo - Ponteiro para um campo de formulário.
      nome - Nome a ser apresentado caso o valor não passe na validação.

   Retorno:

      *true* caso o formato esteja correto.
*/
function validaTaxa(campo, nome)
{
    valor = campo.value;
    posV = valor.indexOf(',');
    if ((valor.length < 6) || (posV != (valor.length - 5))) {
        alert("O campo " + nome + " deve estar na forma 9999,9999 (4 dígitos depois da vírgula).");
        campo.focus();
        setColorBad(campo);
        return false;
    }
    
    for (var i = 0; i < valor.length; i++)
    {
        if (i == posV) {
            i++;
        }
        var ch = valor.substr(i, 1)
        var a = RefString.indexOf(ch, 0)
        if (a == -1)        
        {           
            alert ("O campo " + nome + " deve ser um valor válido de 4 casas depois da vírgula.");
            campo.focus();
            setColorBad(campo);
            return (false);
        }
    }
    setColorGood(campo);
    return true;
}
