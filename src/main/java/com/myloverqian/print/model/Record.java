package com.myloverqian.print.model;

import java.io.Serializable;

/**
 * Created by zhiwei on 2016/4/15.
 */
public class Record implements Serializable {

    private int id;
    private String name;
    private int masterId;
    private String masterName;
    private int detailId;
    private String detailName;
    private int number;
    private double prince;
    private String unit;
    private double prince2;
    private String unit2;
    private String time;
    private int userId;
    private int customerId;
    private String customerName;
    private int combineId;

    public Record() {
    }

    public Record(int id, String name, int masterId, String masterName, int detailId, String detailName, int
            number, double prince, String unit, double prince2, String unit2, String time, int userId, int
            customerId, String customerName, int combineId) {
        this.id = id;
        this.name = name;
        this.masterId = masterId;
        this.masterName = masterName;
        this.detailId = detailId;
        this.detailName = detailName;
        this.number = number;
        this.prince = prince;
        this.unit = unit;
        this.prince2 = prince2;
        this.unit2 = unit2;
        this.time = time;
        this.userId = userId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.combineId = combineId;
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

    public int getMasterId() {
        return masterId;
    }

    public void setMasterId(int masterId) {
        this.masterId = masterId;
    }

    public String getMasterName() {
        return masterName;
    }

    public void setMasterName(String masterName) {
        this.masterName = masterName;
    }

    public int getDetailId() {
        return detailId;
    }

    public void setDetailId(int detailId) {
        this.detailId = detailId;
    }

    public String getDetailName() {
        return detailName;
    }

    public void setDetailName(String detailName) {
        this.detailName = detailName;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public double getPrince() {
        return prince;
    }

    public void setPrince(double prince) {
        this.prince = prince;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public int getCombineId() {
        return combineId;
    }

    public void setCombineId(int combineId) {
        this.combineId = combineId;
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

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Override
    public String toString() {
        return "Record{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", masterId=" + masterId +
                ", masterName='" + masterName + '\'' +
                ", detailId=" + detailId +
                ", detailName='" + detailName + '\'' +
                ", number=" + number +
                ", prince=" + prince +
                ", unit='" + unit + '\'' +
                ", prince2=" + prince2 +
                ", unit2='" + unit2 + '\'' +
                ", time='" + time + '\'' +
                ", userId=" + userId +
                ", customerId=" + customerId +
                ", customerName='" + customerName + '\'' +
                ", combineId=" + combineId +
                '}';
    }
}
