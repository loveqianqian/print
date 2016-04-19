<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>数据集成平台监控主界面</title>

    <link rel="stylesheet" type="text/css" href="css/desktop.css" />

    <!-- GC -->

    <!-- <x-compile> -->
    <!-- <x-bootstrap> -->
    <script type="text/javascript" src="../../examples/shared/include-ext.js"></script>
    <script type="text/javascript" src="../../examples/shared/options-toolbar.js"></script>
    <!-- </x-bootstrap> -->
    <script type="text/javascript">
        Ext.Loader.setPath({
            'Ext.ux.desktop': 'js',
            MyDesktop: ''
        });

        Ext.require('MyDesktop.App');

        var myDesktopApp;
        Ext.onReady(function () {
            myDesktopApp = new MyDesktop.App();
        });
    </script>
    <!-- </x-compile> -->
</head>

<body>

    <a href="http://www.ghcchina.com.cn/" target="_blank" alt="凯华国软(北京)科技有限公司"  id="poweredby"><div></div></a>

</body>
</html>
