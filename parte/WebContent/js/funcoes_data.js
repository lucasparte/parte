/*
   File: data.js

   Fun��es de valida��o de data.
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
   Function: fverDataOuVazio

   Verifica se o campo foi preenchido com uma data v�lida. O campo tamb�m pode
   estar vazio.

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o campo esteja corretamente formatado ou esteja vazio.
*/
function fverDataOuVazio(campo, nome) {
// constantes
arrayErros = [
    '', // 0
    'O campo ' + nome + ' deve seguir o formato \"dd/mm/aaaa\" .',
    'M�s deve ser maior ou igual a 1 e menor ou igual a 12.',
    'M�s deve ser num�rico.',
    'Dia deve ser maior ou igual a 1 e menor ou igual a 31.',
    'Dia deve ser num�rico.',
    'Ano deve ser maior ou igual a 1900 e menor ou igual a 2099.',
    'Ano deve ser num�rico.',
    'Este m�s s� possui 30 dias.',
    'O m�s de fevereiro possui menos de 30 dias.',
    'Data inv�lida.\nN�o � ano bissexto.'];


//verificando datas  //inclusive anos bissextos
var err=0, iaux;

a=campo.value;

//verificando se o campo est� vazio
if (a.length == 0) {
   campo.value = a;
   setColorGood(campo);
   return true;
}

//separa a data em partes
if (a.length != 10) err=1 //tem de ser 10   - 1 - Formato invalido
b = a.substring(0, 2)// dia
c = a.substring(2, 3)// '/'
d = a.substring(3, 5)// mes
e = a.substring(5, 6)// '/'
f = a.substring(6, 8)// ano
h = a.substring(8)// ano

//checagem basica de erro
//verifica se e numerico e se esta entre o intervalo correto
if (err == 0)
{
        if (d<1 || d>12) err = 2	// 2 - Mes deve ser maior ou igual a 1 e menor ou igual a 12
        if (err == 0)
        {
                var i=parseInt(a.substring(3,4), 10);
                if (isNaN(i))
                        err=3;					// 3 - Mes deve ser numerico
                var i=parseInt(a.substring(4,5), 10);
                if (isNaN(i))				// 3 - Mes deve ser numerico
                        err=3;
                if (err == 0)
                {
                        if (c != '/') err = 1		// 1 - Formato invalido
                        if (err == 0)
                        {
                                if (b<1 || b>31) err = 4	// 4 - Dia deve ser maior ou igual a 1 e menor ou igual a 31
                                if (err == 0)
                                {
                                        var i=parseInt(a.substring(0,1), 10);
                                        if (isNaN(i))
                                                err=5;					// 5 - Dia deve ser numerico
                                        var i=parseInt(a.substring(1,2), 10);
                                        if (isNaN(i))
                                                err=5;					// 5 - Dia deve ser numerico
                                        if (err == 0)
                                        {
                                                if (e != '/') err = 1		// 1 - Formato invalido
                                                if (err == 0)
                                                {
                                                        if (f<19 || f>20) err = 6	// 6 - Ano deve ser maior ou igual a 1900 e menor ou igual a 2099
                                                        if (err == 0)
                                                        {
                                                                var i=parseInt(a.substring(6,7), 10);
                                                                if (isNaN(i))
                                                                        err=7;					// 7 - Ano deve ser numerico
                                                                var i=parseInt(a.substring(7,8), 10);
                                                                if (isNaN(i))
                                                                        err=7;					// 7 - Ano deve ser numerico
                                                                var i=parseInt(a.substring(8,9), 10);
                                                                if (isNaN(i))
                                                                        err=7;					// 7 - Ano deve ser numerico
                                                                var i=parseInt(a.substring(9), 10);
                                                                if (isNaN(i))
                                                                        err=7;					// 7 - Ano deve ser numerico
                                                                if (err == 0)
                                                                {
                                                                        //Checagem de erro avancada

                                                                        //meses com 30 dias
                                                                        if (d==4 || d==6 || d==9 || d==11){
                                                                        if (b==31) err=8			// 8 - Este mes so possui 30 dias
                                                                        }
                                                                        if (err == 0)
                                                                        {
                                                                                // fevereiro, anos bissextos
                                                                                if (d==2)
                                                                                {
                                                                                        // fevereiro
                                                                                        var g=parseInt(h/4, 10)

                                                                                        if (b>29) err=9				//9 - Este mes possui menos de 30 dias
                                                                                        if (err == 0)
                                                                                        {
                                                                                                if (b==29 && (((h/4)!= g) || (f==19 && h==0))) err=10
                                                                                                                //10 - nao e bissexto. Como apena sao permitidos anos
                                                                                                                // entre 1900 e 2099 nao eh necessario tratar seculos e quadrisseculos,
                                                                                                                // devendo-se apenas tratar o ano de 1900 (que nao eh bissexto)
                                                                                        }
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }
}

if (err==0){ // Retorno OK
        campo.value = a;
    setColorGood(campo);
    return true;
} else {
	alert(replaceAscii(arrayErros[err]));
    setColorBad(campo);
    campo.focus();
    return false;
}
}


/*
   Function: fverData

   Verifica se o campo foi preenchido com uma data v�lida.

   Par�metros:

      campo - Ponteiro para um campo de formul�rio.
      nome - Nome a ser apresentado caso o valor n�o passe na valida��o.

   Retorno:

      *true* caso o campo esteja corretamente formatado.
*/
function fverData(campo, nome){
   if (campo.value.length == 0) {
      alert('O campo ' + nome + ' deve ser preenchido.');
      setColorBad(campo);
      campo.focus();
      return false;
   } else
      return fverDataOuVazio(campo, nome);
}
