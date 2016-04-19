var itemsPerPage = 15;

var msgOperation = {
    addMsg: function () {
        var window = Ext.getCmp("addMsgWindow");
        if (window) {
            Ext.getCmp("addMsgWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addMsgWindow',
                title: '应用服务注册',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/msg/registerMsg',
                    layout: 'anchor',
                    defaults: {
                        anchor: '90%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '应用服务编号',
                        name: 'msgCode',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '应用服务类型',
                        name: 'msgType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                "type": "noBroadcast",
                                "name": "非广播"
                            }, {
                                "type": "broadcast",
                                "name": "广播"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
                        allowBlank: false
                    }, {
                        fieldLabel: '应用服务名称',
                        name: 'msgName',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '所属系统',
                        name: 'appId',
                        store: store,
                        queryMode: 'remote',
                        displayField: 'name',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: '状态',
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1
                        },
                        layout: 'hbox',
                        items: [{
                            boxLabel: '可用',
                            name: 'status',
                            inputValue: '可用',
                            id: 'radio1',
                            checked: true
                        }, {
                            boxLabel: '停用',
                            name: 'status',
                            inputValue: '停用',
                            id: 'radio2'
                        }]
                    }, {
                        fieldLabel: '简介',
                        name: 'content',
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
                                        messageStore.reload();
                                        form.reset();
                                        Ext
                                            .getCmp("addMsgWindow")
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

    updateMsg: function () {
        var row = Ext.getCmp("msgGird").getSelectionModel().selected.items;
        var data = row[0].data;
        var window = Ext.getCmp("updateMsgWindow");
        if (window) {
            Ext.getCmp("updateMsgForm").getForm().setValues(data);
            Ext.getCmp("updateMsgWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateMsgWindow',
                title: '应用系统添加',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id: 'updateMsgForm',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/msg/updateMsg',
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
                        readOnly: true,
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '应用服务类型',
                        name: 'msgType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                "type": "noBroadcast",
                                "name": "非广播"
                            }, {
                                "type": "broadcast",
                                "name": "广播"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
                        allowBlank: false
                    }, {
                        fieldLabel: '应用服务名称',
                        name: 'msgName',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '所属系统',
                        name: 'appId',
                        store: store,
                        queryMode: 'remote',
                        displayField: 'name',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: '状态',
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1
                        },
                        layout: 'hbox',
                        items: [{
                            boxLabel: '可用',
                            name: 'status',
                            inputValue: '可用',
                            id: 'radio1',
                            checked: true
                        }, {
                            boxLabel: '停用',
                            name: 'status',
                            inputValue: '停用',
                            id: 'radio2'
                        }, {
                            boxLabel: '废弃',
                            name: 'status',
                            inputValue: '废弃',
                            id: 'radio3'
                        }]
                    }, {
                        fieldLabel: '简介',
                        name: 'content',
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
                                        Ext.Msg.alert('操作结果',
                                            "应用服务信息修改成功!");
                                        messageStore.reload();
                                        form.reset();
                                        Ext.getCmp("updateMsgWindow")
                                            .hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('操作结果',
                                            "应用服务信息修改失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
            Ext.getCmp("updateMsgForm").getForm().setValues(data);
        }
    },
    deleteMsg: function () {
        Ext.MessageBox.confirm('', '您确定要删除吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("msgGird").getSelectionModel().selected.items;
                var id = row[0].data['id'];

                Ext.Ajax.request({
                    url: '/esb-gather/msg/deleteMsg',
                    params: {
                        id: id
                    },
                    success: function (response) {
                        var text = response.responseText;
                        messageStore.remove(row[0]);
                    }
                });
            }
        });

    }
}

Ext.define('MyDesktop.MsgRegisterWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: ['Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id: 'msgRegister',

    init: function () {
        this.launcher = {
            text: 'msgRegister',
            iconCls: 'msgRegister'
        };
    }
    ,

    createWindow: function () {
        var itemLimit = 1;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('msgRegister');
        if (!win) {
            messageStore.load({
                params: {
                    start: 0,
                    limit: itemsPerPage
                }
            });
            win = desktop.createWindow({
                id: 'msgRegister',
                title: '应用服务系统管理',
                width: 1024,
                height: 500,
                iconCls: 'msgRegister',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: [{
                    border: false,
                    id: "msgGird",
                    xtype: 'grid',
                    store: Ext.data.StoreManager
                        .lookup('messageStore'),
                    columns: [new Ext.grid.RowNumberer(), {
                        text: '主键',
                        dataIndex: 'id',
                        hidden: true
                    }, {
                        text: "服务编号",
                        sortable: true,
                        width: 120,
                        dataIndex: 'msgCode'
                    }, {
                        text: "服务类型",
                        sortable: true,
                        width: 120,
                        dataIndex: 'msgType',
                        renderer: function (value) {
                            if (value == 'broadcast') {
                                return '广播';
                            } else {
                                return '非广播';
                            }
                        }
                    }, {
                        text: '服务名称',
                        sortable: true,
                        width: 120,
                        dataIndex: 'msgName'
                    }, {
                        text: "所属应用系统",
                        sortable: true,
                        width: 120,
                        dataIndex: 'appName'

                    }, {
                        text: "所属应用系统编号",
                        sortable: true,
                        dataIndex: 'appId',
                        hidden: true
                    }, {
                        text: "注册时间",
                        width: 200,
                        sortable: true,
                        dataIndex: 'registerDate'

                    }, {
                        text: "简介",
                        sortable: true,
                        width: 160,
                        dataIndex: 'content'
                    }, {
                        text: "状态",
                        sortable: true,
                        width: 160,
                        dataIndex: 'status'
                    }]
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一行记录',
                    iconCls: 'add',
                    handler: function () {
                        msgOperation.addMsg();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前记录',
                    iconCls: 'option',
                    handler: function () {

                        var row = Ext.getCmp("msgGird")
                            .getSelectionModel().selected.items
                        if (row.length) {
                            msgOperation.updateMsg();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }, {
                    text: '删除',
                    tooltip: '删除选中的记录',
                    iconCls: 'remove',
                    handler: function () {

                        var row = Ext.getCmp("msgGird")
                            .getSelectionModel().selected.items
                        if (row.length) {
                            msgOperation.deleteMsg();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: messageStore,
                    displayInfo: true,
                    displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                    emptyMsg: "没有数据"
                })
            });
        }
        return win;
    }

})
;

Ext.define('message', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'msgCode',
        type: 'string'
    }, {
        name: 'msgType',
        type: 'string'
    }, {
        name: 'msgName',
        type: 'string'
    }, {
        name: 'appName',
        type: 'string'
    }, {
        name: 'appId',
        type: 'string'
    }, {
        name: 'registerDate',
        type: 'string'
    }, {
        name: 'content',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var messageStore = Ext.create('Ext.data.Store', {
    storeId: 'messageStore',
    model: 'message',
    autoLoad: false,
    pageSize: itemsPerPage,
    proxy: {
        type: 'ajax',
        url: '/esb-gather/msg/messageList',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
});
