var subDateViewitemsPerPage = 20;

var subDataOperation = {
    addSubData: function () {
        var window = Ext.getCmp("addSubDataWindow");
        if (window) {
            Ext.getCmp("addSubDataWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addSubDataWindow',
                title: '添加订阅',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/subdata/addSubData',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: '应用系统',
                        name: 'subscriberId',
                        store: subscriberStore,
                        queryMode: 'remote',
                        displayField: 'sysName',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        fieldLabel: '应用服务编号',
                        name: 'msgCode',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '订阅视图',
                        name: 'dataViewId',
                        store: dataViewStore,
                        queryMode: 'remote',
                        displayField: 'dataViewName',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        fieldLabel: '轮询周期/分钟',
                        name: 'recycleMinute',
                        allowBlank: false
                    }, {
                        xtype: 'datetimefield',
                        fieldLabel: '当前采集时间点',
                        name: 'pointDate',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '数据发送方式',
                        name: 'subType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                type: "1",
                                name: "webservice"
                            }, {
                                type: "2",
                                name: "MQ"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
                        allowBlank: false
                    }, {
                        fieldLabel: '调用URL',
                        name: 'url',
                        allowBlank: false
                    }, {
                        fieldLabel: '调用方法',
                        name: 'method',
                        allowBlank: false
                    }],
                    buttons: [{
                        text: '重置注册信息',
                        handler: function () {
                            this.up('form').getForm().reset();
                        }
                    }, {
                        text: '提交注册信息',
                        formBind: true, // only enabled once the
                        // form is
                        // valid
                        // disabled : true,
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    success: function (form,
                                                       action) {
                                        Ext.Msg.alert('注册成功',
                                            "应用系统信息注册成功!");
                                        subDataStore.reload();
                                        // this.up('form').getForm().reset();
                                        form.reset();
                                        Ext
                                            .getCmp("addSubDataWindow")
                                            .hide();
                                    },
                                    failure: function (form,
                                                       action) {
                                        Ext.Msg.alert('注册失败',
                                            "应用系统信息注册失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
        }
    },

    updateSubData: function () {
        var row = Ext.getCmp("subDataGird").getSelectionModel().selected.items;
        var data = row[0].data;
        var window = Ext.getCmp("updateSubDataWindow");
        if (window) {
            Ext.getCmp("updateSubDataForm").getForm().setValues(data);
            Ext.getCmp("updateSubDataWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateSubDataWindow',
                title: '修改订阅',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id: 'updateSubDataForm',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/subdata/updateSubData',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '主键',
                        name: 'id',
                        allowBlank: false,
                        readOnly: true,
                        hidden: true
                    }, {
                        fieldLabel: '应用服务编号',
                        name: 'msgCode',
                        allowBlank: false,
                        readOnly: true

                    }, {
                        xtype: 'combobox',
                        fieldLabel: '应用系统',
                        name: 'subscriberId',
                        store: subscriberStore,
                        queryMode: 'remote',
                        displayField: 'sysName',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '订阅视图',
                        name: 'dataViewId',
                        store: dataViewStore,
                        queryMode: 'remote',
                        displayField: 'dataViewName',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        fieldLabel: '轮询周期/分钟',
                        name: 'recycleMinute',
                        allowBlank: false
                    }, {
                        xtype: 'datetimefield',
                        fieldLabel: '当前采集时间点',
                        name: 'pointDate',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '数据发送方式',
                        name: 'subType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                type: "1",
                                name: "webservice"
                            }, {
                                type: "2",
                                name: "MQ"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
                        allowBlank: false
                    }, {
                        fieldLabel: '调用URL',
                        name: 'url',
                        allowBlank: false
                    }, {
                        fieldLabel: '调用方法',
                        name: 'method',
                        allowBlank: false
                    }],
                    buttons: [{
                        text: '提交修改',
                        formBind: true,
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    success: function (form, action) {
                                        Ext.Msg
                                            .alert('操作结果',
                                            "信息修改成功!");
                                        subDataStore.reload();
                                        form.reset();
                                        Ext
                                            .getCmp("updateSubDataWindow")
                                            .hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg
                                            .alert('操作结果',
                                            "信息修改失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
            Ext.getCmp("updateSubDataForm").getForm().setValues(data);
        }
    },
    deleteSubData: function () {
        Ext.MessageBox.confirm('', '您确定要删除吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("subDataGird").getSelectionModel().selected.items;
                var id = row[0].data['id'];

                Ext.Ajax.request({
                    url: '/esb-gather/subdata/deleteSubData',
                    params: {
                        id: id
                    },
                    success: function (response) {
                        var text = response.responseText;
                        subDataStore.remove(row[0]);
                    }
                });
            }
        });

    },
    refreshThread: function () {
        Ext.MessageBox.confirm('', '您确定要启动新增采集线程吗?', function (opt) {
            if (opt == 'yes') {
                Ext.Ajax.request({
                    url: '/esb-gather/subdata/startGatherThread',
                    success: function (response, opts) {
                        var obj = Ext
                            .decode(response.responseText);
                        if (obj.failure) {
                            Ext.Msg.alert('操作结果', "没有需要启动的线程!");
                        } else {
                            Ext.Msg.alert('操作结果', "线程启动成功!");
                        }
                    },
                    failure: function (response, opts) {
                        Ext.Msg.alert('操作结果', "操作失败，请核实是否出现异常");
                    }
                });
            }
        });
    },
    startThread: function () {
        Ext.MessageBox.confirm('', '您确定要启动采集线程吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("subDataGird").getSelectionModel().selected.items;
                var data = row[0].data;
                Ext.Ajax.request({
                    url: '/esb-gather/subdata/startGatherThread',
                    params: {
                        msgCode: data['msgCode']
                    },
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);
                        if (obj.failure) {
                            Ext.Msg.alert('操作结果', "没有需要启动的线程!");
                        } else {
                            Ext.Msg.alert('操作结果', "线程启动成功!");
                        }
                    },
                    failure: function (response, opts) {
                        Ext.Msg.alert('操作结果', "操作失败，请核实是否出现异常");
                    }
                });
            }
        });
    },

    stopThread: function () {
        Ext.MessageBox.confirm('', '您确定要关闭采集线程吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("subDataGird").getSelectionModel().selected.items;
                var data = row[0].data;
                Ext.Ajax.request({
                    url: '/esb-gather/subdata/stopGatherThread',
                    params: {
                        msgCode: data['msgCode']
                    },
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);
                        if (obj.failure) {
                            Ext.Msg.alert('操作结果', "没有需要关闭线程!");
                        } else {
                            Ext.Msg.alert('操作结果', "线程正常关闭!");
                        }
                    },
                    failure: function (response, opts) {
                        Ext.Msg.alert('操作结果', "操作失败，请核实是否出现异常");
                    }
                });
            }
        });
    }
};

Ext.define('MyDesktop.SubDataViewWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: ['Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id: 'subdataWindow',

    init: function () {
        this.launcher = {
            text: '视图订阅管理',
            iconCls: 'subdataWindow'
        };
    },

    createWindow: function () {
        var itemLimit = 1;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('subdataWindow');
        if (!win) {
            win = desktop.createWindow({
                id: 'subdataWindow',
                title: '视图订阅管理',
                width: 1180,
                height: 600,
                iconCls: 'subdataWindow',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                viewConfig: {
                    forceFit: true
                },
                items: [{
                    border: false,
                    id: "subDataGird",
                    xtype: 'grid',
                    store: Ext.data.StoreManager.lookup('subDataStore'),
                    columns: [new Ext.grid.RowNumberer(), {
                        text: '主键',
                        dataIndex: 'id',
                        hidden: true
                    }, {
                        text: '应用服务编号',
                        dataIndex: 'msgCode',
                        sortable: true,
                        width: 100
                    }, {
                        text: "服务系统编号",
                        sortable: true,
                        dataIndex: 'subscriberId',
                        hidden: true
                    }, {
                        text: "服务系统名称",
                        width: 180,
                        sortable: true,
                        dataIndex: 'subscriberName'
                    }, {
                        text: "订阅视图Id",
                        sortable: true,
                        dataIndex: 'dataViewId',
                        hidden: true
                    }, {
                        text: "订阅视图名称",
                        width: 150,
                        sortable: true,
                        dataIndex: 'dataViewName'
                    }, {
                        text: '轮询周期/分钟',
                        width: 100,
                        sortable: true,
                        dataIndex: 'recycleMinute'
                    }, {
                        text: "订阅时间",
                        width: 140,
                        sortable: true,
                        dataIndex: 'actionDate'
                    }, {
                        text: '预设采集时间点',
                        width: 140,
                        dataIndex: 'pointDate'
                    }, {
                        text: '数据发送方式',
                        width: 100,
                        dataIndex: 'subType',
                        renderer: function (val) {
                            if (val == '1') {
                                return "WebService";
                            } else if (val == '2') {
                                return "MQ";
                            }
                        }
                    }, {
                        text: '当前状态',
                        width: 80,
                        dataIndex: 'threadStatus',
                        align: 'center',
                        renderer: function (val) {
                            if (val == '1') {
                                return "<img alt='' src='../shared/icons/fam/greenstatus.gif' style='width:16px;height:14px;'>";
                            } else {
                                return "<img alt='' src='../shared/icons/fam/readstatus.gif' style='width:16px;height:14px;'>";
                            }
                        }
                    }, {
                        text: '启动/关闭',
                        width: 150,
                        dataIndex: 'threadStatus',
                        renderer: function (val) {
                            if (val == '1') {
                                return "<img   src='../shared/icons/fam/stop.png' style='width:50px;height:14px;cursor:pointer' onclick=subDataOperation.stopThread();>";
                            } else {
                                return "<img  src='../shared/icons/fam/start.png' style='width:50px;height:14px;cursor:pointer' onclick=subDataOperation.startThread();>";
                            }
                        }
                    }]
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一行记录',
                    iconCls: 'add',
                    handler: function () {
                        subDataOperation.addSubData();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前记录',
                    iconCls: 'option',
                    handler: function () {

                        var row = Ext.getCmp("subDataGird")
                            .getSelectionModel().selected.items
                        if (row.length) {
                            subDataOperation.updateSubData();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }, '-', {
                    text: '删除',
                    tooltip: '删除选中的记录',
                    iconCls: 'remove',
                    handler: function () {

                        var row = Ext.getCmp("subDataGird")
                            .getSelectionModel().selected.items
                        if (row.length) {
                            subDataOperation.deleteSubData();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }, '-', {
                    text: '刷新新增采集',
                    tooltip: '刷新新增采集，仅在新增时有效',
                    iconCls: 'add',
                    handler: function () {
                        subDataOperation.refreshThread();
                    }
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: subDataStore,
                    displayInfo: true,
                    displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                    emptyMsg: "没有数据"
                })
            });
        }
        return win;
    }

});

Ext.define('subData', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'msgCode',
        type: 'string'
    }, {
        name: 'subscriberId',
        type: 'string'
    }, {
        name: 'subscriberName',
        type: 'string'
    }, {
        name: 'dataViewId',
        type: 'string'
    }, {
        name: 'dataViewName',
        type: 'string'
    }, {
        name: 'actionDate',
        type: 'string'
    }, {
        name: 'recycleMinute',
        type: 'string'
    }, {
        name: 'pointDate',
        type: "string"
    }, {
        name: 'subType',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'method',
        type: 'string'
    }, {
        name: 'threadStatus',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var subDataStore = Ext.create('Ext.data.Store', {
    storeId: 'subDataStore',
    model: 'subData',
    autoLoad: false,
    pageSize: subDateViewitemsPerPage,
    proxy: {
        type: 'ajax',
        url: '/esb-gather/subdata/getSubDatas',
        reader: {
            type: 'json',
            root: 'root',
            totalProperty: 'total'
        }
    }
});
subDataStore.load({
    params: {
        start: 0,
        limit: subDateViewitemsPerPage
    }
});
