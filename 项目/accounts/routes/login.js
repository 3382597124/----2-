var express = require('express');
var router = express.Router();

// 导入数据库操作模块
const db = require('../db/index')

// 导入密码加密模块
const bcrypt = require('bcryptjs')

// 导入全局的配置文件
const config = require('../config')

const multiparty = require('multiparty')

//渲染api
router.get('/render', function (req, res, next) {
  res.render('login')
});




//注册api

router.post('/reguser', function (req, res) {

  var form = new multiparty.Form();
  form.uploadDir = './public/images'
  form.parse(req, function (err, fields, files) {
    // 定义sql语句查询用户名是否被占用
    const sqlStr = `select * from users where username=?`

    db.query(sqlStr, fields.userName[0], function (err, results) {
      // 判断sql语句是否错误
      if (err) {
        return res.cc(err)
      }
      // 判断用户名是否被占用
      if (results.length > 0) {
        return res.cc('用户名被占用，请更换用户名!')
      }

      // 调用bcryptjs来对密码进行加密
      fields.password[0] = bcrypt.hashSync(fields.password[0], 10)


      // 插入新用户到数据库
      const sql = `insert into users set ?`
      const pic = (files.file[0].path).substring(6)
      
      db.query(sql, { username: fields.userName[0], password: fields.password[0], email: fields.email[0],images:pic, time: fields.time[0]}, function (err, results) {
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

});


//登录api
router.post('/login', function (req, res) {
  // 接收表单数据
  const userinfo = req.body

  const sqlStr = 'select * from users where username=?'

  db.query(sqlStr, userinfo.username, (err, results) => {
    // 判断sql语句是否正确
    if (err) return res.cc(err)

    //执行sql语句成功，但是获取到的数据不等于1
    if (results.length !== 1) return res.cc('登录失败！')

    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败!')

    const user = { ...results[0], password: '' }
    // 对用户信息进行加密，生成Token字符串
    // const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
    res.send({
      status: 0,
      message: '登录成功',
      data:{
        id:results[0].id
      }
    })
  })
})


module.exports = router;
