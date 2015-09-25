package br.com.beans;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import net.sf.jasperreports.engine.JRException;
import br.com.modelo.ItemPedido;

@ManagedBean
@ViewScoped
public class ItemPedidoBean {
	ItemPedido itemPedido = new ItemPedido();
	private List<ItemPedido> itensPedidos = new ArrayList<ItemPedido>();
	
	public ItemPedidoBean() {
		// TODO Auto-generated constructor stub
	}
	
	public void insereLista() throws JRException, IOException {
		ItemPedido novoItemPedido = new ItemPedido();
		novoItemPedido.setProduto(getItemPedido().getProduto());
		novoItemPedido.setQtd(getItemPedido().getQtd());
		novoItemPedido.setPreco(getItemPedido().getPreco());
		novoItemPedido.setObservacao(getItemPedido().getObservacao());
		
		
		this.itensPedidos.add(novoItemPedido);
		//itensPedidos.add(novoItemPedido);
//		getItensPedidos().add(novoItemPedido);
//		setItensPedidos(itensPedidos);
//		getItemPedido().setItensPedidos(getItemPedido().getItensPedidos());
		this.setItensPedidos(itensPedidos);
		PedidoBean pb = new PedidoBean();
		//pb.pdf(itensPedidos);
	}

	public ItemPedido getItemPedido() {
		return itemPedido;
	}

	public void setItemPedido(ItemPedido itemPedido) {
		this.itemPedido = itemPedido;
	}

	public List<ItemPedido> getItensPedidos() {
		return itensPedidos;
	}

	public void setItensPedidos(List<ItemPedido> itensPedidos) {
		this.itensPedidos = itensPedidos;
	}

	

}
