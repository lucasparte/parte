/*
   File: funcoesValida.js

   Fun��es gen�ricas de valida��o.
   Todas as fun��es deste arquivo mostram um aviso caso a valida��o falhe.
*/

/*
   Function: setColorBad

   Altera a cor de fundo de algum componente Utilizado pelas outras fun��es.

   Par�metros:

      el - Componente a ser alterado.

   Retorno:

      nada.
*/
function setColorBad(el) {
  if (el.style) el.style.backgroundColor = "#ffaaaa";
}

/*
   Function: setColorGood

   Altera a cor de fundo de algum componente. Utilizado pelas outras fun��es.

   Par�metros:

      el - Componente a ser alterado.

   Retorno:

      nada.
*/
function setColorGood(el) {
  if (el.style) el.style.backgroundColor = "white";
}


/*
   Function: fverEmail(obj)
   Verifica o campo EMAIL sea v�lida.
   Par�metros:
      obj - Nome a ser apresentado caso o valor n�o passe na valida��o.
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
		alert('O e-mail est� incorreto');
		return false;
	}
}


/*
   Function: isNumber

   Verifica se o campo est� preenchido com um n�mero.
   Pode ter v�rgula e sinal de menos.

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o campo contenha somente d�gitos, v�rgula e sinal de menos.

   Veja tamb�m:

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
			alert ("Digite somente n�meros, v�rgula ou sinal de menos.");	
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

   Verifica se o campo est� preenchido com um n�mero.

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o campo contenha somente d�gitos.

   Veja tamb�m:

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
        alert ("O campo " + nome + " deve ter somente n�meros.");	
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

   Verifica se o campo est� preenchido somente com caracteres alfanum�ricos.
   Isto �: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o campo contenha somente alfanum�ricos
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
			alert ("O campo " + nome + " deve ser alfanum�rico.");	
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

   Verifica se o campo est� preenchido somente com caracteres alfanum�ricos.
   Isto �: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o campo contenha somente alfanum�ricos
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
			alert ("O campo " + nome + " deve ser alfanum�rico.");	
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

   Verifica se o comprimento do campo est� dentro de um determinado limite.

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.
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
        alert ("O campo " + nome + " deve ter no m�nimo " + comprimentoMinimo + " caracteres."); 
        campo.focus();          
        setColorBad(campo);
        return false;
    }
    if (valor.length > comprimentoMaximo) {
        alert ("O campo " + nome + " deve ter no m�ximo " + comprimentoMaximo + " caracteres."); 
        campo.focus();          
        setColorBad(campo);
        return false;
    }
    setColorGood(campo);
    return true;
}

/*
   Function: validaValor

   Verifica se o valor digitado est� na forma ####,## (obriga a ter v�rgula e dois d�gitos de centavos).

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

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
            alert ("O campo " + nome + " deve ser um valor v�lido.");
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

   Verifica se a taxa digitada est� na forma #####,#### (obriga a ter v�rgula e 4 d�gitos de centavos).

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o formato esteja correto.
*/
function validaTaxa(campo, nome)
{
    valor = campo.value;
    posV = valor.indexOf(',');
    if ((valor.length < 6) || (posV != (valor.length - 5))) {
        alert("O campo " + nome + " deve estar na forma 9999,9999 (4 d�gitos depois da v�rgula).");
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
            alert ("O campo " + nome + " deve ser um valor v�lido de 4 casas depois da v�rgula.");
            campo.focus();
            setColorBad(campo);
            return (false);
        }
    }
    setColorGood(campo);
    return true;
}
