/**
 * 
 */
package br.com.beans;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Classe para fazer a leitura de um arquivo de configuração e retornar o valor dos parametros.
 *
 */

public class Config {
	
	
	
	//Inicia o log
	private static final Log log = LogFactory.getLog(Config.class);
	
	public static final String CONFIG_DS = "config.ds.";
	public static final String CONFIG_SMTP = "config.mail.smtp.";
	
	//Inicia as propriedades
	private Properties props = new Properties();
	
	public Config(){
		readConfig();
	}
	
	/**
	 * Le arquivo de configuração
	 * @param cfg
	 */
	private void readConfig() {
		
		//String ConfPath = System.getProperty("java.class.path") + "/config/logali.properties";
		//log.info("Arquivo de configuração: " + ConfPath);

		InputStream in = null;
		
		try {
			in = this.getClass().getClassLoader().getResourceAsStream("/logali.properties");
			Properties p = new Properties();
			p.load(in);
			
			this.props = p;
			
		}
		catch(Exception ex) {
			throw new RuntimeException("Erro ao ler arquivo de configuracao : " + ex.getMessage(),ex);
		}
		finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch(IOException ignored){}
			}
		}
	}
	
	/**
	 * retornar os parametros por chaves do arquivo de configuração
	 * @param key
	 * @return propriedader
	 */
	public String getString(String key) {
		
		String prop =  props.getProperty(key);
		return prop;
	}
	

}
