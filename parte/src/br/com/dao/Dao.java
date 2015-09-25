package br.com.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;

public class Dao<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final Class<T> classe;

	public Dao(Class<T> classe) {
		this.classe = classe;
	}

	public void adiciona(T t) {
		EntityManager em = null;
		try {
			em = PersistenceUtil.getEntityManager();
			em.getTransaction().begin();
			em.persist(t);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			PersistenceUtil.close(em);
		}
	}

	public void remove(T t) {
		EntityManager em = null;
		try {
			em = PersistenceUtil.getEntityManager();
			em.getTransaction().begin();
			em.remove(em.merge(t));
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			PersistenceUtil.close(em);
		}
	}

	public void atualiza(T t) {
		EntityManager em = null;
		try {
			em = PersistenceUtil.getEntityManager();
			em.getTransaction().begin();
			em.merge(t);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			PersistenceUtil.close(em);
		}
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		EntityManager em = PersistenceUtil.getEntityManager();
		CriteriaQuery<T> query = em.getCriteriaBuilder().createQuery(classe);
		query.select(query.from(classe));
		List<T> lista = em.createQuery(query).getResultList();
		PersistenceUtil.close(em);
		return lista;
	}

	@SuppressWarnings("unchecked")
	public List<T> getListaPaginado(int inicio, int quantidade) {
		EntityManager em = PersistenceUtil.getEntityManager();
		Query query = em
				.createQuery("SELECT e FROM " + classe.getName() + " e")
				.setFirstResult(inicio).setMaxResults(quantidade);
		List<T> lista = query.getResultList();
		PersistenceUtil.close(em);
		return lista;
	}

	@SuppressWarnings("unchecked")
	public List<T> getListaPaginado(int inicio, int quantidade, String Order) {
		EntityManager em = PersistenceUtil.getEntityManager();
		Query query = em
				.createQuery(
						"SELECT e FROM " + classe.getName() + " e order by e."
								+ Order).setFirstResult(inicio)
				.setMaxResults(quantidade);
		List<T> lista = query.getResultList();
		PersistenceUtil.close(em);
		return lista;
	}

	@SuppressWarnings("unchecked")
	public List<T> getListaPaginado(int inicio, int quantidade,
			String criterio, String Order) {
		EntityManager em = PersistenceUtil.getEntityManager();
		Query query = em
				.createQuery(
						"SELECT e FROM " + classe.getName() + " e where "
								+ criterio + " order by e." + Order)
				.setFirstResult(inicio).setMaxResults(quantidade);
		List<T> lista = query.getResultList();
		PersistenceUtil.close(em);
		return lista;
	}

	public T buscaPorId(int id) {
		EntityManager em = PersistenceUtil.getEntityManager();
		return em.find(classe, id);
	}

	public T buscaPorId(String id) {
		EntityManager em = PersistenceUtil.getEntityManager();
		return em.find(classe, id);
	}

	@SuppressWarnings("unchecked")
	public int count() {
		Long resultado = new Long(0L);
		EntityManager em = PersistenceUtil.getEntityManager();
		Query query = em.createQuery("select count(e) from " + classe.getName()
				+ " e");
		resultado = (Long) query.getSingleResult();
		PersistenceUtil.close(em);
		return resultado.intValue();
	}

	@SuppressWarnings("unchecked")
	public int count(String cCriterio) {
		Long resultado = new Long(0L);
		EntityManager em = PersistenceUtil.getEntityManager();
		Query query = em.createQuery("select count(e) from " + classe.getName()
				+ " e" + " where e." + cCriterio);
		resultado = (Long) query.getSingleResult();
		PersistenceUtil.close(em);
		return resultado.intValue();
	}

	@SuppressWarnings("unchecked")
	public List<T> getLista(String cSql) {
		EntityManager em = PersistenceUtil.getEntityManager();
		List<T> lista = em.createQuery(cSql).getResultList();
		em.close();
		return lista;
	}

	@SuppressWarnings("unchecked")
	public List<T> getSQLNativa(String cSql) {
		EntityManager em = PersistenceUtil.getEntityManager();
		List<T> lista = em.createNativeQuery(cSql).getResultList();
		em.close();
		return lista;
	}
}
