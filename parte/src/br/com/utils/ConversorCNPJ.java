package br.com.utils;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import br.com.caelum.stella.format.CNPJFormatter;

@FacesConverter(value = "cnpj")
public class ConversorCNPJ implements Converter {

	@Override
	public Object getAsObject(FacesContext context, UIComponent component,
			String valor) {
		// Conversão do valor enviado pelo usuario no request
		// este metodo esta removendo a formatação do primefaces
		return new CNPJFormatter().unformat(valor);
	}

	@Override
	public String getAsString(FacesContext context, UIComponent component,
			Object valor) {
		// nova conversão dos dados recebidos do banco com envio formatado para
		// o usuario
		// Este metodo esta retornando a formatação do promefaces para
		// visualização na tela
		return new CNPJFormatter().format(valor.toString());
	}

}
