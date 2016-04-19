var dataQueryOperation = {
	addDataQuery : function() {
		var window = Ext.getCmp("addDataQueryWindow");
		if (window) {
			Ext.getCmp("addDataQueryWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addDataQueryWindow',
				title : '视图添加',
				height : 500,
				width : 600,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/dataQuery/addDataQuery',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '数据查询名称',
								name : 'queryName',
								allowBlank : false
							}, {
								fieldLabel : '对应视图名',
								name : 'queryTable',
								allowBlank : false
							}, {
								xtype : 'textareafield',
								grow : true,
								anchor : '100%',
								height : 250,
								emptyText : '注意：仅供管理员参考，并不是实际查询语句。。。',
								fieldLabel : '视图查询语句',
								name : 'querySql',
								allowBlank : false
								// lose validate
						}	, {
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
								formBind : true, // only
								handler : function() {
									var form = this.up('form').getForm();
									if (form.isValid()) {
										form.submit({
											success : function(form, action) {
												Ext.Msg
														.alert('注册成功',
																"信息注册成功!");
												dataQueryStore.reload();
												form.reset();
												Ext
														.getCmp("addDataQueryWindow")
														.hide();
											},
											failure : function(form, action) {
												Ext.Msg
														.alert('注册失败',
																"信息注册失败!");
											}
										});
									}
								}
							}]
				}
			}).show();
		}
	},

	updateDataQuery : function() {
		var row = Ext.getCmp("dataQueryGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateDataQueryWindow");
		if (window) {
			Ext.getCmp("updateDataQueryForm").getForm().setValues(data);
			Ext.getCmp("updateDataQueryWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateDataQueryWindow',
				title : '视图添加',
				height : 500,
				width : 600,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateDataQueryForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/dataQuery/updateDataQuery',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '主键',
								name : 'id',
								hidden : true
							}, {
								fieldLabel : '数据查询名称',
								name : 'queryName',
								allowBlank : false
							}, {
								fieldLabel : '对应视图名',
								name : 'queryTable',
								allowBlank : false
							}, {
								xtype : 'textareafield',
								grow : true,
								anchor : '100%',
								height : 250,
								emptyText : '注意：仅供管理员参考，并不是实际查询语句。。。',
								fieldLabel : '视图查询语句',
								name : 'querySql',
								allowBlank : false
								// lose validate
						}	, {
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
														"视图信息修改成功!");
												dataQueryStore.reload();
												form.reset();
												Ext
														.getCmp("updateDataQueryWindow")
														.hide();
											},
											failure : function(form, action) {
												Ext.Msg.alert('操作结果',
														"视图信息修改失败!");
											}
										});
							}
						}
					}]
				}
			}).show();
			Ext.getCmp("updateDataQueryForm").getForm().setValues(data);
		}
	}
}

var queryParamOperation = {

	createWindow : function() {
		var dataQueryRow = Ext.getCmp("dataQueryGird").getSelectionModel().selected.items;
		var dataQueryData = dataQueryRow[0].data;
		queryParamStore.load({
					params : {
						dataQueryId : dataQueryData['id']
					}
				});
		paramWin = Ext.create('Ext.window.Window', {
			id : 'queryParamWin',
			title : '调用参数管理',
			width : 1200,
			height : 480,
			iconCls : 'dataQueryWindow',
			animCollapse : false,
			constrainHeader : true,
			layout : 'fit',
			viewConfig : {
				forceFit : true
			},
			items : [{
						border : false,
						id : "queryParamGird",
						xtype : 'grid',
						store : Ext.data.StoreManager.lookup('queryParamStore'),
						columns : [new Ext.grid.RowNumberer(), {
									text : '主键',
									dataIndex : 'id',
									hidden : true

								}, {
									text : "参数变量",
									sortable : true,
									width : 150,
									dataIndex : 'paramCode'
								}, {
									text : "别名",
									sortable : true,
									width : 150,
									dataIndex : 'alias'
								}, {
									text : "参数名",
									sortable : true,
									width : 150,
									dataIndex : 'paramName'
								}, {
									text : "数据类型",
									sortable : true,
									dataIndex : 'paramType'
								}, {
									text : "属性类型",
									sortable : true,
									dataIndex : 'propertyType',
									renderer : function(val) {
										if (val == '1') {
											return "一级属性";
										} else {
											return "二级属性";
										}
									}
								}, {
									text : "参数类型",
									sortable : true,
									dataIndex : 'inOrOut',
									renderer : function(val) {
										if (val == '1') {
											return "查询参数";
										} else {
											return "条件参数";
										}
									}
								}, {
									text : "所属数据查询id",
									sortable : true,
									hidden : true,
									dataIndex : 'dataQueryId'
								}, {
									text : "对应查询视图",
									sortable : true,
									width : 150,
									dataIndex : 'dataQueryTable'
								}, {
									text : "数据查询名称",
									sortable : true,
									width : 150,
									dataIndex : 'dataQueryName'
								}, {
									text : "范围参数",
									sortable : true,
									width : 150,
									dataIndex : 'rangeParam',
									renderer : function(val) {
										if (val == '1') {
											return "是";
										} else {
											return "否";
										}
									}
								}, {
									text : "简介",
									sortable : true,
									flex : 1,
									dataIndex : 'content'
								}]
					}],
			tbar : [{
						text : '增加',
						tooltip : '添加一行记录',
						iconCls : 'add',
						handler : function() {
							queryParamOperation.addParam();
						}
					}, '-', {
						text : '修改',
						tooltip : '修改当前记录',
						iconCls : 'option',
						handler : function() {

							var row = Ext.getCmp("dataQueryGird")
									.getSelectionModel().selected.items
							if (row.length) {
								queryParamOperation.updateParam();
							} else {
								Ext.Msg.alert('', "需要选中一条记录!");
								return;
							}
						}
					}, '-', {
						text : '删除',
						tooltip : '删除',
						iconCls : 'remove',
						handler : function() {
							var row = Ext.getCmp("queryParamGird")
									.getSelectionModel().selected.items
							if (row.length) {
								queryParamOperation.deleteParam();
							} else {
								Ext.Msg.alert('', "需要选中一条记录!");
								return;
							}
						}
					}, '-', {
						text : '刷新',
						tooltip : '刷新数据',
						iconCls : 'refresh',
						handler : function() {
							// var dataQueryRow = Ext.getCmp("dataQueryGird")
							// .getSelectionModel().selected.items;
							// var dataQueryData = dataQueryRow[0].data;
							queryParamStore.reload({
										params : {
											dataQueryId : dataQueryData['id']
										}
									});
						}
					}]
		});
		return paramWin;
	},

	addParam : function() {

		var row = Ext.getCmp("dataQueryGird").getSelectionModel().selected.items;
		var data = row[0].data;

		var window = Ext.getCmp("addQueryParamWindow");
		if (window) {
			Ext.getCmp("addQueryParamWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addQueryParamWindow',
				title : '视图添加',
				height : 500,
				width : 600,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/queryParam/addQueryParam',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								xtype : 'combobox',
								fieldLabel : '所属数据查询',
								name : 'dataQueryId',
								store : dataQueryStore,
								queryMode : 'remote',
								displayField : 'queryName',
								valueField : 'id',
								value : data['id'],
								readOnly : true,
								allowBlank : false
							}, {
								fieldLabel : '参数变量',
								name : 'paramCode',
								allowBlank : false
							}, {
								fieldLabel : '参数名称',
								name : 'paramName',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '数据类型',
								name : 'paramType',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														type : "String",
														name : "字符串"
													}, {
														type : "double",
														name : "浮点数"
													}, {
														type : "int",
														name : '整型'
													}, {
														type : 'Date',
														name : '日期'
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								fieldLabel : '别名',
								name : 'alias'
							}, {
								fieldLabel : '属性类型',
								name : 'propertyType',
								xtype : 'combobox',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "一级属性"
													}, {
														"type" : "2",
														"name" : "二级属性"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								emptyText : '如果是查询参数为必填',
								queryMode : 'local'
							}, {
								xtype : 'combobox',
								fieldLabel : '参数类型',
								name : 'inOrOut',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "查询参数"
													}, {
														"type" : "2",
														"name" : "条件参数"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '范围参数',
								name : 'rangeParam',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : 1,
														"name" : "是"
													}, {
														"type" : -1,
														"name" : "否"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
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
								formBind : true, // only
								handler : function() {
									var form = this.up('form').getForm();
									if (form.isValid()) {
										form.submit({
											success : function(form, action) {
												Ext.Msg
														.alert('注册成功',
																"信息注册成功!");
												queryParamStore.reload({
													params : {
														dataQueryId : data['id']
													}
												});
												form.reset();
												Ext
														.getCmp("addQueryParamWindow")
														.hide();
											},
											failure : function(form, action) {
												Ext.Msg
														.alert('注册失败',
																"信息注册失败!");
											}
										});
									}
								}
							}]
				}
			}).show();
		}
	},

	updateParam : function() {

		var dataQueryRow = Ext.getCmp("dataQueryGird").getSelectionModel().selected.items;
		var dataQueryData = dataQueryRow[0].data;

		var row = Ext.getCmp("queryParamGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateQueryParamWindow");
		if (window) {
			Ext.getCmp("updateQueryParamForm").getForm().setValues(data);
			Ext.getCmp("updateQueryParamWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateQueryParamWindow',
				title : '查询参数修改',
				height : 500,
				width : 600,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateQueryParamForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/queryParam/updateQueryParam',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '主键',
								name : 'id',
								hidden : true
							}, {
								xtype : 'combobox',
								fieldLabel : '所属数据查询',
								name : 'dataQueryId',
								store : dataQueryStore,
								queryMode : 'remote',
								displayField : 'queryName',
								valueField : 'id',
								value : dataQueryData['id'],
								readOnly : true,
								allowBlank : false
							}, {
								fieldLabel : '参数变量',
								name : 'paramCode',
								allowBlank : false
							}, {
								fieldLabel : '参数名称',
								name : 'paramName',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '数据类型',
								name : 'paramType',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														type : "String",
														name : "字符串"
													}, {
														type : "double",
														name : "浮点数"
													}, {
														type : "int",
														name : '整型'
													}, {
														type : 'Date',
														name : '日期'
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								fieldLabel : '别名',
								name : 'alias'
							}, {
								fieldLabel : '属性类型',
								name : 'propertyType',
								xtype : 'combobox',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "一级属性"
													}, {
														"type" : "2",
														"name" : "二级属性"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								emptyText : '如果是查询参数为必填',
								queryMode : 'local'
							}, {
								xtype : 'combobox',
								fieldLabel : '参数类型',
								name : 'inOrOut',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "查询参数"
													}, {
														"type" : "2",
														"name" : "条件参数"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							},{
								xtype : 'combobox',
								fieldLabel : '范围参数',
								name : 'rangeParam',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : 1,
														"name" : "是"
													}, {
														"type" : -1,
														"name" : "否"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
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
										Ext.Msg.alert('操作结果', "信息修改成功!");
										queryParamStore.reload({
											params : {
												dataQueryId : dataQueryData['id']
											}
										});
										form.reset();
										Ext.getCmp("updateQueryParamWindow")
												.hide();
									},
									failure : function(form, action) {
										Ext.Msg.alert('操作结果', "信息修改失败!");
									}
								});
							}
						}
					}]
				}
			}).show();
			Ext.getCmp("updateQueryParamForm").getForm().setValues(data);
		}
	},
	deleteParam : function() {
		Ext.MessageBox.confirm('', '您确定要删除吗?', function(opt) {
			if (opt == 'yes') {
				var row = Ext.getCmp("queryParamGird").getSelectionModel().selected.items;
				var data = row[0].data;
				Ext.Ajax.request({
							url : '/esb-gather/queryParam/deleteQueryParam',
							params : {
								id : data['id']
							},
							success : function(response) {
								var text = response.responseText;
								queryParamStore.remove(row[0]);
							}
						});
			}
		});
	}
}

Ext.define('MyDesktop.DataQueryGrid', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'dataQueryWindow',

	init : function() {
		this.launcher = {
			text : '数据查询服务',
			iconCls : 'dataViewWindow'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('blockalanche');
		if (!win) {
			win = desktop.createWindow({
						id : 'dataQueryWindow',
						title : '视图管理',
						width : 700,
						height : 480,
						iconCls : 'dataViewWindow',
						animCollapse : false,
						constrainHeader : true,
						layout : 'fit',
						viewConfig : {
							forceFit : true
						},
						items : [{
							border : false,
							id : "dataQueryGird",
							xtype : 'grid',
							store : Ext.data.StoreManager
									.lookup('dataQueryStore'),
							columns : [new Ext.grid.RowNumberer(), {
										text : '主键',
										dataIndex : 'id',
										hidden : true
									}, {
										text : "数据查询名称",
										sortable : true,
										width : 200,
										dataIndex : 'queryName'
									}, {
										text : "对应视图",
										sortable : true,
										width : 200,
										dataIndex : 'queryTable'
									}, {
										text : "查询语句",
										sortable : true,
										dataIndex : 'querySql',
										hidden : true
									}, {
										text : "简介",
										flex : 1,
										sortable : true,
										dataIndex : 'content'
									}],
							listeners : {
								dblclick : {
									element : 'el',
									fn : function() {
										var row = Ext.getCmp("dataQueryGird")
												.getSelectionModel().selected.items;
										var data = row[0].data;
										Ext.create('Ext.window.Window', {
													id : 'dataQueryDetail',
													title : '视图明细',
													height : 500,
													width : 600,
													layout : 'fit'
												}).show();
									}
								}
							}
						}],
						tbar : [{
									text : '增加',
									tooltip : '添加一行记录',
									iconCls : 'add',
									handler : function() {
										dataQueryOperation.addDataQuery();
									}
								}, '-', {
									text : '修改',
									tooltip : '修改当前记录',
									iconCls : 'option',
									handler : function() {

										var row = Ext.getCmp("dataQueryGird")
												.getSelectionModel().selected.items
										if (row.length) {
											dataQueryOperation
													.updateDataQuery();
										} else {
											Ext.Msg.alert('', "需要选中一条记录!");
											return;
										}
									}
								}, '-', {
									text : '刷新',
									tooltip : '刷新',
									iconCls : 'refresh',
									handler : function() {
										dataQueryStore.reload();
									}
								}, {
									text : '参数管理',
									tooltip : '参数管理',
									iconCls : 'option',
									handler : function() {
										var row = Ext.getCmp("dataQueryGird")
												.getSelectionModel().selected.items
										if (row.length) {
											queryParamOperation.createWindow()
													.show();
										} else {
											Ext.Msg.alert('', "需要选中一条记录!");
											return;
										}
									}
								}]
					});
		}
		return win;
	}

});

Ext.define('dataQueryInfo', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'queryName',
						type : 'string'
					}, {
						name : 'queryTable',
						type : 'string'
					}, {
						name : 'querySql',
						type : 'string'
					}, {
						name : 'content',
						type : 'string'
					}]

		});

var dataQueryStore = Ext.create('Ext.data.Store', {
			storeId : 'dataQueryStore',
			model : 'dataQueryInfo',
			autoLoad : true,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/dataQuery/findDataQuerys',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			}
		});

Ext.define("queryParam", {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'dataQueryId',
						type : 'string'
					}, {
						name : 'dataQueryTable',
						type : 'string'
					}, {
						name : 'dataQueryName',
						type : 'string'
					}, {
						name : 'paramCode',
						type : 'string'
					}, {
						name : 'alias',
						type : 'string'
					}, {
						name : 'paramName',
						type : 'string'
					}, {
						name : 'paramType',
						type : 'string'
					}, {
						name : 'propertyType',
						type : 'string'
					}, {
						name : 'content',
						type : 'string'
					}, {
						name : 'inOrOut',
						type : 'string'
					}, {
						name : 'rangeParam',
						type : 'string'
					}]
		})
var queryParamStore = Ext.create('Ext.data.Store', {
			storeId : 'queryParamStore',
			model : 'queryParam',
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/queryParam/findQueryParams',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			}
		});