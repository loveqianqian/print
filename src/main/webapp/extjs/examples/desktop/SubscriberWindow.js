var subscriberOperation = {
    addSubscriber: function () {
        var window = Ext.getCmp("addSubscriberWindow");
        if (window) {
            Ext.getCmp("addSubscriberWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addSubscriberWindow',
                title: '应用系统添加',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/subscriber/addSubscriber',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '服务系统编号',
                        name: 'sysCode',
                        allowBlank: false
                    }, {
                        fieldLabel: '服务系统名称',
                        name: 'sysName',
                        allowBlank: false
                    }, {
                        xtype: 'datefield',
                        fieldLabel: '添加时间',
                        name: 'registerDate',
                        allowBlank: false
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
                                    success: function (form, action) {
                                        Ext.Msg.alert('注册成功',
                                            "应用系统信息注册成功!");
                                        subscriberStore.reload();
                                        // this.up('form').getForm().reset();
                                        form.reset();
                                        Ext
                                            .getCmp("addSubscriberWindow")
                                            .hide();
                                    },
                                    failure: function (form, action) {
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

    updateSubscriber: function () {
        var row = Ext.getCmp("subscriberGird").getSelectionModel().selected.items;
        var data = row[0].data;
        var window = Ext.getCmp("updateSubscriberWindow");
        if (window) {
            Ext.getCmp("updateSubscriberForm").getForm().setValues(data);
            Ext.getCmp("updateSubscriberWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateSubscriberWindow',
                title: '应用系统修改',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id: 'updateSubscriberForm',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/subscriber/updateSubscriber',
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
                        fieldLabel: '服务系统编号',
                        name: 'sysCode',
                        allowBlank: false
                    }, {
                        fieldLabel: '服务系统名称',
                        name: 'sysName',
                        allowBlank: false
                    }, {
                        fieldLabel: '添加时间',
                        name: 'registerDate',
                        allowBlank: false
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
                                        Ext.Msg.alert('操作结果', "应用系统信息修改成功!");
                                        subscriberStore.reload();
                                        form.reset();
                                        Ext.getCmp("updateSubscriberWindow").hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('操作结果', "应用系统信息修改失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
            Ext.getCmp("updateSubscriberForm").getForm().setValues(data);
        }
    }
}

Ext.define('MyDesktop.SubscriberWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: ['Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id: 'subscriberWindow',

    init: function () {
        this.launcher = {
            text: '应用系统管理',
            iconCls: 'subscriberWindow'
        };
    },

    createWindow: function () {
        var itemLimit = 1;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('subscriberWindow');
        if (!win) {
            win = desktop.createWindow({
                id: 'subscriberWindow',
                title: '订阅服务系统管理',
                width: 800,
                height: 480,
                iconCls: 'subscriberWindow',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                viewConfig: {
                    forceFit: true
                },
                items: [{
                    border: false,
                    id: "subscriberGird",
                    xtype: 'grid',
                    store: Ext.data.StoreManager.lookup('subscriberStore'),
                    columns: [new Ext.grid.RowNumberer(), {
                        text: '主键',
                        dataIndex: 'id',
                        hidden: true
                    }, {
                        text: "服务系统编号",
                        sortable: true,
                        flex: 1,
                        dataIndex: 'sysCode'
                    }, {
                        text: "服务系统名称",
                        width: 200,
                        sortable: true,
                        dataIndex: 'sysName'
                    }, {
                        text: "添加时间",
                        width: 200,
                        sortable: true,
                        dataIndex: 'registerDate'
                    }, {
                        text: "简介",
                        sortable: true,
                        dataIndex: 'content',
                        width: 200
                    }]
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一行记录',
                    iconCls: 'add',
                    handler: function () {
                        subscriberOperation.addSubscriber();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前记录',
                    iconCls: 'option',
                    handler: function () {
                        var row = Ext.getCmp("subscriberGird").getSelectionModel().selected.items
                        if (row.length) {
                            subscriberOperation
                                .updateSubscriber();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }]
            });
        }
        return win;
    }

});

Ext.define('subscriberInfo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'sysCode',
        type: 'string'
    }, {
        name: 'sysName',
        type: 'string'
    }, {
        name: 'registerDate',
        type: "string"
    }, {
        name: 'content',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var subscriberStore = Ext.create('Ext.data.Store', {
    storeId: 'subscriberStore',
    model: 'subscriberInfo',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/esb-gather/subscriber/getSubscribers',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
});
subscriberStore.load();
