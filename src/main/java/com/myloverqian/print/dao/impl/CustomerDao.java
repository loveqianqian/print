package com.myloverqian.print.dao.impl;

import com.myloverqian.print.dao.ICustomerDao;
import com.myloverqian.print.model.Customer;
import com.myloverqian.print.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

/**
 * <p>ProjectName:print</p>
 * <p>Description:</p>
 *
 * @author:diaozhiwei
 * @data:2016/4/16
 */
@Repository("customerDao")
public class CustomerDao extends JdbcDaoSupport implements ICustomerDao {

    @Resource(name = "jdbcTemplate")
    public void setSupJdbcTemplate(JdbcTemplate jdbcTemplate) {
        super.setJdbcTemplate(jdbcTemplate);
    }

    @Override
    public boolean addCustomer(Customer customer) {
        Assert.notNull(customer, "customer值为空");
        String sql = "INSERT INTO customer(" +
                "name," +
                "phone," +
                "time" +
                ") VALUES(?,?,?)";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            customer.getName(),
                            customer.getPhone(),
                            customer.getTime()
                    }, new int[]{
                            Types.VARCHAR,
                            Types.DOUBLE,
                            Types.VARCHAR
                    });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateCustomer(Customer customer) {
        Assert.notNull(customer, "customer值为空");
        String sql = "UPDATE customer SET name=?,phone=?,time=? WHERE id=?";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            customer.getName(),
                            customer.getPhone(),
                            customer.getTime(),
                            customer.getId()
                    }, new int[]{
                            Types.VARCHAR,
                            Types.NUMERIC,
                            Types.VARCHAR,
                            Types.INTEGER
                    });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delCustomer(int id) {
        Assert.notNull(id, "传入的id为空");
        String sql = "DELETE FROM customer WHERE 1=1 AND id=?";
        try {
            getJdbcTemplate().update(sql, new Object[]{id}, new int[]{Types.INTEGER});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Customer queryCustomer(int id) {
        String sql = "SELECT * FROM customer WHERE id=?";
        try {
            Customer customer = (Customer) getJdbcTemplate().queryForObject(sql,
                    new Object[]{
                            id
                    }, new int[]{
                            Types.INTEGER
                    }, new RowMapper<Object>() {
                        @Override
                        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                            Customer customer = new Customer();
                            customer.setId(rs.getInt("id"));
                            customer.setName(rs.getString("name"));
                            customer.setPhone(rs.getLong("phone"));
                            customer.setTime(rs.getString("time"));
                            return customer;
                        }
                    });
            return customer;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Customer> queryAll() {
        String sql = "SELECT * FROM customer";
        try {
            List customers = getJdbcTemplate().query(sql,
                    new RowMapper<Object>() {
                        @Override
                        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                            Customer customer = new Customer();
                            customer.setId(rs.getInt("id"));
                            customer.setName(rs.getString("name"));
                            customer.setPhone(rs.getLong("phone"));
                            customer.setTime(rs.getString("time"));
                            return customer;
                        }
                    });
            return customers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
