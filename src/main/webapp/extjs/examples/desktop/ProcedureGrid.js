var procedureOperation = {
	addProcedure : function() {
		var window = Ext.getCmp("addProcedureWindow");
		if (window) {
			Ext.getCmp("addProcedureWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addProcedureWindow',
				title : '存储过程注册',
				height : 500,
				width : 500,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/procedure/addProcedure',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '存储过程名',
								name : 'procedureName',
								allowBlank : false
							}, {
								fieldLabel : '操作类型',
								name : 'actionType',
								xtype : 'combobox',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "计费"
													}, {
														"type" : "2",
														"name" : "回写"
													}, {
														type : '3',
														name : '标识'
													}, {
														type : '4',
														name : '其他'
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								xtype : 'textareafield',
								grow : true,
								anchor : '100%',
								height : 300,
								fieldLabel : '操作语句',
								name : 'actionSql',
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
								formBind : true, // only enabled once the
								// form is
								// valid
								// disabled : true,
								handler : function() {
									var form = this.up('form').getForm();
									if (form.isValid()) {
										form.submit({
											success : function(form, action) {
												Ext.Msg
														.alert('注册成功',
																"信息注册成功!");
												procedureStore.reload();
												// this.up('form').getForm().reset();
												form.reset();
												Ext
														.getCmp("addProcedureWindow")
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

	updateProcedure : function() {
		var row = Ext.getCmp("procedureGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateProcedureWindow");
		if (window) {
			Ext.getCmp("updateProcedureForm").getForm().setValues(data);
			Ext.getCmp("updateProcedureWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateProcedureWindow',
				title : '存储过程修改',
				height : 500,
				width : 500,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateProcedureForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/procedure/updateProcedure',
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
								fieldLabel : '存储过程名称',
								readOnly : true,
								name : 'procedureName',
								allowBlank : false
							}, {
								fieldLabel : '操作类型',
								name : 'actionType',
								xtype : 'combobox',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "计费"
													}, {
														"type" : "2",
														"name" : "回写"
													}, {
														type : '3',
														name : '标识'
													}, {
														type : '4',
														name : '其他'
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								xtype : 'textareafield',
								grow : true,
								height : 300,
								anchor : '100%',
								fieldLabel : '操作语句',
								name : 'actionSql',
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
												Ext.Msg
														.alert('操作结果',
																"信息修改成功!");
												procedureStore.reload();
												form.reset();
												Ext
														.getCmp("updateProcedureWindow")
														.hide();
											},
											failure : function(form, action) {
												Ext.Msg
														.alert('操作结果',
																"信息修改失败!");
											}
										});
							}
						}
					}]
				}
			}).show();
			Ext.getCmp("updateProcedureForm").getForm().setValues(data);
		}
	},
	paramManager : function() {
		var row = Ext.getCmp("procedureGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("paramWin");
		paramStore.load({
					params : {
						procedureId : data['id']
					}
				})
		if (window) {
			Ext.getCmp("paramWin").show();
		} else {
			paramOperation.createWindow().show();
		}
	}
}

var paramOperation = {
	createWindow : function() {
		paramWin = Ext.create('Ext.window.Window', {
					id : 'paramWin',
					title : '调用参数管理',
					width : 1200,
					height : 480,
					iconCls : 'procedureWindow',
					animCollapse : false,
					constrainHeader : true,
					layout : 'fit',
					viewConfig : {
						forceFit : true
					},
					items : [{
								border : false,
								id : "paramsGird",
								xtype : 'grid',
								store : Ext.data.StoreManager
										.lookup('paramStore'),
								columns : [new Ext.grid.RowNumberer(), {
											text : '主键',
											dataIndex : 'id',
											hidden : true
										}, {
											text : "所属过程id",
											sortable : true,
											hidden : true,
											dataIndex : 'procedureId'
										}, {
											text : "所属过程",
											sortable : true,
											width : 150,
											dataIndex : 'procedureName'
										}, {
											text : "参数变量",
											sortable : true,
											width : 100,
											dataIndex : 'paramCode'
										}, {
											text : "参数名",
											sortable : true,
											width : 100,
											dataIndex : 'paramName'
										}, {
											text : "数据类型",
											sortable : true,
											width : 100,
											dataIndex : 'paramType'
										},{
											text : "顺序",
											sortable : true,
											width : 100,
											dataIndex : 'position'
										}, {
											text : "别名",
											sortable : true,
											width : 100,
											dataIndex : 'alias'
										}, {
											text : "参数类型",
											sortable : true,
											width : 150,
											dataIndex : 'inOrOut',
											renderer : function(val) {
												if (val == '1') {
													return "输入";
												} else {
													return "输出";
												}
											}
										}, {
											text : "是否返回",
											sortable : true,
											width : 150,
											dataIndex : 'returnFlag',
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
											width : 150,
											dataIndex : 'content'
										}]
							}],
					tbar : [{
								text : '增加',
								tooltip : '添加一行记录',
								iconCls : 'add',
								handler : function() {
									paramOperation.addParam();
								}
							}, '-', {
								text : '修改',
								tooltip : '修改当前记录',
								iconCls : 'option',
								handler : function() {

									var row = Ext.getCmp("paramsGird")
											.getSelectionModel().selected.items
									if (row.length) {
										paramOperation.updateParam();
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
									var row = Ext.getCmp("paramsGird")
											.getSelectionModel().selected.items
									if (row.length) {
										paramOperation.deleteParam();
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
									var procedureRow = Ext
											.getCmp("procedureGird")
											.getSelectionModel().selected.items;
									var procedureData = procedureRow[0].data;
									paramStore.reload({
												params : {
													procedureId : procedureData['id']
												}
											});
								}
							}, {
								text : '参数值映射设置',
								tooltip : '参数值映射设置',
								iconCls : 'option',
								handler : function() {
									var row = Ext.getCmp("paramsGird")
											.getSelectionModel().selected.items
									if (row.length) {
										paramOperation.paramMappingManager();
									} else {
										Ext.Msg.alert('', "需要选中一条记录!");
										return;
									}
								}
							}]
				});
		return paramWin;
	},

	addParam : function() {
		var row = Ext.getCmp("procedureGird").getSelectionModel().selected.items;
		var data = row[0].data;

		var window = Ext.getCmp("addParamWindow");
		if (window) {
			Ext.getCmp("addParamWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addParamWindow',
				title : '添加参数',
				height : 500,
				width : 350,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/procedureParam/addProcedureParam',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								xtype : 'combobox',
								fieldLabel : '所属过程',
								name : 'procedureId',
								store : procedureStore,
								queryMode : 'remote',
								displayField : 'procedureName',
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
								fieldLabel : '参数顺序',
								name : 'position',
								emptyText:'参数在存储过程中的顺序',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '数据类型',
								name : 'paramType',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "String",
														"name" : "字符串"
													}, {
														"type" : "double",
														"name" : "浮点数"
													}, {
														"type" : "int",
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
								xtype : 'combobox',
								fieldLabel : '输入或者输出',
								name : 'inOrOut',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "输入"
													}, {
														"type" : "2",
														"name" : "输出"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '是否返回',
								name : 'returnFlag',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "是"
													}, {
														"type" : "2",
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
								formBind : true, // only enabled once the
								// form is
								// valid
								// disabled : true,
								handler : function() {
									var form = this.up('form').getForm();
									if (form.isValid()) {
										form.submit({
											success : function(form, action) {
												Ext.Msg
														.alert('注册成功',
																"信息注册成功!");
												paramStore.reload({
													params : {
														procedureId : data['id']
													}
												});
												form.reset();
												Ext.getCmp("addParamWindow")
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

		var procedureRow = Ext.getCmp("procedureGird").getSelectionModel().selected.items;
		var procedureData = procedureRow[0].data;

		var row = Ext.getCmp("paramsGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateParamWindow");
		if (window) {
			Ext.getCmp("updateParamForm").getForm().setValues(data);
			Ext.getCmp("updateParamWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateParamWindow',
				title : '参数信息修改',
				height : 500,
				width : 350,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateParamForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/procedureParam/updateProcedureParam',
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
								fieldLabel : '所属过程',
								name : 'procedureId',
								store : procedureStore,
								queryMode : 'remote',
								displayField : 'procedureName',
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
								fieldLabel : '参数名称',
								name : 'position',
								emptyText:'参数在存储过程中的顺序',
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
								xtype : 'combobox',
								fieldLabel : '输入或者输出',
								name : 'inOrOut',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "输入"
													}, {
														"type" : "2",
														"name" : "输出"
													}]
										}),
								displayField : 'name',
								valueField : 'type',
								queryMode : 'local',
								allowBlank : false
							}, {
								xtype : 'combobox',
								fieldLabel : '是否返回',
								name : 'returnFlag',
								store : Ext.create('Ext.data.Store', {
											fields : ['type', 'name'],
											data : [{
														"type" : "1",
														"name" : "是"
													}, {
														"type" : "2",
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
										Ext.Msg.alert('操作结果', "视图信息修改成功!");
										paramStore.reload({
											params : {
												procedureId : procedureData['id']
											}
										});
										form.reset();
										Ext.getCmp("updateParamWindow").hide();
									},
									failure : function(form, action) {
										Ext.Msg.alert('操作结果', "视图信息修改失败!");
									}
								});
							}
						}
					}]
				}
			}).show();
			Ext.getCmp("updateParamForm").getForm().setValues(data);
		}
	},
	deleteParam : function() {

		Ext.MessageBox.confirm('', '您确定要删除吗?', function(opt) {
			if (opt == 'yes') {
				var row = Ext.getCmp("paramsGird").getSelectionModel().selected.items;
				var data = row[0].data;
				Ext.Ajax.request({
							url : '/esb-gather/procedureParam/deleteProcedureParam',
							params : {
								id : data['id']
							},
							success : function(response) {
								var text = response.responseText;
								paramStore.remove(row[0]);
							}
						});
			}
		});
	},

	paramMappingManager : function() {
		var row = Ext.getCmp("paramsGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("paramMappingWin");
		paramMappingStore.load({
					params : {
						paramId : data['id']
					}
				})
		if (window) {
			Ext.getCmp("paramMappingWin").show();
		} else {
			paramMappingOperation.createWindow().show();
		}
	}
}

var paramMappingOperation = {
	createWindow : function() {
		paramMappingWin = Ext.create('Ext.window.Window', {
					id : 'paramMappingWin',
					title : '调用参数管理',
					width : 400,
					height : 480,
					iconCls : 'procedureWindow',
					animCollapse : false,
					constrainHeader : true,
					layout : 'fit',
					viewConfig : {
						forceFit : true
					},
					items : [{
						border : false,
						id : "paramMappingsGird",
						xtype : 'grid',
						store : Ext.data.StoreManager
								.lookup('paramMappingStore'),
						columns : [new Ext.grid.RowNumberer(), {
									text : '主键',
									dataIndex : 'id',
									hidden : true
								}, {
									text : "所属参数id",
									sortable : true,
									hidden : true,
									dataIndex : 'paramId'
								}, {
									text : "参数值",
									sortable : true,
									width : 150,
									dataIndex : 'paramVal'
								}, {
									text : "实际含义",
									sortable : true,
									width : 100,
									dataIndex : 'naming'
								}]
					}],
					tbar : [{
								text : '增加',
								tooltip : '添加一行记录',
								iconCls : 'add',
								handler : function() {
									paramMappingOperation.addParamMapping();
								}
							}, '-', {
								text : '修改',
								tooltip : '修改当前记录',
								iconCls : 'option',
								handler : function() {

									var row = Ext.getCmp("paramMappingsGird")
											.getSelectionModel().selected.items
									if (row.length) {
										paramMappingOperation
												.updateParamMapping();
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
									var row = Ext.getCmp("paramMappingsGird")
											.getSelectionModel().selected.items
									if (row.length) {
										paramMappingOperation
												.deleteParamMapping();
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
									var paramRow = Ext.getCmp("paramsGird")
											.getSelectionModel().selected.items;
									var paramData = paramRow[0].data;
									paramMappingStore.reload({
												params : {
													paramId : paramData['id']
												}
											});
								}
							}]
				});
		return paramMappingWin;
	},

	addParamMapping : function() {
		var row = Ext.getCmp("paramsGird").getSelectionModel().selected.items;
		var data = row[0].data;

		var window = Ext.getCmp("addParamMappingWindow");
		if (window) {
			Ext.getCmp("addParamMappingWindow").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'addParamMappingWindow',
				title : '添加参数',
				height : 500,
				width : 350,
				layout : 'fit',
				items : {
					xtype : 'form',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/paramValMapping/addParamValMapping',
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					defaultType : 'textfield',
					items : [{
								xtype : 'combobox',
								fieldLabel : '所属过程',
								name : 'paramId',
								store : paramStore,
								queryMode : 'remote',
								displayField : 'paramCode',
								valueField : 'id',
								value : data['id'],
								readOnly : true,
								allowBlank : false
							}, {
								fieldLabel : '参数值',
								name : 'paramVal',
								allowBlank : false
							}, {
								fieldLabel : '代表内容',
								name : 'naming',
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
											success : function(form, action) {
												Ext.Msg
														.alert('注册成功',
																"信息注册成功!");
												paramMappingStore.reload({
															params : {
																paramId : data['id']
															}
														});
												form.reset();
												Ext
														.getCmp("addParamMappingWindow")
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

	updateParamMapping : function() {

		var mappingRow = Ext.getCmp("paramMappingsGird").getSelectionModel().selected.items;
		var mappingData = mappingRow[0].data;
		var row = Ext.getCmp("paramsGird").getSelectionModel().selected.items;
		var data = row[0].data;
		var window = Ext.getCmp("updateParamMappingWin");
		if (window) {
			Ext.getCmp("updateParamMappingForm").getForm()
					.setValues(mappingData);
			Ext.getCmp("updateParamMappingWin").show();
		} else {
			Ext.create('Ext.window.Window', {
				id : 'updateParamMappingWin',
				title : '参数信息修改',
				height : 500,
				width : 350,
				layout : 'fit',
				items : {
					xtype : 'form',
					id : 'updateParamMappingForm',
					bodyPadding : 5,
					width : 350,
					url : '/esb-gather/paramValMapping/updateParamValMapping',
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
								fieldLabel : '所属过程',
								name : 'paramId',
								store : paramStore,
								queryMode : 'remote',
								displayField : 'paramCode',
								valueField : 'id',
								value : data['id'],
								readOnly : true,
								allowBlank : false
							}, {
								fieldLabel : '参数值',
								name : 'paramVal',
								allowBlank : false
							}, {
								fieldLabel : '代表内容',
								name : 'naming',
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
												paramMappingStore.reload({
															params : {
																paramId : data['id']
															}
														});
												form.reset();
												Ext
														.getCmp("updateParamMappingWin")
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
			Ext.getCmp("updateParamMappingForm").getForm()
					.setValues(mappingData);
		}
	},
	deleteParamMapping : function() {

		Ext.MessageBox.confirm('', '您确定要删除吗?', function(opt) {
			if (opt == 'yes') {
				var row = Ext.getCmp("paramMappingsGird").getSelectionModel().selected.items;
				var data = row[0].data;
				Ext.Ajax.request({
							url : '/esb-gather/paramValMapping/deleteParamValMapping',
							params : {
								id : data['id']
							},
							success : function(response) {
								var text = response.responseText;
								paramMappingStore.remove(row[0]);
							}
						});
			}
		});
	}
}

Ext.define('MyDesktop.ProcedureGrid', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'procedureWindow',

	init : function() {
		this.launcher = {
			text : '存储过程',
			iconCls : 'procedureWindow'
		};
	},

	createWindow : function() {
		var itemLimit = 1;
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('procedureWindow');
		if (!win) {
			win = desktop.createWindow({
						id : 'procedureWindow',
						title : '服务管理',
						width : 700,
						height : 480,
						iconCls : 'procedureWindow',
						animCollapse : false,
						constrainHeader : true,
						layout : 'fit',
						viewConfig : {
							forceFit : true
						},
						items : [{
							border : false,
							id : "procedureGird",
							xtype : 'grid',
							store : Ext.data.StoreManager
									.lookup('procedureStore'),
							columns : [new Ext.grid.RowNumberer(), {
										text : '主键',
										dataIndex : 'id',
										hidden : true
									}, {
										text : "存储过程名",
										sortable : true,
										flex : 1,
										dataIndex : 'procedureName'
									}, {
										text : "操作类型",
										width : 200,
										sortable : true,
										dataIndex : 'actionType',
										renderer : function(val) {
											if (val == '1') {
												return "计费";
											} else if (val == '2') {
												return "回写";
											} else if (val == '3') {
												return "标识";
											} else {
												return "其他";
											}
										}
									}, {
										text : "创建SQL",
										sortable : true,
										hidden : true,
										dataIndex : 'actionSql'
									}, {
										text : "简介",
										width : 300,
										sortable : true,
										dataIndex : 'content'
									}],
							listeners : {
								dblclick : {
									element : 'el',
									fn : function() {
										var row = Ext.getCmp("procedureGird")
												.getSelectionModel().selected.items;
										var data = row[0].data;
										Ext.create('Ext.window.Window', {
													id : 'procedureDetail',
													title : '服务明细',
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
										procedureOperation.addProcedure();
									}
								}, '-', {
									text : '修改',
									tooltip : '修改当前记录',
									iconCls : 'option',
									handler : function() {

										var row = Ext.getCmp("procedureGird")
												.getSelectionModel().selected.items
										if (row.length) {
											procedureOperation
													.updateProcedure();
										} else {
											Ext.Msg.alert('', "需要选中一条记录!");
											return;
										}
									}
								}, '-', {
									text : '参数管理',
									tooltip : '参数管理',
									iconCls : 'option',
									handler : function() {
										var row = Ext.getCmp("procedureGird")
												.getSelectionModel().selected.items
										if (row.length) {
											procedureOperation.paramManager();
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
										procedureStore.reload();
									}
								}]
					});

		}
		procedureStore.load();
		return win;
	}

});

Ext.define('procedure', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'procedureName',
						type : 'string'
					}, {
						name : 'content',
						type : 'string'
					}, {
						name : 'actionType',
						type : 'string'
					}, {
						name : 'actionSql',
						type : 'string'
					}]

		});

// 一个包含AjaxProxy代理的Store, 使用参数方式绑定.

var procedureStore = Ext.create('Ext.data.Store', {
			storeId : 'procedureStore',
			model : 'procedure',
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/procedure/getProcedures',
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});

Ext.define('procedureParam', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'procedureId',
						type : 'string'
					}, {
						name : 'procedureName',
						type : 'string'
					}, {
						name : 'paramCode',
						type : 'string'
					}, {
						name : 'paramName',
						type : 'string'
					}, {
						name : 'position',
						type : 'string'
					}, {
						name : 'content',
						type : 'string'
					}, {
						name : 'paramType',
						type : 'string'
					}, {
						name : 'alias',
						type : 'string'
					}, {
						name : 'inOrOut',
						type : 'string'
					}, {
						name : 'returnFlag',
						type : 'string'
					}]
		});

var paramStore = Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			model : 'procedureParam',
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/procedureParam/getProcedureParams',
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});

Ext.define('paramValMapping', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'paramId',
						type : 'string'
					}, {
						name : 'paramVal',
						type : 'string'
					}, {
						name : 'naming',
						type : 'string'
					}]
		});

var paramMappingStore = Ext.create('Ext.data.Store', {
			storeId : 'paramMappingStore',
			model : 'paramValMapping',
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : '/esb-gather/paramValMapping/findParamValMapping',
				reader : {
					type : 'json',
					root : 'root',
					totalProperty : 'total'
				}
			}
		});
