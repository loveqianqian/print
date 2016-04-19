package com.myloverqian.print.model;

import java.io.Serializable;

/**
 * Created by zhiwei on 2016/4/14.
 */
public class Master implements Serializable {
    private int id;
    private String name;

    public Master(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Master() {

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
}
