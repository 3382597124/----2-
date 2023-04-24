$(function () {

    // 标签的获取
    const dl_zc = document.getElementById('dl_zc')
    const zc_dl = document.getElementById('zc_dl')
    const box = document.querySelector('.box')
    const box2 = document.querySelector('.box2')



    // 邮箱的正则表达式
    const email_reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

    // 密码的正则表达式
    const passWord_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/

    // 点击登录框里面的注册按钮
    dl_zc.addEventListener('click', (e) => {
        e.preventDefault()
        box.style.display = 'none'
        box2.style.display = 'block'
    })

    // 点击注册框里的登录按钮
    zc_dl.addEventListener('click', (e) => {
        e.preventDefault()
        box2.style.display = 'none'
        box.style.display = 'block'
    })




    $('#rag_zc').on('submit', function (e) {

        e.preventDefault()
        // js判断表单数据
        if ($('#userName').val().trim() == '' || $('#password').val().trim() == '') {
            return  layer.msg('用户名或密码不能为空！', { icon: 5, time: 1000 });
           
        } else if (!passWord_reg.test($('#password').val().trim())) {
            return layer.msg('密码必须由数字、字母两种字符组成，长度在6-15位之间！', { icon: 5, time: 1000 });
        }
        else if ($('#password').val().trim() !== $('#ntPassWord').val().trim()) {
            return  layer.msg('两次密码不同！', { icon: 5, time: 1000 });
        } else if ($('#email').val().trim() == '') {
            return  layer.msg('邮箱不能为空！', { icon: 5, time: 1000 });
            
        } else if (!email_reg.test($('#email').val().trim())) {
            return  layer.msg('邮箱格式不正确！', { icon: 5, time: 1000 });
        }

        var myDate = new Date;
        var year = myDate.getFullYear(); //获取当前年
        var mon = myDate.getMonth() + 1; //获取当前月
        var date = myDate.getDate(); //获取当前日
        var h = myDate.getHours();//获取当前小时数(0-23)
        var m = myDate.getMinutes();//获取当前分钟数(0-59)
        var s = myDate.getSeconds();//获取当前秒
        const time = year + '年' + mon + '月' + date + '日' + h + '时' + m + '分' + s + '秒'

        var input = $('#file')[0];
        //图片上传成功后会将图片名称赋值给 value 属性
        if (input.value) {
            //使用 FormData 对象
            var formData = new FormData();
            //将图片对象添加到 files

            formData.append('userName', $('#userName').val())
            formData.append('password', $('#password').val())
            formData.append('email', $('#email').val())
            formData.append('time', time)
            formData.append('file', $('#file')[0].files[0])
            //使用 ajax 上传图片
            $.ajax({
                url: 'http://127.0.0.1:8080/users/reguser',
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
            }).done(function (res) {
                layer.msg(res.message, { icon: 6, time: 1000 }, function () {
                    $("#zc_dl").click()
                });
            }).fail(function (res) {
                console.log(res);
            });
        }



    })
    $('#rag_dl').on('submit', function (e) {
        e.preventDefault()
        const username = $('#rag_dl [name=username]')
        const password = $('#rag_dl [name=password]')
        if (username.val().trim() == '' || password.val().trim() == '') {
            return layer.msg('请输入账号密码！', { icon: 5, time: 1000 });
            
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/users/login',

            method: 'POST',

            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败', { icon: 5, time: 1000 });
                    
                
                }

                layer.msg('登陆成功', { icon: 6, time: 1000 }, function () {
                    window.location = 'http://127.0.0.1:8080/?username=' + $("#dl-username").val()+'&'+'usesid='+res.data.id
                });


            }
        })
    })
    const div = document.getElementById("picture");
    const file = document.querySelector('input[type="file"]');
    function fn() {
        file.oninput = function () {
            if (file.files && file.files[0]) {
                //  读取文件对象
                let reader = new FileReader();
                reader.onload = function (evt) {
                    let src = evt.target.result;
                    const img = document.createElement('img');
                    div.appendChild(img);
                    img.src = src;
                }
                // 将文件读取为 DataURL
                reader.readAsDataURL(file.files[0]);
            }
        }
    }
    div.addEventListener('click', function (e) {
        // file模拟input点击事件
        var evt = new MouseEvent("click", {
            bubbles: false,
            cancelable: true,
            view: window,
        });
        file.dispatchEvent(evt, fn());
    }, false);
})