var itemsPerPage = 15;

var operation = {
	addApp : function() {
		var window = Ext.getCmp("addAppWindow");
		if (window) {
			Ext.getCmp("addAppWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addAppWindow',
				title : '应用系统添加',
				height : 300,
				width : 400,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/app/registerApp',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '服务系统编号',
								name : 'sysCode',
								allowBlank : false
							}, {
								fieldLabel : '应用服务名称',
								name : 'name',
								allowBlank : false
							}, {
								fieldLabel : 'IP地址',
								name : 'ipAddress',
								allowBlank : false
							}, {
								fieldLabel : '渠道标识',
								name : 'channelFlag',
								allowBlank : false
							}, {
								fieldLabel : '应答队列',
								name : 'replyQueue',
								allowBlank : false
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '状态',
								defaultType : 'radiofield',
								defaults : {
									flex : 1
								},
								layout : 'hbox',
								items : [{
											boxLabel : '可用',
											name : 'status',
											inputValue : '可用',
											id : 'radio1',
											checked : true
										}, {
											boxLabel : '停用',
											name : 'status',
											inputValue : '停用',
											id : 'radio2'
										}]
							}, {
								fieldLabel : '简介',
								name : 'content',
								allowBlank : false
							}],
					buttons : [{
								text : '重置注册信息',
								handler : function() {
									this.up('form').getForm().reset();
								}
							}, {
								text : '提交注册信息',
								formBind : true, // only enabled once the
								// form is
								// valid
								// disabled : true,
								handler : function() {
									var form = this.up('form').getForm();
									if (form.isValid()) {
										form.submit({
													success : function(form,
															action) {
														Ext.Msg.alert('注册成功',
																"应用系统信息注册成功!");
														store.reload();
														// this.up('form').getForm().reset();
														form.reset();
														Ext
																.getCmp("addAppWindow")
																.hide();
													},
													failure : function(form,
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

	updateApp : function() {
		var row = Ext.getCmp("appGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateAppWindow");
		if (window) {
			Ext.getCmp("updateAppForm").getForm().setValues(data);
			Ext.getCmp("updateAppWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateAppWindow',
				title : '应用系统添加',
				height : 300,
				width : 400,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateAppForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/app/updateApp',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '主键',
								name : 'id',
								allowBlank : false,
								readOnly : true,
								hidden : true
							}, {
								fieldLabel : '服务系统编号',
								name : 'sysCode',
								allowBlank : false,
								readOnly : true
							}, {
								fieldLabel : '服务系统名称',
								name : 'name',
								allowBlank : false,
								readOnly : true
							}, {
								fieldLabel : 'IP地址',
								name : 'ipAddress',
								allowBlank : false
							}, {
								fieldLabel : '渠道标识',
								name : 'channelFlag',
								allowBlank : false
							}, {
								fieldLabel : '应答队列',
								name : 'replyQueue',
								allowBlank : false
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '状态',
								defaultType : 'radiofield',
								defaults : {
									flex : 1
								},
								layout : 'hbox',
								items : [{
											boxLabel : '可用',
											name : 'status',
											inputValue : '可用',
											id : 'radio1',
											checked : true
										}, {
											boxLabel : '停用',
											name : 'status',
											inputValue : '停用',
											id : 'radio2'
										}, {
											boxLabel : '废弃',
											name : 'status',
											inputValue : '废弃',
											id : 'radio3'
										}]
							}, {
								fieldLabel : '简介',
								name : 'content',
								allowBlank : false
							}],
					buttons : [{
						text : '提交修改',
						formBind : true,
						handler : function() {
							var form = this.up('form').getForm();
							if (form.isValid()) {
								form.submit({
											success : function(form, action) {
												Ext.Msg.alert('操作结果',
														"应用系统信息修改成功!");
												store.reload();
												form.reset();
												Ext.getCmp("updateAppWindow")
														.hide();
											},
											failure : function(form, action) {
												Ext.Msg.alert('操作结果',
														"应用系统信息修改失败!");
											}
										});
							}
						}
					}]
				}
			}).show();
			Ext.getCmp("updateAppForm").getForm().setValues(data);
		}
	}
}

Ext.define('MyDesktop.AppRegister', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'appRegister',

	init : function() {
		this.launcher = {
			text : 'appRegister',
			iconCls : 'appRegister'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('appRegister');
		if (!win) {
			win = desktop.createWindow({
						id : 'appRegister',
						title : '应用服务系统管理',
						width : 1000,
						height : 480,
						iconCls : 'icon-grid',
						animCollapse : false,
						constrainHeader : true,
						layout : 'fit',
						viewConfig : {
							forceFit : true
						},
						items : [{
							border : false,
							id : "appGird",
							xtype : 'grid',
							store : Ext.data.StoreManager
									.lookup('simpsonsStore'),
							columns : [new Ext.grid.RowNumberer(), {
										text : '主键',
										dataIndex : 'id',
										hidden : true
									}, {
										text : "服务系统编号",
										sortable : true,
										flex : 1,
										dataIndex : 'sysCode'
									}, {
										text : "服务系统名称",
										width : 120,
										sortable : true,
										dataIndex : 'name'
									}, {
										text : "IP地址",
										width : 120,
										sortable : true,
										dataIndex : 'ipAddress'
									}, {
										text : "通道标识",
										width : 120,
										sortable : true,
										dataIndex : 'channelFlag'
									}, {
										text : "应答队列",
										width : 120,
										sortable : true,
										dataIndex : 'replyQueue'
									}, {
										text : "注册时间",
										width : 150,
										sortable : true,
										dataIndex : 'registerDate'
									}, {
										text : "状态",

										sortable : true,
										dataIndex : 'status'
									}, {
										text : "备注",
										sortable : true,
										width : 150,
										dataIndex : 'content'
									}]
						}],
						tbar : [{
									text : '增加',
									tooltip : '添加一行记录',
									iconCls : 'add',
									handler : function() {
										operation.addApp();
									}
								}, '-', {
									text : '修改',
									tooltip : '修改当前记录',
									iconCls : 'option',
									handler : function() {

										var row = Ext.getCmp("appGird")
												.getSelectionModel().selected.items
										if (row.length) {
											operation.updateApp();
										} else {
											Ext.Msg.alert('', "需要选中一条记录!");
											return;
										}
									}
								}],
						bbar : Ext.create('Ext.PagingToolbar', {
									store : store,
									displayInfo : true,
									displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
									emptyMsg : "没有数据"
								})
					});
		}
		return win;
	}

});

Ext.define('AppInfo', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
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
			autoLoad : false,
			pageSize : itemsPerPage,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/app/applicationList',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			}
		});
store.load({
			params : {
				start : 0,
				limit : itemsPerPage
			}
		});
