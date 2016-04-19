package com.myloverqian.print.dao;

import com.myloverqian.print.model.Customer;
import com.myloverqian.print.model.User;

import java.util.List;

/**
 * <p>ProjectName:print</p>
 * <p>Description:</p>
 *
 * @author:diaozhiwei
 * @data:2016/4/16
 */
public interface ICustomerDao {

    /**
     * 添加customer
     *
     * @param customer
     * @return
     */
    boolean addCustomer(Customer customer);

    /**
     * 更新customer
     *
     * @param customer
     * @return
     */
    boolean updateCustomer(Customer customer);

    /**
     * 删除customer
     *
     * @param id
     * @return
     */
    boolean delCustomer(int id);

    /**
     * 通过id 查找customer
     *
     * @param id
     * @return
     */
    Customer queryCustomer(int id);

    /**
     * 通过id 查找customer
     *
     * @return
     */
    List<Customer> queryAll();
}
