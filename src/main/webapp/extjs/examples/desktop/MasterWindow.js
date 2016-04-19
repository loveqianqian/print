Ext.define('MyDesktop.MasterWindow', {

    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id: 'masterWindow',

    init: function () {
        this.launcher = {
            text: '分类',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        var itemLimit = 1;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('blockalanche');
        if (!win) {
            win = desktop.createWindow({
                id: 'masterWindow',
                title: '分类管理',
                width: 500,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse: true,
                constrainHeader: true,
                layout: 'fit',
                viewConfig: {
                    forceFit: true
                },
                items: [{
                    border: false,
                    id: "masterGird",
                    xtype: 'grid',
                    store: Ext.data.StoreManager.lookup('masterStore'),
                    columns: [new Ext.grid.RowNumberer(),
                        {
                            text: '主键',
                            dataIndex: 'id',
                            sortable: true,
                            flex: 1,
                            hidden: true
                        }, {
                            text: "分类名",
                            sortable: true,
                            flex: 2,
                            dataIndex: 'name'
                        }],
                    listeners: {
                        scope:this,
                        dblclick: {
                            element: 'el',
                            fn: function () {
                                masterDataOperation.updateMasterView();
                            }
                        }
                    }
                }],
                tbar: [{
                    text: '增加',
                    tooltip: '添加一个分类',
                    iconCls: 'add',
                    handler: function () {
                        masterDataOperation.addMasterView();
                    }
                }, '-', {
                    text: '修改',
                    tooltip: '修改当前分类',
                    iconCls: 'option',
                    handler: function () {

                        var row = Ext.getCmp("masterGird").getSelectionModel().selected.items;
                        if (row.length) {
                            masterDataOperation.updateMasterView();
                        } else {
                            Ext.Msg.alert('', "需要选中一条分类!");
                            return;
                        }
                    }
                }, '-', {
                    text: '删除',
                    tooltip: '删除当前分类',
                    iconCls: 'remove',
                    handler: function () {
                        var row = Ext.getCmp("masterGird").getSelectionModel().selected.items;
                        if (row.length) {
                            masterDataOperation.deleteMasterView();
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
                        masterStore.reload();
                    }
                }]
            });
        }
        return win;
    }

});

var masterDataOperation = {
    addMasterView: function () {
        var window = Ext.getCmp("addMasterWindow");
        if (window) {
            Ext.getCmp("addMasterView").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'addMasterView',
                title: '增加分类',
                height: 300,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    bodyPadding: 5,
                    width: 300,
                    url: '/print/construct/addMaster',
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
                                        masterStore.reload();
                                        form.reset();
                                        Ext.getCmp("addMasterView").hide();
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

    updateMasterView: function () {
        var row = Ext.getCmp("masterGird").getSelectionModel().getSelection();
        var data = row[0].data;
        var window = Ext.getCmp("updateMasterView");
        if (window) {
            Ext.getCmp("updateMasterForm").getForm().setValues(data);
            Ext.getCmp("updateMasterWindow").show();
        } else {
            Ext.create('Ext.window.Window', {
                id: 'updateMasterWindow',
                title: '修改分类',
                height: 300,
                width: 400,
                layout: 'fit',
                iconCls: 'icon-grid',
                animCollapse: true,
                constrainHeader: true,
                items: {
                    xtype: 'form',
                    id: 'updateMasterForm',
                    bodyPadding: 5,
                    width: 300,
                    url: '/print/construct/updateMaster',
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
                                        masterStore.reload();
                                        form.reset();
                                        Ext.getCmp("updateMasterWindow").hide();
                                        Ext.getCmp("masterGird").getSelectionModel().deselectAll();
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
            Ext.getCmp("updateMasterForm").getForm().setValues(data);
        }
    },
    deleteMasterView: function () {
        Ext.MessageBox.confirm('', '您确定要删除吗?', function (opt) {
            if (opt == 'yes') {
                var row = Ext.getCmp("masterGird").getSelectionModel().selected.items;
                var id = row[0].data['id'];
                Ext.Ajax.request({
                    url: '/print/construct/deleteMaster',
                    params: {
                        id: id
                    },
                    success: function (response) {
                        var text = response.responseText;
                        subDataStore.remove(row[0]);
                        masterStore.reload();
                    }
                });
            }
        });

    }
};

Ext.define('MasterInfo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]

});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var masterStore = Ext.create('Ext.data.Store', {
    storeId: 'masterStore',
    model: 'MasterInfo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/print/construct/getMaster',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
});
