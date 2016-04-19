package com.myloverqian.print.dao;

import com.myloverqian.print.model.Record;

import java.util.List;

/**
 * Created by zhiwei on 2016/4/15.
 */
public interface IRecordDao {

    /**
     * 加入一组数据到记录表
     *
     * @param list
     */
    boolean addRecord(List<Record> list);

    /**
     * 获取所有的record记录
     *
     * @return
     */
    List<Record> queryRecord(String time,int combineId,int userId);

    /**
     * 通过id删除record
     *
     * @param id
     * @return
     */
    boolean delRecordById(int id);

    /**
     * 通过combineId删除record
     *
     * @param combineId
     * @return
     */
    boolean delRecordByCombineId(int combineId);

    /**
     * 通过id修改record记录
     * @param record
     * @return
     */
    boolean updateRecordById(Record record);

}
