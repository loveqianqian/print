package com.myloverqian.print.dao;

import com.myloverqian.print.model.Detail;
import com.myloverqian.print.model.Master;

import java.util.List;

/**
 * Created by zhiwei on 2016/4/14.
 */
public interface IConstructDao {
    /**
     * 查询所有的主分类
     * 如果id是-1 ，则查询所有的
     *
     * @return
     */
    List<Master> getPrints(int id);

    /**
     * 查询所有的细分类
     *
     * @return
     */
    List<Detail> getDetails(int id, int sortId);

    /**
     * 增加主分类
     *
     * @param master
     * @return
     */
    boolean addMaster(Master master);

    /**
     * 增加细分类
     *
     * @param detail
     * @return
     */
    boolean addDetail(Detail detail);

    /**
     * 删除主分类
     *
     * @param id
     * @return
     */
    boolean delMaster(int id);

    /**
     * 删除细分类
     *
     * @param id
     * @return
     */
    boolean delDetail(int id,int sortId);

    /**
     * 更新主分类
     *
     * @param master
     * @return
     */
    boolean updateMaster(Master master);

    /**
     * 更新细分类
     *
     * @param detail
     * @return
     */
    boolean updateDetail(Detail detail);
}
