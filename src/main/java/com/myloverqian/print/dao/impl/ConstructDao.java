package com.myloverqian.print.dao.impl;


import com.myloverqian.print.dao.IConstructDao;
import com.myloverqian.print.model.Detail;
import com.myloverqian.print.model.Master;

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
 * Created by zhiwei on 2016/4/14.
 */

@Repository("constructDao")
public class ConstructDao extends JdbcDaoSupport implements IConstructDao {

    @Resource(name = "jdbcTemplate")
    public void setSupJdbcTemplate(JdbcTemplate jdbcTemplate) {
        super.setJdbcTemplate(jdbcTemplate);
    }

    @Override
    public List<Master> getPrints(int id) {
        String sql;
        if (id == -1) {
            sql = "SELECT * FROM master";
        } else {
            sql = "select * from master where id=" + id;
        }
        List prints = getJdbcTemplate().query(sql, new RowMapper() {
            @Override
            public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                Master print = new Master();
                print.setId(rs.getInt("id"));
                print.setName(rs.getString("name"));
                return print;
            }
        });
        return prints;
    }

    @Override
    public List<Detail> getDetails(int id, int sortId) {
        StringBuffer sql = new StringBuffer("select * from detail where 1=1");
        if (id != -1) {
            sql.append(" and id=");
            sql.append(id);
        }
        if (sortId != -1) {
            sql.append(" and sortId=");
            sql.append(sortId);
        }
        List details = getJdbcTemplate().query(sql.toString(), new RowMapper() {
            @Override
            public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                Detail detail = new Detail();
                detail.setId(rs.getInt("id"));
                detail.setName(rs.getString("name"));
                detail.setSortId(rs.getInt("sortId"));
                detail.setSortName(rs.getString("sortName"));
                detail.setPrince(rs.getDouble("prince"));
                detail.setUnit(rs.getString("unit"));
                detail.setPrince2(rs.getDouble("prince2"));
                detail.setUnit2(rs.getString("unit2"));
                return detail;
            }
        });
        return details;
    }

    @Override
    public boolean addMaster(Master master) {
        Assert.notNull(master, "master is null");
        String sql = "INSERT INTO master(name) VALUES(?)";
        try {
            getJdbcTemplate().update(sql, new Object[]{master.getName()}, new int[]{Types.VARCHAR});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean addDetail(Detail detail) {
        Assert.notNull(detail, "detail is null");
        String sql = "INSERT INTO detail(name,sortId,sortName,prince,unit,prince2,unit2) VALUES(?,?,?,?,?,?,?)";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            detail.getName(),
                            detail.getSortId(),
                            detail.getSortName(),
                            detail.getPrince(),
                            detail.getUnit(),
                            detail.getPrince2(),
                            detail.getUnit2()
                    }, new int[]{
                            Types.VARCHAR,
                            Types.INTEGER,
                            Types.VARCHAR,
                            Types.DOUBLE,
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
    public boolean delMaster(int id) {
        Assert.notNull(id, "传入的id为空");
        StringBuffer sql = new StringBuffer("delete from master where id=?");
        try {
            getJdbcTemplate().update(sql.toString(), new Object[]{id}, new int[]{Types.INTEGER});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delDetail(int id, int sortId) {
        Assert.notNull(id, "传入的id为空");
        StringBuffer sql = new StringBuffer("delete from detail where 1=1");
        if (id != -1) {
            sql.append(" and id =");
            sql.append(id);
        }
        if (sortId != -1) {
            sql.append(" and sortId =");
            sql.append(sortId);
        }
        try {
            getJdbcTemplate().update(sql.toString());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateMaster(Master master) {
        Assert.notNull(master, "传入的master为空");
        String sql = "UPDATE master set name=? where id=?";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            master.getName(),
                            master.getId()
                    }, new int[]{
                            Types.VARCHAR,
                            Types.INTEGER});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateDetail(Detail detail) {
        Assert.notNull(detail, "传入的detail值为空");
        String sql = "UPDATE detail " +
                "SET name=?,sortId=?,sortName=?,prince=?,unit=?,prince2=?,unit2=? " +
                "WHERE id=?";
        try {
            getJdbcTemplate().update(sql,
                    new Object[]{
                            detail.getName(),
                            detail.getSortId(),
                            detail.getSortName(),
                            detail.getPrince(),
                            detail.getUnit(),
                            detail.getPrince2(),
                            detail.getUnit2(),
                            detail.getId(),
                    }, new int[]{
                            Types.VARCHAR,
                            Types.INTEGER,
                            Types.VARCHAR,
                            Types.DOUBLE,
                            Types.VARCHAR,
                            Types.DOUBLE,
                            Types.VARCHAR,
                            Types.INTEGER
                    });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
