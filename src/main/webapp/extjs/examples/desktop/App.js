/*
 * ! Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.MasterWindow',
        'MyDesktop.ProcedureGrid',
        'MyDesktop.MsgRegisterWindow',
        'MyDesktop.TransactionServerGrid',
        'MyDesktop.LogGrid',
        'MyDesktop.DetailWindow',
        'MyDesktop.SubscriberWindow',
        'MyDesktop.MessageLogGrid',
        'MyDesktop.DataQueryServerGrid',
        'MyDesktop.DataQueryGrid',
        'MyDesktop.ErrMsgLogGrid',
        'MyDesktop.AccessControlList',
        'MyDesktop.AppRegister',
        'MyDesktop.SystemStatus',
        'MyDesktop.GatherMonitorGrid',
        'MyDesktop.Settings'
    ],

    init: function () {
        // custom logic before getXYZ methods get called...
        this.callParent();
        // now ready...
    },

    getModules: function () {
        return [
            new MyDesktop.SubscriberWindow(),
            new MyDesktop.GatherMonitorGrid(),
            new MyDesktop.ProcedureGrid(),
            new MyDesktop.TransactionServerGrid(),
            new MyDesktop.MasterWindow(),
            new MyDesktop.DetailWindow(),
            new MyDesktop.MessageLogGrid(),
            new MyDesktop.LogGrid(),
            new MyDesktop.DataQueryGrid(),
            new MyDesktop.ErrMsgLogGrid(),
            new MyDesktop.AccessControlList(),
            new MyDesktop.DataQueryServerGrid(),
            new MyDesktop.MsgRegisterWindow(),
            new MyDesktop.AppRegister(),
            new MyDesktop.SystemStatus()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            // cls: 'ux-desktop-black',

            contextMenuItems: [{
                text: '修改壁纸',
                handler: me.onSettings,
                scope: me
            }],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [{
                    name: '分类管理',
                    iconCls: 'masterWindow',
                    module: 'masterWindow'
                }, {
                    name: '工作管理',
                    iconCls: 'detailWindow',
                    module: 'detailWindow'
                }, {
                    name: '订阅系统管理',
                    iconCls: 'subscriberWindow',
                    module: 'subscriberWindow'
                }, {
                    name: '视图订阅管理',
                    iconCls: 'subdataWindow',
                    module: 'subdataWindow'
                }, {
                    name: '数据采集监控',
                    iconCls: 'gatherMonitorList',
                    module: 'gatherMonitorList'
                }, {
                    name: '传输日志记录',
                    iconCls: 'logList',
                    module: 'logList'
                }, {
                    name: '报文日志',
                    iconCls: 'msgLogList',
                    module: 'msgLogList'
                }, {
                    name: '存储过程管理',
                    iconCls: 'procedureWindow',
                    module: 'procedureWindow'
                }, {
                    name: '存储过程调用管理',
                    iconCls: 'procedureInvokeWindow',
                    module: 'transServerWindow'
                }, {
                    name: '数据查询视图列表',
                    iconCls: 'dataQueryWindow',
                    module: 'dataQueryWindow'
                }, {
                    name: '数据查询服务管理',
                    iconCls: 'dataServerWindow',
                    module: 'dataServerWindow'
                }, {
                    name: '异常报文',
                    iconCls: 'errMsgLogList',
                    module: 'errMsgLogList'
                }, {
                    name: '权限访问',
                    iconCls: 'accCtlList',
                    module: 'accCtlList'
                }, {
                    name: '报文服务注册',
                    iconCls: 'msgRegister',
                    module: 'msgRegister'
                }, {
                    name: '应用系统注册',
                    iconCls: 'dataQueryServerWindow',
                    module: 'appRegister'
                }, {
                    name: '系统状态',
                    iconCls: 'cpu-shortcut',
                    module: 'systemstatus'
                }
                ]
            }),

            wallpaper: 'wallpapers/test.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig: function () {

        var me = this, ret = me.callParent();
        return Ext.apply(ret, {
            title: 'administrator',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [{
                    text: '修改背景桌面',
                    iconCls: 'settings',
                    handler: me.onSettings,
                    scope: me
                }, '-', {
                    text: '注销',
                    iconCls: 'logout',
                    handler: me.onLogout,
                    scope: me
                }]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [{
                name: '视图管理',
                iconCls: 'dataViewWindow',
                module: 'dataViewWindow'
            }, {
                name: '订阅系统管理',
                iconCls: 'subscriberWindow',
                module: 'subscriberWindow'
            }, {
                name: '视图订阅管理',
                iconCls: 'subdataWindow',
                module: 'subdataWindow'
            }, {
                name: '数据采集监控',
                iconCls: 'gatherMonitorList',
                module: 'gatherMonitorList'
            }, {
                name: '传输日志记录',
                iconCls: 'logList',
                module: 'logList'
            }, {
                name: '报文日志',
                iconCls: 'msgLogList',
                module: 'msgLogList'
            }, {
                name: '存储过程管理',
                iconCls: 'procedureWindow',
                module: 'procedureWindow'
            }, {
                name: '存储过程调用管理',
                iconCls: 'procedureInvokeWindow',
                module: 'transServerWindow'
            }, {
                name: '数据查询视图列表',
                iconCls: 'dataQueryWindow',
                module: 'dataQueryWindow'
            }, {
                name: '数据查询服务管理',
                iconCls: 'dataQueryServerWindow',
                module: 'dataServerWindow'
            }, {
                name: '异常报文',
                iconCls: 'dataQueryServerWindow',
                module: 'errMsgLogList'
            }, {
                name: '报文服务注册',
                iconCls: 'dataQueryServerWindow',
                module: 'msgRegister'
            }, {
                name: '应用系统注册',
                iconCls: 'dataQueryServerWindow',
                module: 'appRegister'
            }, {
                name: '系统状态',
                iconCls: 'cpu-shortcut',
                module: 'systemstatus'
            }],
            trayItems: [{
                xtype: 'trayclock',
                flex: 1
            }]
        });
    },

    onLogout: function () {
        window.location.reload();
        Ext.getCmp("password").setValue("");
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});

Ext.onReady(function () {
    var formPanel = new Ext.FormPanel({
        id: 'vali',
        labelWidth: 75, // label settings here cascade
        // unless overridden
        frame: true,
        baseCls: '',
        bodyStyle: 'padding:5px 5px 0',
        width: 350,
        defaults: {
            width: 300
        },
        defaultType: 'textfield',
        items: [{
            xtype: 'textfield',
            id: 'username',
            name: 'username',
            fieldCls: 'login_account',
            fieldLabel: '账  号  ',
            width: 300,
            margin: '10,10,10,10',
            labelAlign: 'right'
        }, {
            xtype: "textfield",
            id: 'password',
            name: 'password',
            fieldCls: 'login_password',
            width: 300,
            fieldLabel: '密  码  ',
            margin: '10,10,10,10',
            labelAlign: 'right',
            inputType: 'password'
        }]
    });
    var win = new Ext.Window({
        id: 'loginwindow',
        title: '请登录',
        width: 380,
        autoHeight: 'true',
        resizable: false,
        modal: true,
        closable: false, // 是否显示关闭窗口按钮
        closeAction: 'hide',
        buttonAlign: 'center',
        items: formPanel,
        buttons: [{
            text: '确定',
            handler: function () {
                var _username = Ext.getCmp('username').getValue();
                var _password = Ext.getCmp('password').getValue();

                if (_username == "") {
                    Ext.Msg.alert("提示", "用户名不能为空，请输入用户名");
                } else if (_password == "") {
                    Ext.Msg.alert("提示", "密码不能为空，请输入用户名");
                } else {
                    // 掩饰层
                    // (遮罩效果)
                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                        msg: "正在登陆，请稍后..."
                    });
                    myMask.show();

                    Ext.Ajax.request({
                        url: '/esb-gather/user/userLogin',
                        method: 'POST',
                        success: function (response, opts) {
                            var sf = Ext.JSON.decode(response.responseText);
                            if (sf.result == 'success') {
                                myMask.hide();
                                Ext.getCmp("loginwindow").hide();
                            } else {
                                myMask.hide();
                                Ext.Msg.alert("提示", "登陆失败...");
                            }
                        },
                        failure: function (response, opts) {
                            myMask.hide();
                            Ext.Msg.alert("提示", "登陆失败");
                        },
                        params: {
                            username: _username,
                            passwrod: _password
                        }
                    })
                }
            }

        }, {
            text: '重置',
            handler: function () {
                Ext.getCmp('username').setValue("");
                Ext.getCmp('password').setValue("");
            }
        }]
    });

    //win.show();
})
