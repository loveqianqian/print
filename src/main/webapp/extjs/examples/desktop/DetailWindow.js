Ext.define('MyDesktop.DetailWindow', {

    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id: 'detailWindow',

    init: function () {
        this.launcher = {
            text: '工作',
            iconCls: 'detailWindow'
        };
    },

    createWindow: function () {
        var itemLimit = 1;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('blockalanche');
        if (!win) {
            win = desktop.createWindow({
                id: 'detailWindow',
                title: '工作管理',
                width: 1000,
                height: 500,
                iconCls: 'detailWindow',
                animCollapse: true,
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
                    columns: [new Ext.grid.RowNumberer(),
                        {
                            text: '主键',
                            dataIndex: 'id',
                            sortable: true,
                            flex: 1,
                            hidden: true
                        }, {
                            text: "工作名",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'name'
                        }, {
                            text: "分类id",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'sortId',
                            hidden: true
                        }, {
                            text: "分类名",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'sortName'
                        }, {
                            text: "成本",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'prince',
                            hidden: true
                        }, {
                            text: "成本单位",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'unit',
                            hidden: true
                        }, {
                            text: "售价",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'prince2'
                        }, {
                            text: "售价单位",
                            sortable: true,
                            flex: 1,
                            dataIndex: 'unit2'
                        }],
                    listeners: {
                        scope:this,
                        dblclick: {
                            element: 'el',
                            fn: function () {
                                detailDataOperation.updateDetailView();
                            }
                        }
                    }
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一个工作',
                    iconCls: 'add',
                    handler: function () {
                        detailDataOperation.addDetailView();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前工作',
                    iconCls: 'option',
                    handler: function () {

                        var row = Ext.getCmp("detailGird").getSelectionModel().selected.items;
                        if (row.length) {
                            detailDataOperation.updateDetailView();
                        } else {
                            Ext.Msg.alert('', "需要选中一条分类!");
                            return;
                        }
                    }
                }, '-', {
                    text: '删除',
                    tooltip: '删除当前工作',
                    iconCls: 'remove',
                    handler: function () {
                        var row = Ext.getCmp("detailGird").getSelectionModel().selected.items;
                        if (row.length) {
                            detailDataOperation.deleteDetailView();
                        } else {
                            Ext.Msg.alert('', "需要选中一条分类!");
                            return;
                        }
                    }
                }, {
                    text: '刷新',
                    tooltip: '刷新列表',
                    iconCls: 'refresh',
                    handler: function () {
                        detailStore.reload();
                    }
                }]
            });
        }
        return win;
    }

});

var detailDataOperation = {
    addDetailView: function () {
        var window = Ext.getCmp("addDetailWindow");
        if (window) {
            Ext.getCmp("addDetailView").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addDetailView',
                title: '增加分类',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 300,
                    url: '/print/construct/adddetail',
                    params: {
                        name: 'name'
                    },
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '分类名',
                        name: 'name',
                        allowBlank: false
                    }],
                    buttons: [{
                        text: '重置分类信息',
                        handler: function () {
                            this.up('form').getForm().reset();
                        }
                    }, {
                        text: '提交分类信息',
                        formBind: true,
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    success: function (form, action) {
                                        Ext.Msg.alert('添加成功', "分类添加成功!");
                                        detailStore.reload();
                                        form.reset();
                                        Ext.getCmp("addDetailView").hide();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('添加失败', "分类添加失败!");
                                    }
                                });
                            }
                        }
                    }]
                }
            }).show();
        }
    },

    updateDetailView: function () {
        var row = Ext.getCmp("detailGird").getSelectionModel().getSelection();
        var data = row[0].data;
        var window = Ext.getCmp("updateDetailView");
        if (window) {
            Ext.getCmp("updateDetailForm").getForm().setValues(data);
            Ext.getCmp("updateDetailWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateDetailWindow',
                title: '修改分类',
                height: 300,
                width: 400,
                layout: 'fit',
                iconCls: 'icon-grid',
                animCollapse: true,
                constrainHeader: true,
                items: {
                    xtype: 'form',
                    id: 'updateDetailForm',
                    bodyPadding: 5,
                    width: 300,
                    url: '/print/construct/updateDetail',
                    params: {
                        id: 'id',
                        name: 'name'
                    },
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'id号',
                        name: 'id',
                        readOnly: true,
                        hidden: true
                    }, {
                        fieldLabel: '分类名',
                        readOnly: false,
                        name: 'name',
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
                                        Ext.Msg.alert('修改分类', "分类修改成功!");
                                        detailStore.reload();
                                        form.reset();
                                        Ext.getCmp("updateDetailWindow").hide();
                                        Ext.getCmp("detailGird").getSelectionModel().deselectAll();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('修改分类', "分类修改失败!");
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
    deleteDetailView: function () {
        Ext.MessageBox.confirm('', '您确定要删除吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("detailGird").getSelectionModel().selected.items;
                var id = row[0].data['id'];
                var sortId = row[0].data['sortId'];
                Ext.Ajax.request({
                    url: '/print/construct/deleteDetail',
                    params: {
                        id: id,
                        sortId:sortId
                    },
                    success: function (response) {
                        var text = response.responseText;
                        subDataStore.remove(row[0]);
                        detailStore.reload();
                    }
                });
            }
        });

    }
};

Ext.define('detailInfo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'sortId',
        type: 'int'
    }, {
        name: 'sortName',
        type: 'string'
    }, {
        name: 'prince',
        type: 'float'
    }, {
        name: 'unit',
        type: 'string'
    }, {
        name: 'prince2',
        type: 'float'
    }, {
        name: 'unit2',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var detailStore = Ext.create('Ext.data.Store', {
    storeId: 'detailStore',
    model: 'detailInfo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/print/construct/getDetail',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
});
