package com.myloverqian.print.model;

import java.io.Serializable;

/**
 * Created by zhiwei on 2016/4/15.
 */
public class User implements Serializable {
    private int id;
    private String name;
    private String password;
    private String job;

    public User() {
    }

    public User(int id, String name, String password, String job) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.job = job;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", job='" + job + '\'' +
                '}';
    }
}
