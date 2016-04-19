package com.myloverqian.print.controller;

import com.myloverqian.print.model.Detail;
import com.myloverqian.print.model.Master;
import com.myloverqian.print.service.IConstructService;
import com.myloverqian.print.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhiwei on 2016/4/14.
 */
@Controller
@RequestMapping("/construct")
public class ConstructController {

    @Autowired
    private IConstructService constructService;

    @RequestMapping("/getMaster")
    public
    @ResponseBody
    Map<String, Object> getMaster(HttpServletRequest request, HttpServletResponse responses) {
        Map<String, Object> resultMap = new HashMap<>();
        String idStr = request.getParameter("id");
        int id = -1;
        if (CommonUtils.isNotNull(idStr)) {
            id = Integer.parseInt(idStr);
        }
        List<Master> masters = constructService.getMaster(id);
        resultMap.put("total", masters.size());
        resultMap.put("items", masters);
        return resultMap;
    }

    @RequestMapping("/getDetail")
    public
    @ResponseBody
    Map<String, Object> getDetail(HttpServletRequest request, HttpServletResponse responses) {
        Map<String, Object> resultMap = new HashMap<>();
        String idStr = request.getParameter("id");
        String sortIdStr = request.getParameter("sortId");
        int id = -1;
        int sortId = -1;
        if (CommonUtils.isNotNull(idStr)) {
            id = Integer.parseInt(idStr);
        }
        if (CommonUtils.isNotNull(sortIdStr)) {
            sortId = Integer.parseInt(sortIdStr);
        }
        List<Detail> details = constructService.getDetail(id, sortId);
        resultMap.put("total", details.size());
        resultMap.put("items", details);
        return resultMap;
    }

    @RequestMapping("/addMaster")
    public void addMaster(HttpServletRequest request, HttpServletResponse responses) {
        String name = request.getParameter("name");
        Master master = new Master();
        if (CommonUtils.isNotNull(name)) {
            master.setName(name);
            constructService.addMater(master);
        }
    }

    @RequestMapping("/updateMaster")
    public void updateMaster(HttpServletRequest request, HttpServletResponse responses) {
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        Master master = new Master();
        master.setId(Integer.parseInt(id));
        master.setName(name);
        constructService.updateMaster(master);
    }

    @RequestMapping("/deleteMaster")
    public void deleteMaster(HttpServletRequest request, HttpServletResponse responses) {
        String id = request.getParameter("id");
        constructService.deleteMaster(Integer.parseInt(id));
    }

    @RequestMapping("/addDetail")
    public void addDetail(HttpServletRequest request, HttpServletResponse responses) {
        String name = request.getParameter("name");
        String sortId = request.getParameter("sortId");
        String sortName = request.getParameter("sortName");
        String prince = request.getParameter("prince");
        String unit = request.getParameter("unit");
        String prince2 = request.getParameter("prince2");
        String unit2 = request.getParameter("unit2");
        Detail detail = new Detail();
        detail.setName(name);
        detail.setSortId(Integer.parseInt(sortId));
        detail.setSortName(sortName);
        detail.setPrince(Double.parseDouble(prince));
        detail.setUnit(unit);
        detail.setPrince2(Double.parseDouble(prince2));
        detail.setUnit2(unit2);
        constructService.addDetail(detail);
    }

    @RequestMapping("/updateDetail")
    public void updateDetail(HttpServletRequest request, HttpServletResponse responses) {
        String name = request.getParameter("name");
        String sortId = request.getParameter("sortId");
        String sortName = request.getParameter("sortName");
        String prince = request.getParameter("prince");
        String unit = request.getParameter("unit");
        String prince2 = request.getParameter("prince2");
        String unit2 = request.getParameter("unit2");
        Detail detail = new Detail();
        detail.setName(name);
        detail.setSortId(Integer.parseInt(sortId));
        detail.setSortName(sortName);
        detail.setPrince(Double.parseDouble(prince));
        detail.setUnit(unit);
        detail.setPrince2(Double.parseDouble(prince2));
        detail.setUnit2(unit2);
        constructService.updateDetail(detail);
    }

    @RequestMapping("/deleteDetail")
    public void deleteDetail(HttpServletRequest request, HttpServletResponse responses) {
        String id = request.getParameter("id");
        String sortId = request.getParameter("sortId");
        constructService.deleteDetail(Integer.parseInt(id), Integer.parseInt(sortId));
    }

}
