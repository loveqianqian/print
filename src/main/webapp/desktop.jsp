<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/extjs/examples/desktop/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>志伟' demo</title>

    <link rel="stylesheet" type="text/css" href="css/desktop.css"/>

    <script type="text/javascript" src="../shared/include-ext.js"></script>
    <script type="text/javascript" src="../shared/options-toolbar.js"></script>
    <script type="text/javascript" src="../../../extjs/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="DateTimeField.js"></script>
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
</head>

<body>
<a href="http://blog.csdn.net/sinat_17358633" target="_blank" alt="search" id="poweredby">
    <div></div>
</a>
</body>
</html>
