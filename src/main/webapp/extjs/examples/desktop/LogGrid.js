var logPerPage = 20;

var resendMsg = function() {
	Ext.MessageBox.confirm('', '您确定要重新发送报文吗?', function(opt) {
				if (opt == 'yes') {
					var row = Ext.getCmp("logGrid").getSelectionModel().selected.items;
					var data = row[0].data;
					Ext.Ajax.request({
								url : '/esb-gather/log/resendMsg',
								params : {
									message : data['message']
								},
								success : function(response, opts) {
									var obj = Ext.decode(response.responseText);
									if (obj.failure) {
										Ext.Msg.alert('操作结果', "重新发送失败！");
									} else {
										Ext.Msg.alert('操作结果', "重新发送成功!");
									}
								},
								failure : function(response, opts) {
									Ext.Msg.alert('操作结果', "操作失败，请核实是否出现异常");
								}
							});
				}
			});
}

Ext.define('MyDesktop.LogGrid', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'logList',

	init : function() {
		this.launcher = {
			text : '传输日志',
			iconCls : 'logList'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('logList');
		if (!win) {
			win = desktop.createWindow({
				id : 'logList',
				title : '传输日志记录',
				width : 1280,
				height : 500,
				iconCls : 'logList',
				animCollapse : false,
				constrainHeader : true,
				layout : 'fit',
				items : [{
					border : false,
					id : "logGrid",
					xtype : 'grid',
					store : Ext.data.StoreManager.lookup('logStore'),
					columns : [new Ext.grid.RowNumberer(), {
								text : '主键',
								dataIndex : 'id',
								hidden : true
							}, {
								text : '订阅系统',
								sortable : true,
								width : 100,
								dataIndex : 'subscriberName'
							}, {
								text : '视图名称',
								width : 180,
								dataIndex : 'dataViewName',
								sortable : true
							}, {
								text : "创建时间",
								sortable : true,
								width : 180,
								dataIndex : 'reportDate'
							}, {
								text : "发送时间",
								sortable : true,
								width : 180,
								dataIndex : 'sendDate'
							}, {
								text : "病人id",
								sortable : true,
								width : 180,
								hidden : true,
								dataIndex : 'patientId'
							}, {
								text : "报文序列号",
								sortable : true,
								width : 250,
								dataIndex : 'serial'
							}, {
								text : '发送结果',
								sortable : true,
								width : 180,
								dataIndex : 'sendResult',
								renderer : function(val) {
									if (val == "1") {
										return "完成";
									} else if (val == "0") {
										return "预发送";
									} else if (val == "-1") {
										return "失败 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img alt='' src='../shared/icons/fam/resendbt.png' style='width:50px;height:14px;cursor:pointer' onclick=resendMsg()>";
									}
								}
							}, {
								text : '报文',
								sortable : true,
								hidden : true,
								dataIndex : 'message'
							}],
					listeners : {
						dblclick : {
							element : 'el',
							fn : function() {
								var row = Ext.getCmp("logGrid")
										.getSelectionModel().selected.items;
								var data = row[0].data;
								var win = Ext.getCmp("detailWindow");
								if (!win) {
									Ext.create('Ext.window.Window', {
										id : 'detailWindow',
										title : '报文',
										height : 480,
										width : 800,
										layout : 'fit',
										html : '<font>'
												+ '报文：<br><hr>'
												+ '</font><lab>'
												+ Ext.util.Format.leftPad(data['message'])
												+ "</lab>"
									}).show();
								}
							}
						}
					}
				}],
				tbar : [{
							xtype : 'combobox',
							id : 'subscriberId',
							name : 'subscriberId',
							store : subscriberStore,
							queryMode : 'remote',
							displayField : 'sysName',
							valueField : 'id',
							width : 150,
							emptyText : '选择应用系统'
						}, {
							xtype : 'combobox',
							id : 'dataViewId',
							name : 'dataViewId',
							store : dataViewStore,
							queryMode : 'remote',
							displayField : 'dataViewName',
							valueField : 'id',
							width : 150,
							emptyText : '选择订阅视图'
						}, {
							xtype : 'textfield',
							id : 'patientId',
							name : 'patientId',
							width : 150,
							emptyText : '病人ID号'
							// defaults to today
					}	, {
							xtype : 'datefield',
							id : 'from_date',
							name : 'from_date',
							maxValue : new Date()
							// limited to the current date or prior
					}	, {
							xtype : 'datefield',
							id : 'to_date',
							name : 'to_date',
							maxValue : new Date()
							// defaults to today
					}	, {
							xtype : 'combobox',
							id : 'sendResult',
							name : 'sendResult',
							width : 150,
							store : Ext.create('Ext.data.Store', {
										fields : ['type', 'name'],
										data : [{
													"type" : "1",
													"name" : "正常"
												}, {
													"type" : "-1",
													"name" : "异常"
												}]
									}),
							queryMode : 'local',
							displayField : 'name',
							valueField : 'type',
							emptyText : '发送结果..'
						}, "-", {
							text : '重置',
							tooltip : '重置',
							iconCls : 'reset',
							handler : function() {
								Ext.getCmp("subscriberId").setValue("");
								Ext.getCmp("dataViewId").setValue("");
								Ext.getCmp("patientId").setValue("");
								Ext.getCmp("from_date").setValue("");
								Ext.getCmp("to_date").setValue("");
								Ext.getCmp("sendResult").setValue("");
							}
						}, "-", {
							text : '查询',
							tooltip : '查询',
							iconCls : 'refresh',
							handler : function() {
								logStore.load({
											params : {
												from_date : Ext
														.getCmp("from_date")
														.getValue(),
												to_date : Ext.getCmp("to_date")
														.getValue(),
												subscriberId : Ext
														.getCmp("subscriberId")
														.getValue(),
												dataViewId : Ext
														.getCmp("dataViewId")
														.getValue(),
												patientId : Ext
														.getCmp("patientId")
														.getValue(),
												sendResult : Ext
														.getCmp("sendResult")
														.getValue(),
												start : 0,
												limit : logPerPage
											}
										});
							}
						}, {
							text : '查看报文',
							tooltip : '查看报文',
							iconCls : 'connect',
							handler : function() {
								var row = Ext.getCmp("logGrid")
										.getSelectionModel().selected.items;
								var data = row[0].data;
								var win = Ext.getCmp("detailWindow");
								if (!win) {
									Ext.create('Ext.window.Window', {
										id : 'detailWindow',
										title : '报文',
										height : 480,
										width : 800,
										layout : 'fit',
										html : '<font>'
												+ '报文：<br><hr>'
												+ '</font><lab>'
												+ Ext.util.Format
														.leftPad(data['message'])
												+ "</lab>"
									}).show();
								}
							}
						}],
				bbar : Ext.create('Ext.PagingToolbar', {
							store : logStore,
							displayInfo : true,
							displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
							emptyMsg : "没有数据"
						})
			});
		}
		return win;
	}

});

Ext.define('log', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'subscriberName',
						type : 'string'
					}, {
						name : 'dataViewName',
						type : 'string'
					}, {
						name : 'reportDate',
						type : 'string'
					}, {
						name : 'sendDate',
						type : 'string'
					}, {
						name : 'patientId',
						type : 'string'
					}, {
						name : 'serial',
						type : 'string'
					}, {
						name : 'sendResult',
						type : 'string'
					}, {
						name : 'message',
						type : 'string'
					}]
		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var logStore = Ext.create('Ext.data.Store', {
			storeId : 'logStore',
			model : 'log',
			autoLoad : false,
			pageSize : logPerPage,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/log/getLogs',
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});

logStore.load({
			params : {
				start : 0,
				limit : logPerPage
			}
		});

logStore.on('beforeload', function(store, options) {
			var newParams = {
				from_date : Ext.getCmp("from_date").getValue(),
				to_date : Ext.getCmp("to_date").getValue(),
				subscriberId : Ext.getCmp("subscriberId").getValue(),
				dataViewId : Ext.getCmp("dataViewId").getValue(),
				patientId : Ext.getCmp("patientId").getValue(),
				sendResult : Ext.getCmp("sendResult").getValue()
			}

			Ext.apply(store.proxy.extraParams, newParams);
		});