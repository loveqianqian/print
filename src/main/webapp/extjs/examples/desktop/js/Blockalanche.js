var appAddBt = Ext.create('Ext.Button', {
			id : 'addApp',
			text : '添加',
			tooltip : '添加应用系统信息',
			iconCls : 'add',
			handler : function() {
			}
		});

var appModifyBt = Ext.create('Ext.Button', {
			text : '修改',
			tooltip : 'Modify options',
			iconCls : 'option',
			handler : function() {
				alert('You clicked the button!');
			}
		});

var appRemoveBt = Ext.create('Ext.Button', {
			text : '删除',
			tooltip : 'Remove the selected item',
			iconCls : 'remove',
			handler : function() {
				alert('You clicked the button!');
			}
		});

var fresh = Ext.create('Ext.Button', {
			text : '刷新',
			tooltip : 'Remove the selected item',
			iconCls : 'refresh',
			handler : function() {
				store.reload();
			}
		});

Ext.define('MyDesktop.Blockalanche', {
			extend : 'Ext.ux.desktop.Module',

			requires : ['Ext.data.ArrayStore', 'Ext.util.Format',
					'Ext.grid.Panel', 'Ext.grid.RowNumberer'],

			id : 'blockalanche',

			init : function() {
				this.launcher = {
					text : 'Grid Window',
					iconCls : 'icon-grid'
				};
			},

			createWindow : function() {
				var desktop = this.app.getDesktop();
				var win = desktop.getWindow('blockalanche');
				if (!win) {
					win = desktop.createWindow({
								id : 'blockalanche',
								title : '应用服务系统管理',
								width : 740,
								height : 480,
								iconCls : 'icon-grid',
								animCollapse : false,
								constrainHeader : true,
								layout : 'fit',
								items : [{
									border : false,
									xtype : 'grid',
									store : Ext.data.StoreManager
											.lookup('simpsonsStore'),
									columns : [new Ext.grid.RowNumberer(), {
												text : "应用服务编号",
												flex : 1,
												sortable : true,
												dataIndex : 'sysCode'
											}, {
												text : "应用服务名称",

												sortable : true,
												dataIndex : 'name'
											}, {
												text : "IP地址",

												sortable : true,
												dataIndex : 'ipAddress'
											}, {
												text : "通道标识",

												sortable : true,
												dataIndex : 'channelFlag'
											}, {
												text : "应答队列",

												sortable : true,
												dataIndex : 'replyQueue'
											}, {
												text : "注册时间",

												sortable : true,
												dataIndex : 'registerDate'
											}, {
												text : "状态",

												sortable : true,
												dataIndex : 'status'
											}]
								}],
								tbar : [appAddBt, '-', appModifyBt, '-',
										appRemoveBt, fresh]
							});
				}
				return win;
			}

		});

Ext.define('AppInfo', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'sysCode',
						type : 'string'
					}, {
						name : 'name',
						type : 'string'
					}, {
						name : 'ipAddress',
						type : 'string'
					}, {
						name : 'channelFlag',
						type : 'string'
					}, {
						name : 'replyQueue',
						type : 'string'
					}, {
						name : 'content',
						type : 'string'
					}, {
						name : 'registerDate',
						type : 'string'
					}, {
						name : 'status',
						type : 'string'
					}]

		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.
var store = Ext.create('Ext.data.Store', {
			storeId : 'simpsonsStore',
			model : 'AppInfo',
			proxy : {
				type : 'ajax',
				url : '/esb-server/applicationList'
			}
		});

store.load();
