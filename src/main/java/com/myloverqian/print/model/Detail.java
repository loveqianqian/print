package com.myloverqian.print.model;

import java.io.Serializable;

/**
 * Created by zhiwei on 2016/4/15.
 */
public class Detail implements Serializable {
    private int id;
    private String name;
    private int sortId;
    private String sortName;
    private double prince;
    private String unit;
    private double prince2;
    private String unit2;


    public Detail() {
    }

    public Detail(int id, String name, int sortId, String sortName, double prince, String unit, double
            prince2, String unit2) {
        this.id = id;
        this.name = name;
        this.sortId = sortId;
        this.sortName = sortName;
        this.prince = prince;
        this.unit = unit;
        this.prince2 = prince2;
        this.unit2 = unit2;
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

    public int getSortId() {
        return sortId;
    }

    public void setSortId(int sortId) {
        this.sortId = sortId;
    }

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public double getPrince() {
        return prince;
    }

    public void setPrince(double prince) {
        this.prince = prince;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPrince2() {
        return prince2;
    }

    public void setPrince2(double prince2) {
        this.prince2 = prince2;
    }

    public String getUnit2() {
        return unit2;
    }

    public void setUnit2(String unit2) {
        this.unit2 = unit2;
    }
}
