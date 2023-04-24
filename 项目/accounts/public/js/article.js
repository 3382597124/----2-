$(function () {
    $('#article-fh').on('click', function () {
        location.replace("http://127.0.0.1:8080")
    })
    // 缩小后的导航栏效果
    $('#caidaBtn').on('click', () => {
        $('.neir').slideToggle(500)
    })

    $('#caida-nav li:eq(0) , .title-left , #title-right-nav li:eq(0)').on('click', function () {
        location.href = 'http://127.0.0.1:8080/'
    })

    $("#article-btn").on('click', function () {
        //页面层
        layer.open({
            type: 1 //Page层类型
            , skin: 'layui-layer-molv'
            , area: ['500px', '330px']
            , title: ['添加评论', 'background-image: linear-gradient(to right, #f64f5a ,#c96edc, #18bfe9);font-size:18px ']
            , btn: ['评论', '取消评论']
            , shadeClose: true
            , shade: 0 //遮罩透明度
            , maxmin: true //允许全屏最小化
            , content: $("#window")
            , yes: function () {
                var myDate = new Date;
                var year = myDate.getFullYear(); //获取当前年
                var mon = myDate.getMonth() + 1; //获取当前月
                var date = myDate.getDate(); //获取当前日
                var h = myDate.getHours();//获取当前小时数(0-23)
                var m = myDate.getMinutes();//获取当前分钟数(0-59)
                var s = myDate.getSeconds();//获取当前秒
                if ($('#content').val().trim() == '') {
                    return layer.msg('评论内容不能为空', { icon: 2, time: 1000 });
                }
                const time = year + '年' + mon + '月' + date + '日' + h + '时' + m + '分' + s + '秒'

                // 发布
                $.post('http://127.0.0.1:8080/article/pl', { content: $("#content").val(), time: time }, function (res) {

                    if (res.status !== 0) {
                        return console.log(res.message);
                    }
                    layer.msg('发布成功', { icon: 6, time: 1000 }, function () {
                        window.location.reload()
                    });

                })
            }
        });

    })
    
    $(".sc-btn").on('click', function () {
        var _this = this;
        var index = _this.getAttribute("index");
        console.log(index);
        $.post('http://127.0.0.1:8080/article/pl/delete', {id:index}, function (res) {

            if (res.status !== 0) {
                return console.log(res.message);
            }
            layer.msg('删除成功', { icon: 6, time: 1000 }, function () {
                window.location.reload()
            });

        })
    })

})