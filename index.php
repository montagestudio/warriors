<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx07f2d9deebe5e970", "7dff70b763fe36fe5745c7923a9da02c");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>Golden State Warriors</title>

    <link rel="stylesheet" href="assets/style/style.css" />

    <script src="./node_modules/montage/montage.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/montage-serialization">
    {
        "owner": {
            "prototype": "montage/ui/loader.reel"
        }
    }
    </script>
    <script>
        // 注意：所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
        // 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
        // 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
        wx.config({
            //debug:true,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
            'onMenuShareTimeline',
            'chooseImage'
        ]
        });
    </script>
</head>
<body>
    <div class="loading">Loading</div>
</body>
</html>
