var express = require('express');
var router = express.Router();

// 导入数据库操作模块
const db = require('../db/index');

// 导入密码加密模块
const bcrypt = require('bcryptjs')

// 导入全局的配置文件
const config = require('../config')

router.get('/', function (req, res) {
    res.render('xadmin')
})


// 修改博客名api
router.post('/blogs/update', function (req, res) {
    const title = req.body
    const sql = `UPDATE title SET title=? WHERE id=1`
    db.query(sql, title.title, function (err, results) {

        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('修改失败！')
        } else {
            return res.cc('修改成功！', 0)
        }
    })
})


//获取菜单栏数据api
router.get('/menus', function (req, res) {
    // 接收表单数据
    const userinfo = req.body
    const sqlStr = 'select * from header'

    db.query(sqlStr, userinfo.username, (err, results) => {

        // 判断sql语句是否正确
        if (err) return res.cc(err)

        //执行sql语句成功，但是获取到的数据小于等于0
        if (results.length <= 0) {
            return res.cc('查询失败！')
        } else {

            res.json({
                "code": 0,
                "msg": "",
                "count": results.length,
                "data": results
            });
        }
    })
})


// 删除菜单栏数据api
router.post('/blogs/delete', function (req, res) {
    const title = req.body
    const sql = `DELETE FROM header WHERE id = ?`
    db.query(sql, title.id, function (err, results) {

        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('删除失败！')
        } else {
            return res.cc('删除成功！', 0)
        }
    })
})

// 添加菜单栏数据api
router.post('/blogs/insert', function (req, res) {
    const title = req.body
    const sql = 'insert  header set ?'
    db.query(sql, { name: title.name, icon: title.icon }, function (err, results) {
       
        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('添加失败！')
        } else {
            return res.cc('添加成功！', 0)
        }
    })
})
// 编辑菜单栏数据api
router.post('/caida/update', function (req, res) {
    const data = req.body
    const sqlStr = 'UPDATE header SET name =?,icon =? WHERE id = ?'
    var inserts = [data.name, data.icon, data.id];
    db.query(sqlStr, inserts, function (err, results) {

        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('编辑失败！')
        } else {
            return res.cc('编辑成功！', 0)
        }
    })
})


// 获取文章信息api

router.get('/article', function (req, res) {
    // 接收表单数据
    const userinfo = req.body
    const sqlStr = 'select * from article'

    db.query(sqlStr, (err, results) => {

        // 判断sql语句是否正确
        if (err) return res.cc(err)

        //执行sql语句成功，但是获取到的数据小于等于0
        if (results.length <= 0) {
            return res.cc('查询失败！')
        } else {

            res.json({
                "code": 0,
                "msg": "",
                "count": results.length,
                "data": results
            });
        }
    })
})

// 删除文章数据api
router.post('/article/delete', function (req, res) {
    const data = req.body
    const sql = `DELETE FROM article WHERE id = ?`
    db.query(sql, data.id, function (err, results) {
       
        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('删除失败！')
        } else {
            return res.cc('删除成功！', 0)
        }
    })
})

// 添加文章数据api
router.post('/article/insert', function (req, res) {
    const data = req.body
    const sql = 'insert article set ?'
    console.log(data);
    db.query(sql, { title: data.title, content: data.content, time: data.time, author: data.author, visit: data.visit }, function (err, results) {
        
        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('添加失败！')
        } else {
            return res.cc('添加成功！', 0)
        }
    })
})
// 编辑文章数据api
router.post('/article/update', function (req, res) {
    const data = req.body
    const sqlStr = 'UPDATE article SET title=?,content=?,author=?,visit=? WHERE id=?'
    var inserts = [data.title, data.content, data.author, data.visit, data.id];

    db.query(sqlStr, inserts, function (err, results) {
        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('编辑失败！')
        } else {
            return res.cc('编辑成功！', 0)
        }
    })
})



// 获取用户信息api

router.get('/users', function (req, res) {
    // 接收表单数据
    const userinfo = req.body
    const sqlStr = 'select * from users'

    db.query(sqlStr, (err, results) => {

        // 判断sql语句是否正确
        if (err) return res.cc(err)

        //执行sql语句成功，但是获取到的数据小于等于0
        if (results.length <= 0) {
            return res.cc('查询失败！')
        } else {

            res.json({
                "code": 0,
                "msg": "",
                "count": results.length,
                "data": results
            });
        }
    })
})

// 删除用户数据api
router.post('/users/delete', function (req, res) {
    const data = req.body
    const sql = `DELETE FROM users WHERE id = ?`
    db.query(sql, data.id, function (err, results) {
        
        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功，但是获取到的数据不等于1
        if (results.affectedRows !== 1) {
            return res.cc('删除失败！')
        } else {
            return res.cc('删除成功！', 0)
        }
    })
})

// 添加用户数据api
router.post('/users/insert', function (req, res) {
    const userinfo = req.body
    // 定义sql语句查询用户名是否被占用
    const sqlStr = `select * from users where username=?`
    db.query(sqlStr, userinfo.username, function (err, results) {
        // 判断sql语句是否错误
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换用户名!')
        }

        // 调用bcryptjs来对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)


        // 插入新用户到数据库
        const sql = `insert into users set ?`

        db.query(sql, { username: userinfo.username, password: userinfo.password, email: userinfo.email, time: userinfo.time }, function (err, results) {
            // 判断sql语句是否错误
            if (err) {
                return res.cc(err)
            }

            // 判断是否插入成功
            if (results.affectedRows !== 1) {
                return res.cc('注册新用户失败，请稍后在试！')
            }
            res.cc('注册成功！', 0)
        })
    })
})
// 编辑用户数据api
router.post('/users/update', function (req, res) {
    const userinfo = req.body
    // 调用bcryptjs来对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    
    const sqlStr = 'UPDATE users SET username=?,password=?,email=?,time=? WHERE id=?'
    var inserts = [userinfo.username, userinfo.password, userinfo.email,userinfo.time, userinfo.id];

     

    db.query(sqlStr, inserts, function (err, results) {

        // 调用bcryptjs来对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)


        db.query(sqlStr,inserts, function (err, results) {
            // 判断sql语句是否错误
            if (err) {
                return res.cc(err)
            }

            // 判断是否插入成功
            if (results.affectedRows !== 1) {
                return res.cc('编辑用户失败，请稍后在试！')
            }
            res.cc('编辑成功！', 0)
        })
    })
})

// 获取评论信息api

router.get('/pl', function (req, res) {
    // 接收表单数据
    const userinfo = req.body
    const sqlStr = 'select * from board'

    db.query(sqlStr, (err, results) => {

        // 判断sql语句是否正确
        if (err) return res.cc(err)

        //执行sql语句成功，但是获取到的数据小于等于0
        if (results.length <= 0) {
            return res.cc('查询失败！')
        } else {

            res.json({
                "code": 0,
                "msg": "",
                "count": results.length,
                "data": results
            });
        }
    })
})
module.exports = router;