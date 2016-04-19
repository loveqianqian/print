var errMsgLogPerPage = 20;

Ext.define('MyDesktop.ErrMsgLogGrid', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'errMsgLogList',

	init : function() {
		this.launcher = {
			text : '异常报文记录',
			iconCls : 'errMsgLogList'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('errMsgLogList');
		if (!win) {
			win = desktop.createWindow({
				id : 'errMsgLogList',
				title : '异常报文记录',
				width : 1280,
				height : 500,
				iconCls : 'errMsgLogList',
				animCollapse : false,
				constrainHeader : true,
				layout : 'fit',
				items : [{
					border : false,
					id : "errMsgLogGrid",
					xtype : 'grid',
					store : Ext.data.StoreManager.lookup('errMsgLogStore'),
					columns : [new Ext.grid.RowNumberer(), {
								text : '主键',
								dataIndex : 'logId',
								hidden : true
							}, {
								text : '报文序列',
								sortable : true,
								width : 180,
								dataIndex : 'msgSerial',
								sortable : true
							}, {
								text : '请求报文序列',
								width : 180,
								dataIndex : 'reqMsgSerial',
								sortable : true
							}, {
								text : "报文编号",
								sortable : true,
								width : 100,
								dataIndex : 'msgCode'
							}, {
								text : "报文类型",
								sortable : true,
								width : 100,
								dataIndex : 'msgType'
							}, {
								text : "发送系统编号",
								sortable : true,
								width : 100,
								dataIndex : 'sysCode'
							}, {
								text : "接收系统编号",
								sortable : true,
								width : 100,
								dataIndex : 'destCode'
							}, {
								text : '发送类型',
								sortable : true,
								width : 100,
								dataIndex : 'sendType'
							}, {
								text : '发送时间',
								sortable : true,
								width : 140,
								dataIndex : 'date'
							}, {
								text : '异常信息',
								sortable : true,
								width : 180,
								dataIndex : 'loginfo'
							}, {
								text : '报文',
								sortable : true,
								hidden : true,
								dataIndex : 'msgToStr'
							}, {
								text : '状态',
								sortable : true,
								width : 180,
								hidden : true,
								dataIndex : 'handle',
								renderer : function(val) {
									if (val == 'false') {
										return "未处理";
									} else {
										return "已处理";
									}
								}
							}],
					listeners : {
						dblclick : {
							element : 'el',
							fn : function() {
								var row = Ext.getCmp("errMsgLogGrid")
										.getSelectionModel().selected.items;
								var data = row[0].data;
								var win = Ext.getCmp("detailWindow");
								if (!win) {
									Ext.create('Ext.window.Window', {
										id : 'detailWindow',
										height : 480,
										animCollapse : false,
										constrainHeader : true,
										width : 800,
										layout : 'fit',
										items : [{
											xtype : 'panel',
											items : [{
														xtype : 'textareafield',
														grow : true,
														width : 750,
														height : 450,
														name : 'message',
														fieldLabel : '报文',
														anchor : '100%',
														value:data['msgToStr']
													}]
										}]
									}).show();
								}
							}
						}
					}
				}],
				tbar : [{
					xtype : 'textfield',
					id : 'msgSerial',
					name : 'msgSerial',
					width : 200,
					emptyText : '报文序列'
						// defaults to today
					}, {
					xtype : 'textfield',
					id : 'reqMsgSerial',
					name : 'reqMsgSerial',
					width : 200,
					emptyText : '请求报文序列'
						// defaults to today
					}, {
					xtype : 'textfield',
					id : 'msgCode',
					name : 'msgCode',
					width : 100,
					emptyText : '报文编号'
						// defaults to today
					}, {
					xtype : 'textfield',
					id : 'sysCode',
					name : 'sysCode',
					width : 100,
					emptyText : '发送系统编号'
						// defaults to today
					}, {
					xtype : 'datefield',
					id : 'from_date',
					name : 'from_date',
					width : 120,
					maxValue : new Date()
						// limited to the current date or prior
					}, {
					xtype : 'datefield',
					id : 'to_date',
					name : 'to_date',
					width : 120,
					maxValue : new Date()
						// defaults to today
					}, {
					xtype : 'combobox',
					id : 'sendType',
					name : 'sendType',
					width : 120,
					store : Ext.create('Ext.data.Store', {
								fields : ['type', 'name'],
								data : [{
											"type" : "request",
											"name" : "request"
										}, {
											"type" : "response",
											"name" : "response"
										}]
							}),
					queryMode : 'local',
					displayField : 'name',
					valueField : 'type',
					emptyText : '发送类型..'
				}, "-", {
					text : '重置',
					tooltip : '重置',
					iconCls : 'reset',
					handler : function() {
						Ext.getCmp("from_date").setValue("");
						Ext.getCmp("to_date").setValue("");
						Ext.getCmp("msgSerial").setValue("");
						Ext.getCmp("reqMsgSerial").setValue("");
						Ext.getCmp("msgCode").setValue("");
						Ext.getCmp("sysCode").setValue("");
						Ext.getCmp("sendType").setValue("");
					}
				}, "-", {
					text : '查询',
					tooltip : '查询',
					iconCls : 'refresh',
					handler : function() {
						errMsgLogStore.load({
									params : {
										from_date : Ext.getCmp("from_date")
												.getValue(),
										to_date : Ext.getCmp("to_date")
												.getValue(),
										msgSerial : Ext.getCmp("msgSerial")
												.getValue(),
										reqMsgSerial : Ext
												.getCmp("reqMsgSerial")
												.getValue(),
										msgCode : Ext.getCmp("msgCode")
												.getValue(),
										sysCode : Ext.getCmp("sysCode")
												.getValue(),
										sendType : Ext.getCmp("sendType")
												.getValue(),
										start : 0,
										limit : errMsgLogPerPage
									}
								});
					}
				}, {
					text : '查看报文',
					tooltip : '查看报文',
					iconCls : 'connect',
					handler : function() {
						var row = Ext.getCmp("errMsgLogGrid")
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
												.leftPad(data['msgToStr'])
										+ "</lab>"
							}).show();
						}
					}
				}],
				bbar : Ext.create('Ext.PagingToolbar', {
							store : errMsgLogStore,
							displayInfo : true,
							displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
							emptyMsg : "没有数据"
						})
			});
		}
		return win;
	}

});

Ext.define('errMsgLog', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'logId',
						type : 'string'
					}, {
						name : 'msgSerial',
						type : 'string'
					}, {
						name : 'reqMsgSerial',
						type : 'string'
					}, {
						name : 'msgCode',
						type : 'string'
					}, {
						name : 'msgType',
						type : 'string'
					}, {
						name : 'sysCode',
						type : 'string'
					}, {
						name : 'destCode',
						type : 'string'
					}, {
						name : 'sendType',
						type : 'string'
					}, {
						name : 'loginfo',
						type : 'string'
					}, {
						name : 'date',
						type : 'string'
					}, {
						name : 'msgToStr',
						type : 'string'
					}, {
						name : 'handle',
						type : 'string'
					}]
		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var errMsgLogStore = Ext.create('Ext.data.Store', {
			storeId : 'errMsgLogStore',
			model : 'errMsgLog',
			autoLoad : false,
			pageSize : errMsgLogPerPage,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/msgLog/findErrLogs',
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});

errMsgLogStore.load({
			params : {
				start : 0,
				limit : errMsgLogPerPage
			}
		});

errMsgLogStore.on('beforeload', function(store, options) {
			var newParams = {
				from_date : Ext.getCmp("from_date").getValue(),
				to_date : Ext.getCmp("to_date").getValue(),
				msgSerial : Ext.getCmp("msgSerial").getValue(),
				reqMsgSerial : Ext.getCmp("reqMsgSerial").getValue(),
				msgCode : Ext.getCmp("msgCode").getValue(),
				sysCode : Ext.getCmp("sysCode").getValue(),
				sendType : Ext.getCmp("sendType").getValue()
			}
			Ext.apply(store.proxy.extraParams, newParams);
		});