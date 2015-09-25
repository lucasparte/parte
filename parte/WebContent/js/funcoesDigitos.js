/*
   File: funcoesDigitos.js

   Funções de validação e geração de dígitos verificadores.
   Todas as funções de verificação deste arquivo mostram um aviso caso a validação falhe.
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
   Function: colocaZerosEsquerda

       Função auxiliar que coloca zeros à esquerda do campo caso seja necessário (comprimento
       seja menor que o estipulado).

   Parâmetros:

      valor - Número a ser preenchido.
      tamanho - Tamanho desejado.

   Retorno:

      número formatado.

*/
function colocaZerosEsquerda(valor, tamanho) {
  while (valor.length < tamanho) {
      valor = "0" + valor;
  }
  return valor;
}

/*
   Function: calculaModulo11

   Cálculo do módulo 11. Esta função é utilizada pelas outras funções deste arquivo.
   É uma função de cálculo genérico de módulo 11.
   Caso o módulo seja 11 retorna 0 (não P).

   Parâmetros:

        valor - Número cujo módulo será calculado.
        pesoMaximo - Valor do maior peso.
        tamanho - Tamanho a ser considerado no cálculo.

   Retorno:

        Módulo calculado.
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

       Cálculo dos 2 dígitos verificadores do CNPJ.

   Parâmetros:

        valor - Número cujo dígito verificador será calculado.

   Retorno:

        Dígito verificador calculado.
*/
function calculaDigitoCNPJ(valor) {

    dv1 = calculaModulo11(valor, 9, 13);
    dv2 = calculaModulo11(valor + dv1, 9, 14);
    return dv1 + dv2;
}

/*
   Function: calculaDigitoCPF

       Cálculo dos 2 dígitos verificadores do CPF.

   Parâmetros:

        valor - Número cujo dígito verificador será calculado.

   Retorno:

        Dígito verificador calculado.
*/
function calculaDigitoCPF(valor) {

    dv1 = calculaModulo11(valor, 11, 9);
    dv2 = calculaModulo11(valor + dv1, 11, 10);
    return dv1 + dv2;
}


//'** Cálculo do dígito verificador de contas Bradesco (convertido para 0)
//'** O número original não pode ter o dígito concatenado.
//'** Parâmetros: valor    : Número cujo dígito verificador será calculado.
//'** Retorno   : Dígito verificador calculado.
function calculaDAC0(valor) {

    return calculaModulo11(valor, 7, valor.length);
}


/*
   Function: validaCPF

       Valida os dígitos verificadores do CPF.

   Parâmetros:

        valor - Número cujo dígito verificador será validado.

   Retorno:

        *true* caso o dígito esteja correto.
*/
function validaCPF(valor) {
    if (calculaDigitoCPF(valor) == valor.substring(9, 11)) {
        setColorGood(valor);
        return true;
    } else {
        alert("CPF inválido");
        setColorBad(valor);
        return false;
    }
}

/*
   Function: validaCNPJ

       Valida os dígitos verificadores do CNPJ.

   Parâmetros:

        valor - Número cujo dígito verificador será validado.

   Retorno:

        *true* caso o dígito esteja correto.
*/
function validaCNPJ(valor) {
    if (calculaDigitoCNPJ(valor) == valor.substring(13, 15)) {
        setColorGood(valor);
        return true;
    } else {
        setColorBad(valor);
		alert("CNPJ inválido");
        return false;
    }
}


/*
   Function: validaDAC0

       Valida o dígito de uma conta Bradesco.

   Parâmetros:

        valor - Número cujo dígito verificador será validado.
        digito - dígito verificador.

   Retorno:

        *true* caso o dígito esteja correto.
*/
function validaDAC0(valor, digito) {
    if (calculaDAC0(valor) == digito) {
        setColorGood(valor);
        return true;
    } else {
        setColorBad(valor);
        alert("Dígito incorreto");
        return false;
    }
}


