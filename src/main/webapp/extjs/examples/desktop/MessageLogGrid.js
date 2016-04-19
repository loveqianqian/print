var msgLogPerPage = 30;

Ext.define('MyDesktop.MessageLogGrid', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'msgLogList',

	init : function() {
		this.launcher = {
			text : '报文日志',
			iconCls : 'msgLogList'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('msgLogList');
		if (!win) {
			win = desktop.createWindow({
				id : 'msgLogList',
				title : '收发报文日志',
				width : 1250,
				height : 500,
				iconCls : 'msgLogList',
				animCollapse : false,
				constrainHeader : true,
				layout : 'fit',
				items : [{
					border : false,
					id : "msgLogGrid",
					xtype : 'grid',
					store : Ext.data.StoreManager.lookup('msgLogStore'),
					columns : [new Ext.grid.RowNumberer(), {
								text : '主键',
								dataIndex : 'id',
								hidden : true
							}, {
								text : '报文序列',
								sortable : true,
								width : 250,
								flex : 1,
								dataIndex : 'serial'
							}, {
								text : '请求报文序列',
								width : 250,
								dataIndex : 'reqSerial',
								sortable : true
							}, {
								text : "报文编号",
								sortable : true,
								width : 120,
								dataIndex : 'msgCode'
							}, {
								text : "发送时间",
								sortable : true,
								width : 200,
								dataIndex : 'sendDate'
							}, {
								text : "报文类型",
								sortable : true,
								width : 200,
								dataIndex : 'sendType'
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
								var row = Ext.getCmp("msgLogGrid")
										.getSelectionModel().selected.items;
								var data = row[0].data;
								var win = Ext.getCmp("msgDetailWindow");
								if (!win) {
									Ext.create('Ext.window.Window', {
										id : 'msgDetailWindow',
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
						}
					}
				}],
				tbar : [{
							xtype : 'textfield',
							id : 'serial',
							name : 'serial',
							width : 150,
							emptyText : '报文序列'
						}, {
							xtype : 'textfield',
							id : 'reqSerial',
							name : 'reqSerial',
							width : 150,
							emptyText : '请求报文序列'
						}, {
							xtype : 'textfield',
							id : 'msgCode',
							name : 'msgCode',
							width : 100,
							emptyText : '报文编号'
						}, {
							xtype : 'textfield',
							id : 'content',
							name : 'content',
							width : 100,
							emptyText : '文本内容'
						}, {
							xtype : 'datefield',
							id : 'from_date',
							name : 'from_date',
							maxValue : new Date(),
							width : 130,
							emptyText : '开始时间'
						}, {
							xtype : 'datefield',
							id : 'to_date',
							name : 'to_date',
							maxValue : new Date(),
							width : 130,
							emptyText : '结束时间'
							// defaults to today
					}	, {
							xtype : 'combobox',
							id : 'sendType',
							name : 'sendType',
							width : 100,
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
							emptyText : '报文类型..'
						}, "-", {
							text : '重置',
							tooltip : '重置',
							iconCls : 'reset',
							handler : function() {
								Ext.getCmp("content").setValue("");
								Ext.getCmp("serial").setValue("");
								Ext.getCmp("sendType").setValue("");
								Ext.getCmp("reqSerial").setValue("");
								Ext.getCmp("from_date").setValue("");
								Ext.getCmp("to_date").setValue("");
								Ext.getCmp("msgCode").setValue("");
							}
						}, "-", {
							text : '查询',
							width : 100,
							tooltip : '查询',
							iconCls : 'refresh',
							handler : function() {
								msgLogStore.load({
											params : {
												sendType : Ext
														.getCmp("sendType")
														.getValue(),
												content :Ext.getCmp("content").getValue(),
												from_date : Ext
														.getCmp("from_date")
														.getValue(),
												to_date : Ext.getCmp("to_date")
														.getValue(),
												serial : Ext.getCmp("serial")
														.getValue(),
												reqSerial : Ext
														.getCmp("reqSerial")
														.getValue(),
												msgCode : Ext.getCmp("msgCode")
														.getValue(),
												start : 0,
												limit : msgLogPerPage
											}
										});
							}
						}, {
							text : '查看报文',
							tooltip : '查看报文',
							width : 100,
							iconCls : 'connect',
							handler : function() {
								var row = Ext.getCmp("msgLogGrid")
										.getSelectionModel().selected.items;
								var data = row[0].data;
								var win = Ext.getCmp("msgDetailWindow");
								if (!win) {
									Ext.create('Ext.window.Window', {
										id : 'msgDetailWindow',
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
							store : msgLogStore,
							displayInfo : true,
							displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
							emptyMsg : "没有数据"
						})
			});
		}

		msgLogStore.load({
					params : {
						sendType : Ext.getCmp("sendType").getValue(),
						from_date : Ext.getCmp("from_date").getValue(),
						to_date : Ext.getCmp("to_date").getValue(),
						serial : Ext.getCmp("serial").getValue(),
						content :Ext.getCmp("content").getValue(),
						reqSerial : Ext.getCmp("reqSerial").getValue(),
						msgCode : Ext.getCmp("msgCode").getValue(),
						start : 0,
						limit : msgLogPerPage
					}
				});

		return win;
	}

});

Ext.define('log', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'serial',
						type : 'string'
					}, {
						name : 'reqSerial',
						type : 'string'
					}, {
						name : 'sendDate',
						type : 'string'
					}, {
						name : 'sendType',
						type : 'string'
					}, {
						name : 'msgCode',
						type : 'string'
					}, {
						name : 'message',
						type : 'string'
					}]
		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var msgLogStore = Ext.create('Ext.data.Store', {
			storeId : 'msgLogStore',
			model : 'log',
			autoLoad : false,
			pageSize : msgLogPerPage,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/log/getMsgLogs',
				timeout:300000,
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});

msgLogStore.on('beforeload', function(store, options) {
			var newParams = {
				content :Ext.getCmp("content").getValue(),
				sendType : Ext.getCmp("sendType").getValue(),
				from_date : Ext.getCmp("from_date").getValue(),
				to_date : Ext.getCmp("to_date").getValue(),
				serial : Ext.getCmp("serial").getValue(),
				reqSerial : Ext.getCmp("reqSerial").getValue(),
				msgCode : Ext.getCmp("msgCode").getValue()
			}
			Ext.apply(store.proxy.extraParams, newParams);
		});