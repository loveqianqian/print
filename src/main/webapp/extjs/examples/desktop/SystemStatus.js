var channel = Ext.define("channel", {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'sysCode',
		type : 'string'
	}, {
		name : 'process',
		type : 'string'
	} ]
})

var monitorStore;

reloadMonitorStore = function() {
	Ext.Ajax.request({
		url : "/esb-gather/app/channelMonitor",
		method : "POST",
		async : false, // ASYNC 是否异步( TRUE 异步 , FALSE 同步)
		success : function(response, opts) {
			var temp = Ext.JSON.decode(response.responseText);
			monitorStore = temp['success'];
		}, // 请求成功的回调函数
		failure : function(response, opts) {
			Ext.Msg.alert("", "获取目录请求失败！");
		} // 请求失败的回调函数
	});
}

var maximum = 50;
Ext
		.define(
				'MyDesktop.SystemStatus',
				{
					extend : 'Ext.ux.desktop.Module',

					requires : [ 'Ext.chart.*', 'Ext.data.JsonStore' ],

					id : 'systemstatus',

					refreshRate : 500,

					init : function() {
						// No launcher means we don't appear on the Start
						// Menu...
						this.launcher = {
							text : 'SystemStatus',
							iconCls : 'cpustats'
						};

						Ext.chart.theme.Memory = Ext
								.extend(
										Ext.chart.theme.Base,
										{
											constructor : function(config) {
												Ext.chart.theme.Memory.superclass.constructor
														.call(
																this,
																Ext
																		.apply(
																				{
																					colors : [
																							'rgb(244, 16, 0)',
																							'rgb(248, 130, 1)',
																							'rgb(0, 7, 255)',
																							'rgb(84, 254, 0)' ]
																				},
																				config));
											}
										});
					},

					createNewWindow : function() {
						var me = this, desktop = me.app.getDesktop();

						me.cpuLoadData = [];
						me.cpuLoadStore = Ext.create('store.json', {
							fields : [ 'LIS', 'PACS', 'HIS', 'ANES', 'EMR',
									'MCIS', 'time' ]
						});

						me.memoryArray = [ 'Wired', 'Active', 'Inactive',
								'Free' ];
						me.memoryStore = Ext.create('store.json', {
							fields : [ 'name', 'memory' ],
							data : me.generateData(me.memoryArray)
						});

						me.pass = 0;
						me.processArray = [ 'explorer', 'monitor', 'charts',
								'desktop', 'Ext3', 'Ext4' ];
						me.processesMemoryStore = Ext.create('store.json', {
							fields : [ 'name', 'memory' ],
							data : me.generateData(me.processArray)
						});

						me.generateCpuLoad();

						return desktop.createWindow({
							id : 'systemstatus',
							title : 'System Status',
							width : 1024,
							height : 600,
							animCollapse : false,
							constrainHeader : true,
							border : false,
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							bodyStyle : {
								'background-color' : '#FFF'
							},
							listeners : {
								afterrender : {
									fn : me.updateCharts,
									delay : 100
								},
								destroy : function() {
									clearTimeout(me.updateTimer);
									me.updateTimer = null;
								},
								scope : me
							},
							items : [
									{
										flex : 1,
										xtype : 'container',
										layout : {
											type : 'vbox',
											align : 'stretch'
										},
										items : [ me.createCpu1LoadChart(),
												me.createCpu2LoadChart(),
												me.createCpu3LoadChart(),
												me.createCpu4LoadChart(),
												me.createCpu5LoadChart(),
												me.createCpu6LoadChart() ]
									},
									{
										flex : 1,
										xtype : 'container',
										layout : {
											type : 'vbox',
											align : 'stretch'
										},
										items : [ me.createMemoryPieChart(),
												me.createProcessChart() ]
									} ]
						});
					},

					createWindow : function() {
						var win = this.app.getDesktop().getWindow(this.id);
						if (!win) {
							win = this.createNewWindow();
						}
						return win;
					},

					createCpu1LoadChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category1',
							animate : false,
							store : this.cpuLoadStore,
							legend : {
								position : 'bottom'
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : maximum,
								fields : [ 'LIS' ],
								title : 'Chennel Load',
								grid : true,
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							} ],
							series : [ {
								title : 'LIS System',
								type : 'line',
								lineWidth : 4,
								showMarkers : false,
								fill : true,
								axis : 'left',
								xField : 'time',
								yField : 'LIS',
								style : {
									'stroke-width' : 1
								}
							} ]
						};
					},

					createCpu2LoadChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category2',
							animate : false,
							store : this.cpuLoadStore,
							legend : {
								position : 'bottom'
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : maximum,
								grid : true,
								fields : [ 'PACS' ],
								title : 'Chennel Load',
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							} ],
							series : [ {
								title : 'PACS System',
								type : 'line',
								lineWidth : 4,
								showMarkers : false,
								fill : true,
								axis : 'left',
								xField : 'time',
								yField : 'PACS',
								style : {
									'stroke-width' : 1
								}
							} ]
						};
					},

					createCpu3LoadChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category3',
							animate : false,
							store : this.cpuLoadStore,
							legend : {
								position : 'bottom'
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : maximum,
								grid : true,
								fields : [ 'HIS' ],
								title : 'Chennel Load',
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							} ],
							series : [ {
								title : 'HIS System',
								type : 'line',
								lineWidth : 4,
								showMarkers : false,
								fill : true,
								axis : 'left',
								xField : 'time',
								yField : 'HIS',
								style : {
									'stroke-width' : 1
								}
							} ]
						};
					},
					createCpu4LoadChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category4',
							animate : false,
							store : this.cpuLoadStore,
							legend : {
								position : 'bottom'
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : maximum,
								fields : [ 'ANES' ],
								title : 'Chennel Load',
								grid : true,
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							} ],
							series : [ {
								title : 'ANES System',
								type : 'line',
								lineWidth : 4,
								showMarkers : false,
								fill : true,
								axis : 'left',
								xField : 'time',
								yField : 'ANES',
								style : {
									'stroke-width' : 1
								}
							} ]
						};
					},

					createCpu5LoadChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category5',
							animate : false,
							store : this.cpuLoadStore,
							legend : {
								position : 'bottom'
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : maximum,
								fields : [ 'EMR' ],
								title : 'Chennel Load',
								grid : true,
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							} ],
							series : [ {
								title : 'EMR System',
								type : 'line',
								lineWidth : 4,
								showMarkers : false,
								fill : true,
								axis : 'left',
								xField : 'time',
								yField : 'EMR',
								style : {
									'stroke-width' : 1
								}
							} ]
						};
					},
					createCpu6LoadChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category6',
							animate : false,
							store : this.cpuLoadStore,
							legend : {
								position : 'bottom'
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : maximum,
								fields : [ 'MCIS' ],
								title : 'Chennel Load',
								grid : true,
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							} ],
							series : [ {
								title : 'MCIS System',
								type : 'line',
								lineWidth : 4,
								showMarkers : false,
								fill : true,
								axis : 'left',
								xField : 'time',
								yField : 'MCIS',
								style : {
									'stroke-width' : 1
								}
							} ]
						};
					},
					createMemoryPieChart : function() {
						var me = this;

						return {
							flex : 1,
							xtype : 'chart',
							animate : {
								duration : 250
							},
							store : this.memoryStore,
							shadow : true,

							legend : {
								position : 'right'
							},
							insetPadding : 40,
							theme : 'Memory:gradients',
							series : [ {
								donut : 30,
								type : 'pie',
								field : 'memory',
								showInLegend : true,
								tips : {
									trackMouse : true,
									width : 140,
									height : 28,
									renderer : function(storeItem, item) {
										// calculate percentage.
										var total = 0;
										me.memoryStore.each(function(rec) {
											total += rec.get('memory');
										});
										this.setTitle(storeItem.get('name')
												+ ': '
												+ Math.round(storeItem
														.get('memory')
														/ total * 100) + '%');
									}
								},
								highlight : {
									segment : {
										margin : 20
									}
								},
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									field : 'name',
									display : 'rotate',
									contrast : true,
									font : '12px Arial'
								}
							} ]
						};
					},

					createProcessChart : function() {
						return {
							flex : 1,
							xtype : 'chart',
							theme : 'Category1',
							store : this.processesMemoryStore,
							animate : {
								easing : 'ease-in-out',
								duration : 750
							},
							axes : [ {
								type : 'Numeric',
								position : 'left',
								minimum : 0,
								maximum : 10,
								fields : [ 'memory' ],
								title : 'Memory',
								labelTitle : {
									font : '13px Arial'
								},
								label : {
									font : '11px Arial'
								}
							}, {
								type : 'Category',
								position : 'bottom',
								fields : [ 'name' ],
								title : 'System Processes',
								labelTitle : {
									font : 'bold 14px Arial'
								},
								label : {
									rotation : {
										degrees : 45
									}
								}
							}, {
								type : 'Numeric',
								position : 'top',
								fields : [ 'memory' ],
								title : 'Memory Usage',
								labelTitle : {
									font : 'bold 14px Arial'
								},
								label : {
									fill : '#FFFFFF',
									stroke : '#FFFFFF'
								},
								axisStyle : {
									fill : '#FFFFFF',
									stroke : '#FFFFFF'
								}
							} ],
							series : [ {
								title : 'Processes',
								type : 'column',
								xField : 'name',
								yField : 'memory',
								renderer : function(sprite, record, attr,
										index, store) {
									var lowColor = Ext.draw.Color
											.fromString('#b1da5a'), value = record
											.get('memory'), color;

									if (value > 5) {
										color = lowColor.getDarker(
												(value - 5) / 15).toString();
									} else {
										color = lowColor.getLighter(
												((5 - value) / 20)).toString();
									}

									if (value >= 8) {
										color = '#CD0000';
									}

									return Ext.apply(attr, {
										fill : color
									});
								}
							} ]
						};
					},

					generateCpuLoad : function() {
						var me = this, data = me.cpuLoadData;
						var index = 0;
						reloadMonitorStore();
						function generate(q) {
							var resultVal = 0;
							for ( var i = 0; i < monitorStore.length; i++) {
								index = (index + 1);
								if (q == monitorStore[i]['sysCode']) {
									if (index % 6 == 0) {
										if (index > 10000) {
											index = 0;
										}
										reloadMonitorStore();
									}
									resultVal = parseInt(monitorStore[i]['process']);
								}
							}
							return resultVal;
						}

						if (data.length === 0) {
							data.push({
								LIS : 0,
								PACS : 0,
								HIS : 0,
								ANES : 0,
								EMR : 0,
								MCIS: 0,
								time : 0
							});

							for ( var i = 1; i < 100; i++) {
								data.push({
									LIS : generate("LIS"),
									PACS : generate("PACS"),
									HIS : generate("HIS"),
									ANES : generate("ANES"),
									EMR : generate("EMR"),
									MCIS :generate("MCIS"),
									time : i
								});
							}

							me.cpuLoadStore.loadData(data);
						} else {
							me.cpuLoadStore.data.removeAt(0);
							me.cpuLoadStore.data.each(function(item, key) {
								item.data.time = key;
							});

							var lastData = me.cpuLoadStore.last().data;
							me.cpuLoadStore.loadData([ {
								LIS : generate("LIS"),
								PACS : generate("PACS"),
								HIS : generate("HIS"),
								ANES : generate("ANES"),
								EMR : generate("EMR"),
								MCIS : generate("MCIS"),
								time : lastData.time + 1
							} ], true);
						}

					},

					generateData : function(names) {
						var data = [], i, rest = names.length, consume;

						for (i = 0; i < names.length; i++) {
							consume = Math.floor(Math.random() * rest * 100) / 100 + 2;
							rest = rest - (consume - 5);
							data.push({
								name : names[i],
								memory : consume
							});
						}
						return data;
					},

					updateCharts : function() {
						var me = this;
						clearTimeout(me.updateTimer);
						me.updateTimer = setTimeout(function() {
							var start = new Date().getTime();
							if (me.pass % 3 === 0) {
								me.memoryStore.loadData(me
										.generateData(me.memoryArray));
							}

							if (me.pass % 5 === 0) {
								me.processesMemoryStore.loadData(me
										.generateData(me.processArray));
							}

							me.generateCpuLoad();

							var end = new Date().getTime();

							// no more than 25% average CPU load
							me.refreshRate = Math.max(me.refreshRate,
									(end - start) * 4);

							me.updateCharts();
							me.pass++;
						}, me.refreshRate);
					}
				});
