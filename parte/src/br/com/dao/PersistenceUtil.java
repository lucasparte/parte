package br.com.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

@PersistenceContext(type = PersistenceContextType.EXTENDED)
public class PersistenceUtil {

	private static EntityManagerFactory emf = null;

	public static EntityManager getEntityManager() {
		if (emf == null)
			init();
		return emf.createEntityManager();
	}

	private static void init() {
		emf = Persistence.createEntityManagerFactory("pArte");
	}

	public static void close(EntityManager em) {
		if (em != null)
			em.close();
	}
}
