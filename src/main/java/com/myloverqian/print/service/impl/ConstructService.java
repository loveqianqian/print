package com.myloverqian.print.service.impl;

import com.myloverqian.print.dao.IConstructDao;
import com.myloverqian.print.model.Detail;
import com.myloverqian.print.model.Master;
import com.myloverqian.print.service.IConstructService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhiwei on 2016/4/14.
 */
@Service("printService")
public class ConstructService implements IConstructService {

    @Autowired
    private IConstructDao constructDao;

    @Override
    public List<Master> getMaster(int id) {
        if (id == -1) {
            return constructDao.getPrints(-1);
        } else {
            return constructDao.getPrints(id);
        }
    }

    @Override
    public List<Detail> getDetail(int id, int sortId) {
        if (id == -1 && sortId != -1) {
            return constructDao.getDetails(-1, sortId);
        } else if (id != -1 && sortId == -1) {
            return constructDao.getDetails(id, -1);
        } else if (id == -1 && sortId == -1) {
            return constructDao.getDetails(-1, -1);
        } else if (id != -1 && sortId != -1) {
            return constructDao.getDetails(id, sortId);
        } else {
            return null;
        }
    }

    @Override
    public void addMater(Master master) {
        constructDao.addMaster(master);
    }

    @Override
    public void updateMaster(Master master) {
        constructDao.updateMaster(master);
    }

    @Override
    public void deleteMaster(int id) {
        constructDao.delMaster(id);
    }

    @Override
    public void deleteDetail(int id, int sortId) {
        constructDao.delDetail(id, sortId);
    }

    @Override
    public void updateDetail(Detail detail) {
        constructDao.updateDetail(detail);
    }

    @Override
    public void addDetail(Detail detail) {
        constructDao.addDetail(detail);
    }

}
