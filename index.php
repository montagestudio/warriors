<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx18749543dc165888", "75332781bf136e2318b699b086c2d110");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title data-montage-id="title">Golden State Warriors Quiz</title>
    <link href="//fonts.googleapis.com/css?family=Arvo:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="assets/style/style.css" />
    <meta property="og:title" content="Golden State Warriors Quiz" />
    <meta property="og:image" content="https://warriors.mybluemix.net/assets/image/CoverImage.jpg">
    <meta property="fb:app_id" content="1050476961649936" />
    <meta property="og:url" content="https://warriors.mybluemix.net/" />

    <script src="./node_modules/montage/montage.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/montage-serialization">
    {
        "owner": {
            "prototype": "montage/ui/loader.reel"
        },
        "applicationDelegate": {
            "prototype": "core/application-delegate"
        },
        "application": {
            "prototype": "montage/core/application",
            "properties": {
                "delegate": {"@": "applicationDelegate"}
            }
        },
        "title": {
            "prototype": "montage/ui/text.reel",
            "properties": {
                "element": {"#": "title"}
            },
            "localizations": {
                "value": {"key": "Golden State Warriors Quiz"}
            }
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
            timestamp: '<?php echo $signPackage["timestamp"];?>',
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
    <div class="Main loader">
        <div class="header">
            <img src="assets/image/warriors_quiz.png" alt="warriors quiz title image">
            <h1>Warriors Quiz</h1>
        </div>
        <div class="content">
            <div class="intro">
                <div class="logo"></div>
                <div class="intro-container">
                    <div class="intro-text" data-montage-id="quizTitle">How well do you know the 2015 NBA Champions?</div>
                    <div class="intro-text" data-montage-id="quizTimeDescription">You have 1 minute to find out!</div>
                    <button data-montage-id="startQuiz" style="visibility: hidden;" class="btn btn--inline">Start Quiz</button>
                    <div class="loading">
                        <div class="ball-container">
                            <span>Loading</span>
                            <svg class="basketball" viewBox="0 0 866 866" xmlns="http://www.w3.org/2000/svg">
                                <path class="bb-0" d="M142.327 112.062C214.1 47.017 307.79 5.714 411 .55V410.5H280.346c-8.144-184.333-121.358-284.64-138.02-298.438z" fill="currentColor"/>
                                <path class="bb-1" d="M111.104 143.388C46.716 214.908 5.822 307.995.574 410.5h235.893c-7.19-145.817-109.942-251.965-125.363-267.112z" fill="currentColor"/>
                                <path class="bb-2" d="M110.902 722.388C46.422 650.666 5.552 557.292.524 454.5h235.788c-8.297 149.66-114.564 257.273-125.41 267.888z" fill="currentColor"/>
                                <path class="bb-3" d="M141.633 753.308C213.497 818.716 307.458 860.268 411 865.45V454.5H280.354c-8.297 189.4-127.334 289.638-138.72 298.808z" fill="currentColor"/>
                                <path class="bb-4" d="M723.222 754.346C651.507 819.156 557.992 860.296 455 865.45V454h129.39c7.743 190.638 127.705 291.398 138.832 300.346z" fill="currentColor"/>
                                <path class="bb-5" d="M754.06 723.538C819.244 651.55 860.555 557.54 865.5 454H628.416c7.704 151.184 115.666 259.807 125.644 269.538z" fill="currentColor"/>
                                <path class="bb-6" d="M754.82 143.302C819.145 214.716 860.042 307.652 865.4 410H628.418c8.043-149.258 115.93-256.613 126.4-266.698z" fill="currentColor"/>
                                <path class="bb-7" d="M723.687 112.075C651.91 47.022 558.217 5.715 455 .55V410h129.53c8.944-188.743 128.016-288.947 139.157-297.925z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" class="flashes">
            <g>
                <path class="flash1" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash2" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash3" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash4" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash5" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash6" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash7" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
                <path class="flash8" d="M2.348 2.614c.25.834 1.025 1.44 1.94 1.44s1.69-.606 1.94-1.44l2.335-.584-2.335-.584C5.978.613 5.203.006 4.288.006s-1.69.607-1.94 1.44L.013 2.03l2.335.584z" fill="currentColor"></path>
            </g>
        </svg>
    </div>
    <img src="assets/image/GSW-Home-Court.jpg" style="opacity: 0; width: 0; height: 0" >
    <!--fixme: workaround for the canDrawGate issue-->
    <div style="visibility:hidden">
        <img src="assets/image/posters/0.jpg"  >
        <img src="assets/image/posters/1.jpg"  >
        <img src="assets/image/posters/2.jpg"  >
        <img src="assets/image/posters/3.jpg"  >
        <img src="assets/image/posters/4.jpg"  >
        <img src="assets/image/posters/5.jpg"  >
        <img src="assets/image/posters/6.jpg"  >
        <img src="assets/image/posters/7.jpg"  >
        <img src="assets/image/posters/8.jpg"  >
        <img src="assets/image/posters/9.jpg"  >
        <img src="assets/image/posters/10.jpg"  >
        <img src="assets/image/posters/11.jpg"  >
        <img src="assets/image/posters/12.jpg"  >
        <img src="assets/image/posters/13.jpg"  >
    </div>
</body>
</html>
