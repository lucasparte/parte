package br.com.beans;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
 


import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;
 
@ManagedBean
public class FileDownloadView {
     
    private StreamedContent file;
    
    
     
    public FileDownloadView() {        
        InputStream stream = ((ServletContext)FacesContext.getCurrentInstance().getExternalContext().getContext()).getResourceAsStream("/resources/images/movel.jpg");
        file = new DefaultStreamedContent(stream, "image/jpg", "movel.jpg");
    }
 
    public StreamedContent getFile() throws FileNotFoundException {    
        String caminho = "C:/arquivo/votup/tela1621052013094032.jpg";  
        String arquivo = "tela1621052013094032.jpg";  
        FileInputStream stream = new FileInputStream(caminho);      
        file = new DefaultStreamedContent(stream, caminho,arquivo);   
        return file;    
    }
}