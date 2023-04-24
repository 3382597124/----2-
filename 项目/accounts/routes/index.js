var express = require('express');
var router = express.Router();
const db = require('../db/index')
const url = require('url')
var querystring = require("querystring");


// 渲染页面和文章
router.get('/', function (req, res, next) {
  const userinfo = req.body
  //获取返回的url对象的query属性值 
  var arg = url.parse(req.url).query;

  //将arg参数字符串反序列化为一个对象
  var params = querystring.parse(arg);
  var username = params.username
 
  const sqlStr = 'select * from article  order by time desc ;select * from header;select * from title;select time from article;'
  db.query(sqlStr,params.username,(err, results) => {
    //执行sql语句成功，但是获取到的数据小于等于0
    if (results.length <= 0) return res.cc('查询失败！')
    const wz = results[0].length
    res.render('index', { artcate: results[0], header: results[1], wz, title: results[2]})

  })
});

// 发布的api
router.post('/publish', function (req, res) {
  const userinfo = req.body
  const sqlStr = 'insert into article set ?'
  db.query(sqlStr, { title: userinfo.title, content: userinfo.content, author: userinfo.author, time: userinfo.time }, (err, results) => {

    // 判断sql语句是否正确
    if (err) return res.cc(err)

    // 判断是否插入成功
    if (results.affectedRows !== 1) {
      return res.cc('注册新用户失败，请稍后在试！')
    }
    res.cc('注册成功！', 0)

  })
});



module.exports = router;
