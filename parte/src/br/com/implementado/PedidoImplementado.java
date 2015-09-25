package br.com.implementado;

import java.io.IOException;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import net.sf.jasperreports.engine.JRException;
import br.com.beans.ItemPedidoBean;
import br.com.beans.PedidoBean;
import br.com.modelo.ItemPedido;
import br.com.modelo.Pedido;

@ManagedBean
@ViewScoped  
public class PedidoImplementado {
	private Pedido pedido = new Pedido();
	private PedidoBean pedidoBean = new PedidoBean();
	private ItemPedido itemPedido = new ItemPedido();
	private ItemPedidoBean itemPedidoBean = new ItemPedidoBean();
	
	public PedidoImplementado() {
		// TODO Auto-generated constructor stub
	}
	
	//public void insere(){
	//	getItemPedidoBean().insereLista();
	//}
	public void salvarCab(){
		getPedidoBean().salvar();
	}
	
	public void imprimir() throws JRException, IOException{
		getPedidoBean().pdf();
	}


	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public PedidoBean getPedidoBean() {
		return pedidoBean;
	}

	public void setPedidoBean(PedidoBean pedidoBean) {
		this.pedidoBean = pedidoBean;
	}

	public ItemPedido getItemPedido() {
		return itemPedido;
	}

	public void setItemPedido(ItemPedido itemPedido) {
		this.itemPedido = itemPedido;
	}

	public ItemPedidoBean getItemPedidoBean() {
		return itemPedidoBean;
	}

	public void setItemPedidoBean(ItemPedidoBean itemPedidoBean) {
		this.itemPedidoBean = itemPedidoBean;
	}
	

}
