package com.myloverqian.print.dao;

import com.myloverqian.print.model.User;

import java.util.List;

/**
 * <p>ProjectName:print</p>
 * <p>Description:</p>
 *
 * @author:diaozhiwei
 * @data:2016/4/16
 */
public interface IUserDao {

    /**
     * 添加user
     *
     * @param user
     * @return
     */
    boolean addUser(User user);

    /**
     * 更新user
     *
     * @param user
     * @return
     */
    boolean updateUser(User user);

    /**
     * 删除user
     *
     * @param id
     * @return
     */
    boolean delUser(int id);

    /**
     * 通过id 查找user
     * @param id
     * @return
     */
    User queryUser(int id);


    /**
     * 查找user
     * @return
     */
    List<User> queryAll();
}
