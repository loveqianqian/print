package com.myloverqian.print.dao.impl;

import com.myloverqian.print.dao.IRecordDao;
import com.myloverqian.print.model.Record;
import com.myloverqian.print.util.CommonUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

/**
 * Created by zhiwei on 2016/4/15.
 */
@Repository("recordDao")
public class RecordDao extends JdbcDaoSupport implements IRecordDao {

    @Resource(name = "jdbcTemplate")
    public void setSupJdbcTemplate(JdbcTemplate jdbcTemplate) {
        super.setJdbcTemplate(jdbcTemplate);
    }


    @Override
    public boolean addRecord(List<Record> list) {
        final List<Record> records = list;
        Assert.notNull(list, "list is null");
        String sql = "INSERT INTO record(" +
                "name," +
                "masterId," +
                "masterName," +
                "detailId," +
                "detailName," +
                "number," +
                "prince," +
                "unit," +
                "prince2," +
                "unit2," +
                "time," +
                "userId," +
                "customerId," +
                "customerName," +
                "combineId" +
                ") VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            int[] counts = getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    Record record = records.get(i);
                    ps.setString(1, record.getName());
                    ps.setInt(2, record.getMasterId());
                    ps.setString(3, record.getMasterName());
                    ps.setInt(4, record.getDetailId());
                    ps.setString(5, record.getDetailName());
                    ps.setInt(6, record.getNumber());
                    ps.setDouble(7, record.getPrince());
                    ps.setString(8, record.getUnit());
                    ps.setDouble(9, record.getPrince2());
                    ps.setString(10, record.getUnit2());
                    ps.setString(11, record.getTime());
                    ps.setInt(12, record.getUserId());
                    ps.setInt(13, record.getCustomerId());
                    ps.setString(14, record.getCustomerName());
                    ps.setInt(15, record.getCombineId());
                }

                @Override
                public int getBatchSize() {
                    return records.size();
                }
            });
            return CommonUtils.isEqual(counts.length, records.size(), "保存数据有问题");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Record> queryRecord(String time, int combineId, int userId) {
        String sql = "SELECT * FROM record WHERE time=? AND userId=? AND customerId=?";
        List records = getJdbcTemplate().query(sql,
                new Object[]{
                        time,
                        userId,
                        combineId
                }, new int[]{
                        Types.VARCHAR,
                        Types.INTEGER,
                        Types.INTEGER
                }, new RowMapper() {
                    @Override
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Record record = new Record();
                        record.setId(rs.getInt("id"));
                        record.setName(rs.getString("name"));
                        record.setMasterId(rs.getInt("masterId"));
                        record.setMasterName(rs.getString("masterName"));
                        record.setDetailId(rs.getInt("detailId"));
                        record.setDetailName(rs.getString("detailName"));
                        record.setNumber(rs.getInt("number"));
                        record.setPrince(rs.getDouble("prince"));
                        record.setUnit(rs.getString("unit"));
                        record.setPrince2(rs.getDouble("prince2"));
                        record.setUnit2(rs.getString("unit2"));
                        record.setTime(rs.getString("time"));
                        record.setUserId(rs.getInt("userId"));
                        record.setCustomerId(rs.getInt("customerId"));
                        record.setCustomerName(rs.getString("customerName"));
                        record.setCombineId(rs.getInt("combineId"));
                        return record;
                    }
                });
        return records;
    }

    @Override
    public boolean delRecordById(int id) {
        Assert.notNull(id, "传入的id为空");
        String sql = "DELETE FROM record WHERE 1=1 AND id=?";
        try {
            getJdbcTemplate().update(sql, new Object[]{id}, new int[]{Types.INTEGER});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delRecordByCombineId(int combineId) {
        Assert.notNull(combineId, "传入的combineId为空");
        String sql = "DELETE FROM record WHERE 1=1 AND combineId=?";
        try {
            getJdbcTemplate().update(sql, new Object[]{combineId}, new int[]{Types.INTEGER});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateRecordById(Record record) {
        Assert.notNull(record, "record is null");
        String sql = "UPDATE record SET " +
                "name=?," +
                "masterId=?," +
                "masterName=?," +
                "detailId=?," +
                "detailName=?," +
                "number=?," +
                "prince=?," +
                "unit=?," +
                "prince2=?," +
                "unit2=?," +
                "time=?," +
                "userId=?," +
                "customerId=?," +
                "customerName=?," +
                "combineId=? " +
                "WHERE id=?";
        try {
            getJdbcTemplate().update(sql, new Object[]{
                    record.getName(),
                    record.getMasterId(),
                    record.getMasterName(),
                    record.getDetailId(),
                    record.getDetailName(),
                    record.getNumber(),
                    record.getPrince(),
                    record.getUnit(),
                    record.getPrince2(),
                    record.getUnit2(),
                    record.getTime(),
                    record.getUserId(),
                    record.getCustomerId(),
                    record.getCustomerName(),
                    record.getCombineId(),
                    record.getId()
            }, new int[]{
                    Types.VARCHAR,
                    Types.INTEGER,
                    Types.VARCHAR,
                    Types.INTEGER,
                    Types.VARCHAR,
                    Types.INTEGER,
                    Types.DOUBLE,
                    Types.VARCHAR,
                    Types.DOUBLE,
                    Types.VARCHAR,
                    Types.VARCHAR,
                    Types.INTEGER,
                    Types.INTEGER,
                    Types.VARCHAR,
                    Types.INTEGER,
                    Types.INTEGER
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
