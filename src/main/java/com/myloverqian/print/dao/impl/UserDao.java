package com.myloverqian.print.dao.impl;

import com.myloverqian.print.dao.IUserDao;
import com.myloverqian.print.model.Record;
import com.myloverqian.print.model.User;
import com.myloverqian.print.util.CommonUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.sql.PreparedStatement;
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
@Component("userDao")
public class UserDao extends JdbcDaoSupport implements IUserDao {


    @Resource(name = "jdbcTemplate")
    public void setSupJdbcTemplate(JdbcTemplate jdbcTemplate) {
        super.setJdbcTemplate(jdbcTemplate);
    }

    @Override
    public boolean addUser(User user) {
        Assert.notNull(user, "user值为空");
        String sql = "INSERT INTO user(" +
                "name," +
                "password," +
                "job" +
                ") VALUES(?,?,?)";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            user.getName(),
                            user.getPassword(),
                            user.getJob()
                    }, new int[]{
                            Types.VARCHAR,
                            Types.VARCHAR,
                            Types.VARCHAR
                    });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateUser(User user) {
        Assert.notNull(user, "user值为空");
        String sql = "UPDATE  user SET name=?,password=?,job=? WHERE id=?";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            user.getName(),
                            user.getPassword(),
                            user.getJob(),
                            user.getId()
                    }, new int[]{
                            Types.VARCHAR,
                            Types.VARCHAR,
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
    public boolean delUser(int id) {
        Assert.notNull(id, "传入的id为空");
        String sql = "DELETE FROM user WHERE 1=1 AND id=?";
        try {
            getJdbcTemplate().update(sql, new Object[]{id}, new int[]{Types.INTEGER});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public User queryUser(int id) {
        String sql = "SELECT * FROM user WHERE id=?";
        try {
            User user = (User) getJdbcTemplate().queryForObject(sql,
                    new Object[]{
                            id
                    }, new int[]{
                            Types.INTEGER
                    }, new RowMapper<Object>() {
                        @Override
                        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                            User user = new User();
                            user.setId(rs.getInt("id"));
                            user.setName(rs.getString("name"));
                            user.setPassword(rs.getString("password"));
                            user.setJob(rs.getString("job"));
                            return user;
                        }
                    });
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<User> queryAll() {
        String sql = "SELECT * FROM user";
        try {
            List users = getJdbcTemplate().query(sql,
                    new RowMapper<Object>() {
                        @Override
                        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                            User user = new User();
                            user.setId(rs.getInt("id"));
                            user.setName(rs.getString("name"));
                            user.setPassword(rs.getString("password"));
                            user.setJob(rs.getString("job"));
                            return user;
                        }
                    });
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
