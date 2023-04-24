$(function(){
    $.post('http://127.0.0.1:8080/xadmin/blogs-update', { username: $('#userName').val(), password: $('#passWord').val(), email: $('#email').val() }, function (res) {
            if (res.status !== 0) {
                return console.log(res.message);
            } else {
                layer.msg('注册成功', { icon: 6, time: 1000 }, function () {
                    // 模拟人的点击
                    $('#zc_dl').click()
                });

            }

        })
})