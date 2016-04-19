package com.myloverqian.print.model;

import java.io.Serializable;

/**
 * Created by zhiwei on 2016/4/15.
 */
public class Customer implements Serializable {
    private int id;
    private String name;
    private long phone;
    private String time;

    public Customer() {
    }

    public Customer(int id, String name, long phone, String time) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone=" + phone +
                ", time='" + time + '\'' +
                '}';
    }
}
