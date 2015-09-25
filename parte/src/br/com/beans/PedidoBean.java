package br.com.beans;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import br.com.modelo.Cliente;
import br.com.modelo.ItemPedido;
import br.com.modelo.Pedido;

import com.lowagie.text.BadElementException;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

@ManagedBean
@ViewScoped
public class PedidoBean {
	Pedido pedido = new Pedido();
	Cliente cliente = new Cliente();
	Boolean isDisableItens= true;
	List<Pedido> pedidos = new ArrayList<Pedido>();
	ItemPedidoBean itemPedidoBean = new ItemPedidoBean();
	private List<ItemPedido>  itemPedido = new ArrayList<ItemPedido>();
	ItemPedido itPedido = new ItemPedido();
	
	static Config config = new Config();

	public void salvar(){
		setIsDisableItens(false);

	}
	@ManagedProperty("#{themeService}")
	private ThemeService service;

     
	public void pdf() throws JRException, IOException {
		Document document = new Document();
	    //Chapter catPart = new Chapter(new Paragraph("First Chapter"), 1);
	   // Paragraph subPara = new Paragraph("Subcategory 1sdfgesf");
	    //Paragraph nomeCliente = new Paragraph("Cliente");
	    //Section subCatPart = catPart.addSection(subPara);
	   // Section subCliente = catPart.addSection(nomeCliente);
	    //Section subCatPart2 = catPart.addSection(subPara);
	    String name = cliente.getNome();
	    String local = 	FacesContext.getCurrentInstance()
				.getExternalContext()
				.getRealPath("/relatorios/"+name+".pdf");
	    
		
		try {
	
			PdfWriter.getInstance(document, new FileOutputStream(
					local));
			document.open();
			// adicionando um parágrafo no documento
			Paragraph espaco = new  Paragraph();
			document.add(espaco);
			
			Paragraph paragrafo = new  Paragraph("Paraiso da Arte ");
			PdfPCell inicio = new PdfPCell(paragrafo);
			inicio.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
			document.add(inicio);
			
			
			
			
			document.add(new Paragraph("Paraiso da Arte "));
			document.add(new Paragraph("Nome/Razão: " + getCliente().getNome()));
			document.add(new Paragraph("CPF/CNPJ: " + getCliente().getCpf_cnpj()));
			document.add(new Paragraph("E-mail: " + getCliente().getEmail()));
			document.add(new Paragraph("Telefone: " + getCliente().getTelefone()));
			document.add(new Paragraph("Celular: " + getCliente().getCelular()));
			document.add(new Paragraph(""));
			document.add(new Paragraph(""));
			document.add(new Paragraph(""));
			document.add(new Paragraph(""));
			//Section subCatPart2 = createTable(subCatPart);
			
//			Image image1 = Image.getInstance("watermark.png");
//	        document.add(image1);
//
//	        
//	            String imageUrl = "http://jenkov.com/images/" +
//	            "20081123-20081123-3E1W7902-small-portrait.jpg";
//
//	            Image image2 = Image.getInstance(new URL(imageUrl));
//	        document.add(image2);

		    //document.add(subCatPart);
		   // document.add(subCliente);
		    
		    PdfPTable table = new PdfPTable(4);
		    Paragraph tableHeader = new Paragraph("Itens do Pedido");
		    PdfPCell header = new PdfPCell(tableHeader);
	        // Definindo que o header vai ocupar as 3 colunas
	        header.setColspan(4);
	        // Definindo alinhamento do header
	        header.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
	        // Adicionando o header à tabela
	        table.addCell(header);
	      
	        
	        document.add(this.createTable(getItemPedido()));
	        
	        
			
		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}
		document.close();
		this.downloadPdf(local,name);       
		
		    
	}
	
	public HashMap<String, Object> preparaCabecalho(){
		HashMap<String, Object> parametros = new HashMap<String, Object>();
		
		parametros.put("razao", getCliente().getNome());
		parametros.put("cpfCnpj", getCliente().getCpf_cnpj());
		parametros.put("email", getCliente().getEmail());
		parametros.put("telefone", getCliente().getTelefone());
		parametros.put("celular", getCliente().getCelular());
		
		return parametros;
	}

	public void teste() throws JRException, IOException{
		String name = cliente.getNome();
	    String local = 	FacesContext.getCurrentInstance()
				.getExternalContext()
				.getRealPath("/relatorios/"+name+".pdf");
	    HashMap<String, Object> parametros = preparaCabecalho();
		
		// compilacao do JRXML
		JasperReport report = JasperCompileManager.compileReport("C:\\Users\\HP\\Desktop\\venda.jrxml");  
		// preenchimento do relatorio, note que o metodo recebe 3 parametros: 
		// 1 - o relatorio 
		// // 2 - um Map, com parametros que sao passados ao relater 
		// no momento do preenchimento. No nosso caso eh null, pois nao
		// estamos usando nenhum parametro /
		//3 - o data source. Note que nao devemos passar a lista diretamente, 
		// e sim "transformar" em um data source utilizando a classe 
		// JRBeanCollectionDataSource 
		JasperPrint print = JasperFillManager.fillReport(report, parametros,
				new JRBeanCollectionDataSource(getItemPedido()));  
		// exportacao do relatorio para outro formato, no caso PDF
		//JasperExportManager.exportReportToPdfFile(print, "RelatorioClientes.pdf");
		JasperExportManager.exportReportToPdfFile(print, local);

		
		
		HttpServletResponse httpServletResponse = (HttpServletResponse) FacesContext
				.getCurrentInstance().getExternalContext().getResponse();
		httpServletResponse.addHeader("Content-disposition",
				"inline; filename=listaFuncionarios.pdf");
		ServletOutputStream servletOutputStream = httpServletResponse
				.getOutputStream();
		JasperExportManager.exportReportToPdfStream(print,
				servletOutputStream);
		FacesContext.getCurrentInstance().responseComplete();
		
		System.out.println("Relatório gerado."); 
	}
	
	public void sendMail(){
		
		
		
		Document document = new Document();
	    //Chapter catPart = new Chapter(new Paragraph("First Chapter"), 1);
	   // Paragraph subPara = new Paragraph("Subcategory 1sdfgesf");
	    //Paragraph nomeCliente = new Paragraph("Cliente");
	    //Section subCatPart = catPart.addSection(subPara);
	   // Section subCliente = catPart.addSection(nomeCliente);
	    //Section subCatPart2 = catPart.addSection(subPara);
	    String name = cliente.getNome();
	    String local = 	FacesContext.getCurrentInstance()
				.getExternalContext()
				.getRealPath("/relatorios/"+name+".pdf");
	    
		
		try {
	
			PdfWriter.getInstance(document, new FileOutputStream(
					local));
			document.open();
			// adicionando um parágrafo no documento
			
			Paragraph paragrafo = new  Paragraph("Paraiso da Arte ");
			PdfPCell inicio = new PdfPCell(paragrafo);
			inicio.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
			document.add(inicio);
			
			
			
			
			document.add(new Paragraph("Paraiso da Arte "));
			document.add(new Paragraph("Nome/Razão: " + getCliente().getNome()));
			document.add(new Paragraph("CPF/CNPJ: " + getCliente().getCpf_cnpj()));
			document.add(new Paragraph("E-mail: " + getCliente().getEmail()));
			document.add(new Paragraph("Telefone: " + getCliente().getTelefone()));
			document.add(new Paragraph("Celular: " + getCliente().getCelular()));
			//Section subCatPart2 = createTable(subCatPart);
			
//			Image image1 = Image.getInstance("watermark.png");
//	        document.add(image1);
//
//	        
//	            String imageUrl = "http://jenkov.com/images/" +
//	            "20081123-20081123-3E1W7902-small-portrait.jpg";
//
//	            Image image2 = Image.getInstance(new URL(imageUrl));
//	        document.add(image2);

		    //document.add(subCatPart);
		   // document.add(subCliente);
		    
		    PdfPTable table = new PdfPTable(4);
		    Paragraph tableHeader = new Paragraph("Itens do Pedido");
		    PdfPCell header = new PdfPCell(tableHeader);
	        // Definindo que o header vai ocupar as 3 colunas
	        header.setColspan(4);
	        // Definindo alinhamento do header
	        header.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
	        // Adicionando o header à tabela
	        table.addCell(header);
	      
	        
	        document.add(this.createTable(getItemPedido()));
	        
	        
			
		} catch (DocumentException de) {
			System.err.println(de.getMessage());
		} catch (IOException ioe) {
			System.err.println(ioe.getMessage());
		}
		document.close();
		this.downloadPdf(local,name);  
		
		
		
		
		String to = getCliente().getEmail();
		String senha = "teste";
		
		final String username = config.getString(config.CONFIG_SMTP + "username");
		final String password = config.getString(config.CONFIG_SMTP + "pass");
		Properties props = new Properties();
		props.put("mail.smtp.auth", config.getString(config.CONFIG_SMTP + "auth"));
		props.put("mail.smtp.starttls.enable", config.getString(config.CONFIG_SMTP + "starttls.enable"));
		props.put("mail.smtp.host", config.getString(config.CONFIG_SMTP + "host"));
		props.put("mail.smtp.port", config.getString(config.CONFIG_SMTP + "port"));
		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });
		
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(username));
			message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
			message.setSubject(config.getString(config.CONFIG_SMTP + "subject") + " " + to);
			message.setContent("Caro usuário <b>" + to + "</b>,<br>sua senha é: <b>" + senha + "</b><br><br>Atenciosamento, <br><br>Equipe Logali.", "text/html");
			
			
			// Create a multipar message
	         Multipart multipart = new MimeMultipart();

			// Part two is attachment
			MimeBodyPart messageBodyPart = new MimeBodyPart();
	         String filename = local;
	         DataSource source = new FileDataSource(filename);
	         messageBodyPart.setDataHandler(new DataHandler(source));
	         messageBodyPart.setFileName(filename);
	         multipart.addBodyPart(messageBodyPart);

	         // Send the complete message parts
	         message.setContent(multipart);
			
			
			Transport.send(message);
			//log.info("Mensagem enviada com sucesso.");
			
//			return "0";
	
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		
	}
	public String downloadPdf(String local,String name){
//		String local = 	FacesContext.getCurrentInstance()
//				.getExternalContext()
//				.getRealPath("/relatorios/teste2.pdf");
		File file = new File(local);
	    HttpServletResponse response = (HttpServletResponse) FacesContext.getCurrentInstance().getExternalContext().getResponse();  

	    response.setHeader("Content-Disposition", "attachment;filename="+name+".pdf");  
	    response.setContentLength((int) file.length());  
	    ServletOutputStream out = null;  
	    try {  
	        FileInputStream input = new FileInputStream(file);  
	        byte[] buffer = new byte[1024];  
	        out = response.getOutputStream();  
	        int i = 0;  
	        while ((i = input.read(buffer)) != -1) {  
	            out.write(buffer);  
	            out.flush();  
	        }  
	        FacesContext.getCurrentInstance().getResponseComplete();  
	    } catch (IOException err) {  
	        err.printStackTrace();  
	    } finally {  
	        try {  
	            if (out != null) {  	
	                out.close();  
	            }  
	        } catch (IOException err) {  
	            err.printStackTrace();  
	        }  
	    }  
	    return null;
		
	}
	
	 private PdfPTable createTable(List<ItemPedido> itemPedidos)
		      throws BadElementException {
		 
		    PdfPTable table = new PdfPTable(4);
		    
		    PdfPCell c1 = new PdfPCell(new Phrase("Produto"));
		    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(c1);

		    c1 = new PdfPCell(new Phrase("Quantidade"));
		    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(c1);

		    c1 = new PdfPCell(new Phrase("Preço"));
		    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(c1);
		    
		    c1 = new PdfPCell(new Phrase("Observação"));
		    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		    table.addCell(c1);
		    
		    table.setHeaderRows(1);
		   
		    for (int i = 0; i < itemPedidos.size(); i++) {
				//table.addCell(pedidos.get(i).toString());
		    	Integer qtd = new java.lang.Integer(itemPedidos.get(i).getQtd());
		    	
				table.addCell(itemPedidos.get(i).getProduto());
				table.addCell(qtd.toString());
				table.addCell(itemPedidos.get(i).getPreco().toString());
				table.addCell(itemPedidos.get(i).getObservacao());
			}
		    
//		    subCatPart.add(table);
		    
		    return table;
		    
	 }
	 
	 public void insereItemLista() throws JRException, IOException {
			ItemPedido novoItemPedido = new ItemPedido();
			novoItemPedido.setProduto(getItPedido().getProduto());
			novoItemPedido.setQtd(getItPedido().getQtd());
			novoItemPedido.setPreco(getItPedido().getPreco());
			novoItemPedido.setObservacao(getItPedido().getObservacao());
	
			this.itemPedido.add(novoItemPedido);
			//itensPedidos.add(novoItemPedido);
//			getItensPedidos().add(novoItemPedido);
//			setItensPedidos(itensPedidos);
//			getItemPedido().setItensPedidos(getItemPedido().getItensPedidos());
			this.setItemPedido(itemPedido);
			PedidoBean pb = new PedidoBean();
			//this.pdf(itemPedido);
		}

	 
	 public String redirecCliente(){
		 try {
			FacesContext.getCurrentInstance().getExternalContext().redirect("pesquisaCliente.xhtml");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		 return "pesquisarCliente.xhtml";
	 }
	 

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Boolean getIsDisableItens() {
		return isDisableItens;
	}

	public void setIsDisableItens(Boolean isDisableItens) {
		this.isDisableItens = isDisableItens;
	}

	public ThemeService getService() {
		return service;
	}

	public void setService(ThemeService service) {
		this.service = service;
	}

	public ItemPedidoBean getItemPedidoBean() {
		return itemPedidoBean;
	}
	public void setItemPedidoBean(ItemPedidoBean itemPedidoBean) {
		this.itemPedidoBean = itemPedidoBean;
	}
	public List<ItemPedido> getItemPedido() {
		return itemPedido;
	}
	public void setItemPedido(List<ItemPedido> itemPedido) {
		this.itemPedido = itemPedido;
	}
	public ItemPedido getItPedido() {
		return itPedido;
	}
	public void setItPedido(ItemPedido itPedido) {
		this.itPedido = itPedido;
	}
	

}
