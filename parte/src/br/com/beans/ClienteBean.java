package br.com.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import br.com.modelo.Cliente;

@ManagedBean
@ViewScoped
public class ClienteBean {
	Cliente cliente = new Cliente();
	private boolean rendered = false;
	
	public void some(){
		this.setRendered(true);
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public boolean isRendered() {
		return rendered;
	}

	public void setRendered(boolean rendered) {
		this.rendered = rendered;
	}



}
