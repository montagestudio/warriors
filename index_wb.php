<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>Golden State Warriors</title>
    <link rel="stylesheet" href="assets/style/style.css"/>
    <script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1990177032&debug=true" type="text/javascript"
            charset="utf-8"></script>
    <script>
        window.twttr = (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = [];
            t.ready = function (f) {
                t._e.push(f);
            };

            return t;
        }(document, "script", "twitter-wjs"));
        twttr.ready(
            function (twttr) {
                twttr.widgets.createShareButton(
                    'https://lx179.com/',
                    document.getElementById('container'),
                    {
                        text: 'Hello World'
                    }
                ).then(function () {
                        debugger
                    });
            }
        );

    </script>
    <script>
        WB2.anyWhere(function (W) {
            W.widget.connectButton({
                id: "wb_connect_btn",
                type: '3,2',
                callback: {
                    login: function (o) { //登录后的回调函数
                        alert("login: " + o.screen_name)
                    },
                    logout: function () { //退出后的回调函数
                        alert('logout');
                    }
                }
            });
            W.widget.publish({
                'id': 'wb_publish',
                'default_text': '预置方案　& \r\n我可以换行.',
                'callback': function (o) {
                    alert('aaaa')
                }
            });
        });
    </script>
</head>
<body>
<div class="loading">Loading
    <div id="wb_connect_btn">登录</div>
    <button type="button" id="wb_publish">发布微薄</button>
    <div id="container">发布Twitter</div>
</div>
</body>
</html>
