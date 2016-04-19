package com.myloverqian.print.service;

import com.myloverqian.print.model.Detail;
import com.myloverqian.print.model.Master;

import java.util.List;

/**
 * Created by zhiwei on 2016/4/14.
 */
public interface IConstructService {

    List<Master> getMaster(int id);

    List<Detail> getDetail(int id, int sortId);

    void addMater(Master master);

    void updateMaster(Master master);

    void deleteMaster(int id);

    void deleteDetail(int id, int sortId);

    void updateDetail(Detail detail);

    void addDetail(Detail detail);
}
