var itemsPerPage = 15;

var acsOperation = {
	addAcs : function() {
		var window = Ext.getCmp("addAcsWindow");
		if (window) {
			Ext.getCmp("addAcsWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addAcsWindow',
				title : '应用服务注册',
				height : 300,
				width : 400,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/acs/addAccControl',
					layout : 'anchor',
					defaults : {
						anchor : '90%'
					},
					defaultType : 'textfield',
					items : [{
								xtype : 'combobox',
								fieldLabel : '应用系统',
								name : 'appId',
								store : store,
								queryMode : 'remote',
								displayField : 'name',
								valueField : 'id',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '应用服务名称',
								name : 'msgId',
								store : Ext.create('Ext.data.Store', {
											model : 'message',
											autoLoad : false,
											pageSize : 3000,
											proxy : {
												type : 'ajax',
												url : '/esb-gather/msg/messageList',
												reader : {
													type : 'json',
													root : 'items',
													totalProperty : 'total'
												}
											}
										}),
								displayField : 'msgName',
								valueField : 'id',
								queryMode : 'remote',
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
											boxLabel : '授权',
											name : 'status',
											inputValue : '1',
											id : 'radio1',
											checked : true
										}, {
											boxLabel : '取消授权',
											name : 'status',
											inputValue : '0',
											id : 'radio2'
										}]
							}],
					buttons : [{
								text : '重置授权信息',
								handler : function() {
									this.up('form').getForm().reset();
								}
							}, {
								text : '提交授权信息',
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
														Ext.Msg
																.alert('操作成功',
																		"应用系统授权信息添加成功!");
														acsStore.reload();
														form.reset();
														Ext
																.getCmp("addMsgWindow")
																.hide();
													},
													failure : function(form,
															action) {
														Ext.Msg
																.alert(
																		'操作失败',
																		action.result.msg);
													}
												});
									}
								}
							}]
				}
			}).show();

		}
	},
	updateAsc : function() {
		var row = Ext.getCmp("accessGrid").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateAscWindow");
		if (window) {
			Ext.getCmp("updateAscForm").getForm().setValues(data);
			Ext.getCmp("updateAscWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateAscWindow',
				title : '应用系统添加',
				height : 300,
				width : 400,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateAscForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/asc/updateControl',
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
								xtype : 'combobox',
								fieldLabel : '应用系统',
								name : 'appId',
								store : store,
								queryMode : 'remote',
								displayField : 'name',
								valueField : 'id',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '应用服务名称',
								name : 'msgId',
								store : messageStore,
								displayField : 'msgName',
								valueField : 'id',
								queryMode : 'remote',
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
											boxLabel : '授权',
											name : 'status',
											inputValue : '1',
											id : 'radio1',
											checked : true
										}, {
											boxLabel : '取消授权',
											name : 'status',
											inputValue : '0',
											id : 'radio2'
										}]
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
														"应用服务信息修改成功!");
												acsStore.reload();
												form.reset();
												Ext.getCmp("updateAscWindow")
														.hide();
											},
											failure : function(form, action) {
												Ext.Msg.alert('操作结果',
														action.result.msg);
											}
										});
							}
						}
					}]
				}
			}).show();
			Ext.getCmp("updateAscForm").getForm().setValues(data);
		}
	},
	deleteAcs : function() {
		Ext.MessageBox.confirm('', '您确定要删除吗?', function(opt) {
			if (opt == 'yes') {
				var row = Ext.getCmp("accessGrid").getSelectionModel().selected.items;
				var id = row[0].data['id'];

				Ext.Ajax.request({
							url : '/esb-gather/acs/deleteControl',
							params : {
								id : id
							},
							success : function(response) {
								var text = response.responseText;
								acsStore.remove(row[0]);
							}
						});
			}
		});

	}
}
Ext.define('MyDesktop.AccessControlList', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'accCtlList',

	init : function() {
		this.launcher = {
			text : 'AccCtrListWin',
			iconCls : 'icon-grid'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('accCtlList');
		if (!win) {
			win = desktop.createWindow({
						id : 'accCtlList',
						title : '应用服务系统管理',
						width : 1024,
						height : 600,
						iconCls : 'icon-grid',
						animCollapse : false,
						constrainHeader : true,
						layout : 'fit',
						items : [{
									border : false,
									id : "accessGrid",
									xtype : 'grid',
									store : Ext.data.StoreManager
											.lookup('acsStore'),
									columns : [new Ext.grid.RowNumberer(), {
												text : '主键',
												dataIndex : 'id',
												hidden : true
											}, {
												text : '系统ID',
												dataIndex : 'appId',
												hidden : true
											}, {
												text : '系统名称',
												dataIndex : 'appName',
												width : 200,
												sortable : true
											}, {
												text : "服务id",
												sortable : true,
												hidden : true,
												dataIndex : 'msgId'
											}, {
												text : "服务编号",
												sortable : true,
												width : 200,
												dataIndex : 'msgCode'
											}, {
												text : "应用服务名称",
												sortable : true,
												width : 250,
												dataIndex : 'msgName'
											}, {
												text : "授权时间",
												sortable : true,
												width : 200,
												dataIndex : 'licenseDate'
											}, {
												text : '状态',
												sortable : true,
												dataIndex : 'status',
												renderer : function(value) {
													if (value == '1') {
														return '允许访问';
													} else {
														return '不允许访问';
													}
												}
											}]
								}],
						tbar : [{
									text : '增加',
									tooltip : '添加一行记录',
									iconCls : 'add',
									handler : function() {
										acsOperation.addAcs();
									}
								}, '-', {
									text : '修改',
									tooltip : '修改当前记录',
									iconCls : 'option',
									handler : function() {

										var row = Ext.getCmp("accessGrid")
												.getSelectionModel().selected.items
										if (row.length) {
											acsOperation.updateAsc();
										} else {
											Ext.Msg.alert('', "需要选中一条记录!");
											return;
										}
									}
								}, '-', {
									text : '删除',
									tooltip : '删除选中的记录',
									iconCls : 'remove',
									handler : function() {

										var row = Ext.getCmp("accessGrid")
												.getSelectionModel().selected.items
										if (row.length) {
											acsOperation.deleteAcs();
										} else {
											Ext.Msg.alert('', "需要选中一条记录!");
											return;
										}
									}
								}],
						bbar : Ext.create('Ext.PagingToolbar', {
									store : acsStore,
									displayInfo : true,
									displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
									emptyMsg : "没有数据"
								})
					});
		}
		return win;
	}

});

Ext.define('acs', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'appId',
						type : 'string'
					}, {
						name : 'appName',
						type : 'string'
					}, {
						name : 'msgId',
						type : 'string'
					}, {
						name : 'msgCode',
						type : 'string'
					}, {
						name : 'msgName',
						type : 'string'
					}, {
						name : 'status',
						type : 'string'
					}, {
						name : 'licenseDate',
						type : 'string'
					}]
		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var acsStore = Ext.create('Ext.data.Store', {
			storeId : 'acsStore',
			model : 'acs',
			autoLoad : false,
			pageSize : itemsPerPage,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/acs/getControls',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			}
		});
acsStore.load({
			params : {
				start : 0,
				limit : itemsPerPage
			}
		});
