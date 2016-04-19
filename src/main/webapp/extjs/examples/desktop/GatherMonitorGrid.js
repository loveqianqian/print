var monitorPerPage = 30;

var monitorOperation = {

}
Ext.define('MyDesktop.GatherMonitorGrid', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'gatherMonitorList',

	init : function() {
		this.launcher = {
			text : '数据采集监控',
			iconCls : 'gatherMonitorList'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('gatherMonitorList');
		if (!win) {
			win = desktop.createWindow({
						id : 'gatherMonitorList',
						title : '数据采集监控',
						width : 1124,
						height : 500,
						iconCls : 'gatherMonitorList',
						animCollapse : false,
						constrainHeader : true,
						layout : 'fit',
						items : [{
							border : false,
							id : "monitorGrid",
							xtype : 'grid',
							store : Ext.data.StoreManager
									.lookup('monitorStore'),
							columns : [new Ext.grid.RowNumberer(), {
										text : '主键',
										dataIndex : 'id',
										hidden : true
									}, {
										text : '应用服务编码',
										sortable : true,
										width : 120,
										dataIndex : 'msgCode'
									}, {
										text : '订阅系统',
										sortable : true,
										width : 120,
										dataIndex : 'subscriberName'
									}, {
										text : '视图名称',
										width : 150,
										dataIndex : 'dataViewName',
										sortable : true
									}, {
										text : '发生采集时间',
										width : 150,
										dataIndex : 'currPointDate',
										sortable : true
									}, {
										text : "上轮采集点",
										sortable : true,
										width : 180,
										dataIndex : 'pointDate'
									}, {
										text : "应采总数",
										sortable : true,
										width : 100,
										dataIndex : 'sumCount'
									}, {
										text : "完成总数",
										sortable : true,
										width : 100,
										dataIndex : 'successCount'
									}, {
										text : '完成百分比',
										sortable : true,
										width : 100,
										dataIndex : 'percent'
									}, {
										text : '轮询周期',
										sortable : true,
										width : 100,
										dataIndex : 'recycleMinute'
									}],
							viewConfig : {
								forceFit : true,
								getRowClass : function(record, rowIndex,
										rowParams, store) {
									// 禁用数据显示红色
									if (record.data.percent != '100.00%') {
										return 'x-grid-record-red';
									} else {
										return '';
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
									emptyText : '选择应用系统'
								}, {
									xtype : 'combobox',
									id : 'dataViewId',
									name : 'dataViewId',
									store : dataViewStore,
									queryMode : 'remote',
									displayField : 'dataViewName',
									valueField : 'id',
									emptyText : '选择订阅视图'
								}, "-", {
									text : '重置',
									tooltip : '重置',
									iconCls : 'reset',
									handler : function() {
										Ext.getCmp("subscriberId").setValue("");
										Ext.getCmp("dataViewId").setValue("");
									}
								}, "-", {
									text : '查询',
									tooltip : '查询',
									iconCls : 'refresh',
									handler : function() {
										monitorStore.load({
													params : {
														subscriberId : Ext
																.getCmp("subscriberId")
																.getValue(),
														dataViewId : Ext
																.getCmp("dataViewId")
																.getValue(),
														start : 0,
														limit : monitorPerPage
													}
												});
									}
								}],
						bbar : Ext.create('Ext.PagingToolbar', {
									store : monitorStore,
									displayInfo : true,
									displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
									emptyMsg : "没有数据"
								})
					});
		}
		return win;
	}

});

Ext.define('monitor', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'msgCode',
						type : 'string'
					}, {
						name : 'subscriberName',
						type : 'string'
					}, {
						name : 'dataViewName',
						type : 'string'
					}, {
						name : 'currPointDate',
						type : 'string'
					}, {
						name : 'pointDate',
						type : 'string'
					}, {
						name : 'sumCount',
						type : 'string'
					}, {
						name : 'successCount',
						type : 'string'
					}, {
						name : 'percent',
						type : 'string'
					}, {
						name : 'recycleMinute',
						type : 'string'
					}]
		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var monitorStore = Ext.create('Ext.data.Store', {
			storeId : 'monitorStore',
			model : 'monitor',
			autoLoad : false,
			pageSize : monitorPerPage,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/monitor/getMonitors',
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});

monitorStore.load({
			params : {
				start : 0,
				limit : monitorPerPage
			}
		});

monitorStore.on('beforeload', function(store, options) {

			var newParams = {
				subscriberId : Ext.getCmp("subscriberId").getValue(),
				dataViewId : Ext.getCmp("dataViewId").getValue()
			}

			Ext.apply(store.proxy.extraParams, newParams);
		});