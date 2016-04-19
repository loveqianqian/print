var dataViewOperation = {
    addDataView: function () {
        var window = Ext.getCmp("addDataViewWindow");
        if (window) {
            Ext.getCmp("addDataViewWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addDataViewWindow',
                title: '视图添加',
                height: 500,
                width: 600,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/dataview/addDataView',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '视图名',
                        name: 'dataViewName',
                        allowBlank: false
                    }, {
                        fieldLabel: '中间表名',
                        name: 'midTableName',
                        allowBlank: false
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        anchor: '100%',
                        fieldLabel: '视图查询语句',
                        name: 'querySql',
                        allowBlank: false
                        // lose validate
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '视图类型',
                        name: 'viewType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                "type": "1",
                                "name": "基础数据"
                            }, {
                                "type": "2",
                                "name": "业务数据"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
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
                            inputValue: 'true',
                            id: 'radio1',
                            checked: true
                        }, {
                            boxLabel: '停用',
                            name: 'status',
                            inputValue: 'false',
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
                                            "视图信息注册成功!");
                                        dataViewStore.reload();
                                        // this.up('form').getForm().reset();
                                        form.reset();
                                        Ext
                                            .getCmp("addDataViewWindow")
                                            .hide();
                                    },
                                    failure: function (form,
                                                       action) {
                                        Ext.Msg.alert('注册失败',
                                            "视图信息注册失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
        }
    },

    updateDataView: function () {
        var row = Ext.getCmp("dataViewGird").getSelectionModel().selected.items;
        var data = row[0].data;
        var window = Ext.getCmp("updateDataViewWindow");
        if (window) {
            Ext.getCmp("updateDataViewForm").getForm().setValues(data);
            Ext.getCmp("updateDataViewWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateDataViewWindow',
                title: '视图添加',
                height: 500,
                width: 600,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id: 'updateDataViewForm',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/dataview/updateDataView',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '主键',
                        name: 'id',
                        hidden: true
                    }, {
                        fieldLabel: '视图名',
                        readOnly: true,
                        name: 'dataViewName',
                        allowBlank: false
                    }, {
                        fieldLabel: '中间表名',
                        name: 'midTableName',
                        allowBlank: false
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        anchor: '100%',
                        fieldLabel: '视图查询语句',
                        name: 'querySql',
                        allowBlank: false
                        // lose validate
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '视图类型',
                        name: 'viewType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                "type": "1",
                                "name": "基础数据"
                            }, {
                                "type": "2",
                                "name": "业务数据"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
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
                            inputValue: '1',
                            id: 'radio1',
                            checked: true
                        }, {
                            boxLabel: '停用',
                            name: 'status',
                            inputValue: '2',
                            id: 'radio2'
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
                                        Ext.Msg.alert('操作结果', "视图信息修改成功!");
                                        dataViewStore.reload();
                                        form.reset();
                                        Ext.getCmp("updateDataViewWindow").hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('操作结果', "视图信息修改失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
            Ext.getCmp("updateDataViewForm").getForm().setValues(data);
        }
    }
};

var detailOperation = {
    createWindow: function (dataview) {
        detailStore.load({
            params: {
                dataViewId: dataview['id']
            }
        });
        var itemLimit = 1;
        var win = Ext.getCmp("detailWindow");
        if (!win) {
            win = Ext.create('Ext.window.Window', {
                id: 'detailWindow',
                title: dataview['dataViewName'] + '视图字段明细',
                width: 850,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                viewConfig: {
                    forceFit: true
                },
                items: [{
                    border: false,
                    id: "detailGird",
                    xtype: 'grid',
                    store: Ext.data.StoreManager.lookup('detailStore'),
                    columns: [new Ext.grid.RowNumberer(), {
                        text: '主键',
                        dataIndex: 'id',
                        hidden: true
                    }, {
                        text: '所属视图id',
                        sortable: true,
                        hidden: true,
                        dataIndex: 'dataViewId'
                    }, {
                        text: "字段",
                        sortable: true,
                        width: 200,
                        dataIndex: 'property'
                    }, {
                        text: "字段名称",
                        width: 200,
                        sortable: true,
                        dataIndex: 'propertyName'
                    }, {
                        text: "别名",
                        width: 200,
                        sortable: true,
                        dataIndex: 'alias'
                    }, {
                        text: "字段类型",
                        sortable: true,
                        width: 200,
                        dataIndex: 'propertyType',
                        renderer: function (val) {
                            if (val == '1') {
                                return "一级属性";
                            } else {
                                return "二级属性";
                            }
                        }

                    }]
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一行记录',
                    iconCls: 'add',
                    handler: function () {
                        detailOperation.addDetail();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前记录',
                    iconCls: 'option',
                    handler: function () {

                        var row = Ext.getCmp("detailGird")
                            .getSelectionModel().selected.items
                        if (row.length) {
                            detailOperation.updateDetail();
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

                        var row = Ext.getCmp("detailGird")
                            .getSelectionModel().selected.items
                        if (row.length) {
                            detailOperation.deleteDetail();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }, '-', {
                    text: '刷新',
                    tooltip: '刷新',
                    iconCls: 'refresh',
                    handler: function () {
                        detailStore.load({
                            params: {
                                dataViewId: dataview['id']
                            }
                        })
                    }
                }]
            });
        }
        return win;
    },

    addDetail: function () {
        var row = Ext.getCmp("dataViewGird").getSelectionModel().selected.items;
        var data = row[0].data;
        var window = Ext.getCmp("addDetailWindow");
        if (window) {
            Ext.getCmp("addDetailWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addDetailWindow',
                title: '明细添加',
                height: 350,
                width: 600,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/detail/addDetail',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: '所属视图',
                        name: 'dataViewId',
                        store: dataViewStore,
                        queryMode: 'remote',
                        readOnly: true,
                        displayField: 'dataViewName',
                        valueField: 'id',
                        value: data['id'],
                        allowBlank: false
                    }, {
                        fieldLabel: '字段',
                        name: 'property',
                        allowBlank: false
                    }, {
                        fieldLabel: '字段名',
                        name: 'propertyName',
                        allowBlank: false
                    }, {
                        fieldLabel: '别名',
                        name: 'alias',
                        allowBlank: false
                    }, {
                        fieldLabel: '字段类型',
                        name: 'propertyType',
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                "type": "1",
                                "name": "一级属性"
                            }, {
                                "type": "2",
                                "name": "二级属性"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
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
                                        Ext.Msg
                                            .alert('注册成功',
                                            "信息注册成功!");
                                        detailStore.reload({
                                            params: {
                                                dataViewId: data['id']
                                            }
                                        });
                                        // this.up('form').getForm().reset();
                                        form.reset();
                                        Ext.getCmp("addDetailWindow")
                                            .hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg
                                            .alert('注册失败',
                                            "信息注册失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
        }
    },

    updateDetail: function () {
        var window = Ext.getCmp("updateDetailWindow");
        var row = Ext.getCmp("detailGird").getSelectionModel().selected.items;
        var data = row[0].data;
        if (window) {
            Ext.getCmp("updateDetailWindow").show();
            Ext.getCmp("updateDetailForm").getForm().setValues(data);
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateDetailWindow',
                title: '信息修改',
                height: 350,
                width: 600,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id: 'updateDetailForm',
                    bodyPadding: 5,
                    width: 350,
                    url: '/esb-gather/detail/updateDetail',
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
                        xtype: 'combobox',
                        fieldLabel: '所属视图',
                        name: 'dataViewId',
                        store: dataViewStore,
                        readOnly: true,
                        queryMode: 'remote',
                        displayField: 'dataViewName',
                        valueField: 'id',
                        allowBlank: false
                    }, {
                        fieldLabel: '字段',
                        readOnly: true,
                        name: 'property',
                        allowBlank: false
                    }, {
                        fieldLabel: '字段名',
                        name: 'propertyName',
                        allowBlank: false
                    }, {
                        fieldLabel: '别名',
                        name: 'alias',
                        allowBlank: false
                    }, {
                        fieldLabel: '字段类型',
                        name: 'propertyType',
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type', 'name'],
                            data: [{
                                "type": "1",
                                "name": "一级属性"
                            }, {
                                "type": "2",
                                "name": "二级属性"
                            }]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        queryMode: 'local',
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
                                        Ext.Msg.alert('操作结果', "信息修改成功!");
                                        var row = Ext.getCmp("dataViewGird").getSelectionModel().selected.items;
                                        var id = row[0].data['id'];
                                        detailStore.reload({
                                            params: {
                                                dataViewId: id
                                            }
                                        });
                                        form.reset();
                                        Ext.getCmp("updateDetailWindow").hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('操作结果', "信息修改失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
            Ext.getCmp("updateDetailForm").getForm().setValues(data);
        }
    },
    deleteDetail: function () {
        Ext.MessageBox.confirm('', '您确定要删除吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("detailGird").getSelectionModel().selected.items;
                var id = row[0].data['id'];

                Ext.Ajax.request({
                    url: '/esb-gather/detail/deleteDetail',
                    params: {
                        id: id
                    },
                    success: function (response) {
                        var text = response.responseText;
                        detailStore.remove(row[0]);
                    }
                });
            }
        });

    }
};

Ext.define('MyDesktop.DataViewWindow', {

    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id: 'dataViewWindow',

    init: function () {
        this.launcher = {
            text: '视图管理',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        var itemLimit = 1;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('blockalanche');
        if (!win) {
            win = desktop.createWindow({
                id: 'dataViewWindow',
                title: '视图管理',
                width: 1000,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                viewConfig: {
                    forceFit: true
                },
                items: [{
                    border: false,
                    id: "dataViewGird",
                    xtype: 'grid',
                    store: Ext.data.StoreManager.lookup('dataViewStore'),
                    columns: [new Ext.grid.RowNumberer(),
                        {
                            text: '主键',
                            dataIndex: 'id',
                            hidden: true
                        }, {
                            text: "视图名",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'dataViewName'
                        }, {
                            text: "中间表名",
                            width: 120,
                            sortable: true,
                            dataIndex: 'midTableName'
                        }, {
                            text: "简介",
                            width: 120,
                            sortable: true,
                            dataIndex: 'content'
                        }, {
                            text: "视图类型",
                            width: 120,
                            sortable: true,
                            dataIndex: 'viewType',
                            renderer: function (val) {
                                if (val == '1') {
                                    return "基础数据";
                                } else {
                                    return "业务数据";
                                }
                            }
                        }, {
                            text: "查询语句",
                            width: 120,
                            sortable: true,
                            dataIndex: 'querySql',
                            hidden: true
                        }, {
                            text: "状态",
                            width: 200,
                            sortable: true,
                            dataIndex: 'status',
                            renderer: function (val) {
                                if (val == 'true') {
                                    return "可用";
                                } else {
                                    return "停用";
                                }
                            }
                        }],
                    listeners: {
                        dblclick: {
                            element: 'el',
                            fn: function () {
                                var row = Ext.getCmp("dataViewGird").getSelectionModel().selected.items;
                                var data = row[0].data;
                                detailOperation.createWindow(data).show();
                            }
                        }
                    }
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一行记录',
                    iconCls: 'add',
                    handler: function () {
                        dataViewOperation.addDataView();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前记录',
                    iconCls: 'option',
                    handler: function () {

                        var row = Ext.getCmp("dataViewGird").getSelectionModel().selected.items;
                        if (row.length) {
                            dataViewOperation.updateDataView();
                        } else {
                            Ext.Msg.alert('', "需要选中一条记录!");
                            return;
                        }
                    }
                }, {
                    text: '刷新',
                    tooltip: '刷新列表',
                    iconCls: 'refresh',
                    handler: function () {
                        dataViewStore.reload();
                    }
                }, '-', {
                    text: '视图字段配置',
                    tooltip: '视图字段配置',
                    iconCls: 'option',
                    handler: function () {
                        var row = Ext.getCmp("dataViewGird").getSelectionModel().selected.items;
                        if (row.length) {
                            var data = row[0].data;
                            detailOperation.createWindow(data).show();
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

Ext.define('DataViewInfo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'dataViewName',
        type: 'string'
    }, {
        name: 'midTableName',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'querySql',
        type: 'string'
    }, {
        name: 'content',
        type: 'string'
    }, {
        name: 'viewType',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var dataViewStore = Ext.create('Ext.data.Store', {
    storeId: 'dataViewStore',
    model: 'DataViewInfo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/esb-gather/dataview/getDataViews',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
});

Ext.define('detail', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'dataViewId',
        type: 'string'
    }, {
        name: 'property',
        type: 'string'
    }, {
        name: 'propertyType',
        type: 'string'
    }, {
        name: 'propertyName',
        type: 'string'
    }, {
        name: 'alias',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var detailStore = Ext.create('Ext.data.Store', {
    storeId: 'detailStore',
    model: 'detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/esb-gather/detail/getDetails',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
});
