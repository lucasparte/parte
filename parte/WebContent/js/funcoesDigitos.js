/*
   File: funcoesDigitos.js

   Fun��es de valida��o e gera��o de d�gitos verificadores.
   Todas as fun��es de verifica��o deste arquivo mostram um aviso caso a valida��o falhe.
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
   Function: colocaZerosEsquerda

       Fun��o auxiliar que coloca zeros � esquerda do campo caso seja necess�rio (comprimento
       seja menor que o estipulado).

   Par�metros:

      valor - N�mero a ser preenchido.
      tamanho - Tamanho desejado.

   Retorno:

      n�mero formatado.

*/
function colocaZerosEsquerda(valor, tamanho) {
  while (valor.length < tamanho) {
      valor = "0" + valor;
  }
  return valor;
}

/*
   Function: calculaModulo11

   C�lculo do m�dulo 11. Esta fun��o � utilizada pelas outras fun��es deste arquivo.
   � uma fun��o de c�lculo gen�rico de m�dulo 11.
   Caso o m�dulo seja 11 retorna 0 (n�o P).

   Par�metros:

        valor - N�mero cujo m�dulo ser� calculado.
        pesoMaximo - Valor do maior peso.
        tamanho - Tamanho a ser considerado no c�lculo.

   Retorno:

        M�dulo calculado.
*/
function calculaModulo11(valor, pesoMaximo, tamanho) {
	var peso, soma, digito, dv;
	var lnum = "";
	peso = 2;
	soma = 0;
	
	lnum = String(valor);
	
    digito = tamanho;
	while (digito >= 1){
		soma = soma + peso * lnum.substring(digito - 1, digito);
        if (peso >= pesoMaximo) {
            peso = 2;
        } else {
            peso = peso + 1;
        }
        digito = digito -1;
	}
	
	dv = 11 - (soma%11);
	if (dv>9){
		dv = 0;
	}
	return String(dv);
}

/*
   Function: calculaDigitoCNPJ

       C�lculo dos 2 d�gitos verificadores do CNPJ.

   Par�metros:

        valor - N�mero cujo d�gito verificador ser� calculado.

   Retorno:

        D�gito verificador calculado.
*/
function calculaDigitoCNPJ(valor) {

    dv1 = calculaModulo11(valor, 9, 13);
    dv2 = calculaModulo11(valor + dv1, 9, 14);
    return dv1 + dv2;
}

/*
   Function: calculaDigitoCPF

       C�lculo dos 2 d�gitos verificadores do CPF.

   Par�metros:

        valor - N�mero cujo d�gito verificador ser� calculado.

   Retorno:

        D�gito verificador calculado.
*/
function calculaDigitoCPF(valor) {

    dv1 = calculaModulo11(valor, 11, 9);
    dv2 = calculaModulo11(valor + dv1, 11, 10);
    return dv1 + dv2;
}


//'** C�lculo do d�gito verificador de contas Bradesco (convertido para 0)
//'** O n�mero original n�o pode ter o d�gito concatenado.
//'** Par�metros: valor    : N�mero cujo d�gito verificador ser� calculado.
//'** Retorno   : D�gito verificador calculado.
function calculaDAC0(valor) {

    return calculaModulo11(valor, 7, valor.length);
}


/*
   Function: validaCPF

       Valida os d�gitos verificadores do CPF.

   Par�metros:

        valor - N�mero cujo d�gito verificador ser� validado.

   Retorno:

        *true* caso o d�gito esteja correto.
*/
function validaCPF(valor) {
    if (calculaDigitoCPF(valor) == valor.substring(9, 11)) {
        setColorGood(valor);
        return true;
    } else {
        alert("CPF inv�lido");
        setColorBad(valor);
        return false;
    }
}

/*
   Function: validaCNPJ

       Valida os d�gitos verificadores do CNPJ.

   Par�metros:

        valor - N�mero cujo d�gito verificador ser� validado.

   Retorno:

        *true* caso o d�gito esteja correto.
*/
function validaCNPJ(valor) {
    if (calculaDigitoCNPJ(valor) == valor.substring(13, 15)) {
        setColorGood(valor);
        return true;
    } else {
        setColorBad(valor);
		alert("CNPJ inv�lido");
        return false;
    }
}


/*
   Function: validaDAC0

       Valida o d�gito de uma conta Bradesco.

   Par�metros:

        valor - N�mero cujo d�gito verificador ser� validado.
        digito - d�gito verificador.

   Retorno:

        *true* caso o d�gito esteja correto.
*/
function validaDAC0(valor, digito) {
    if (calculaDAC0(valor) == digito) {
        setColorGood(valor);
        return true;
    } else {
        setColorBad(valor);
        alert("D�gito incorreto");
        return false;
    }
}


