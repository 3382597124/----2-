var express = require('express');
var router = express.Router();
const db = require('../db/index')
const url = require('url')
var querystring = require("querystring");

router.get('/', function (req, res) {
  const userinfo = req.body
  //获取返回的url对象的query属性值 
  var arg = url.parse(req.url).query;

  //将arg参数字符串反序列化为一个对象
  var params = querystring.parse(arg);
  global.params = params
  module.exports.params = params;
  const time = params.time
  const sqlStr = 'select * from header;select * from article where id=?;select * from article;SELECT * FROM article,board,users WHERE board.uid=? AND article.id = board.uid AND board.aid = users.id ORDER BY `board`.`time` DESC'
  const sqldata = [params.id,params.id]
  db.query(sqlStr, sqldata, (err, results) => {

    var usersid = results[4]
    global.usersid = usersid
    module.exports.usersid = usersid;
    // 判断sql语句是否正确
    if (err) return res.cc(err)
    const aid = params.usesid;
    //执行sql语句成功，但是获取到的数据小于等于0
    if (results.length <= 0) return res.cc('查询失败！')
    
    res.render('article', { header: results[0], article: results[1][0], pl: results[3],username:results[3].username,aid:params.aid})


  })
})

router.post('/fwl', function (req, res) {
  const userinfo = req.body
  const visit = parseInt(userinfo.visit) + 1
  const id = parseInt(userinfo.id)
  const sqlStr = 'UPDATE `article` SET `visit`=? WHERE `id`=?'
  var inserts = [visit, id];


  db.query(sqlStr, inserts, (err, results) => {

    // 判断sql语句是否正确
    if (err) return res.cc(err)

    //执行sql语句成功，但是获取到的数据小于等于0
    if (results.length <= 0) return res.cc('修改失败！')



  })
})
//评论
router.post('/pl', function (req, res) {
  const data = req.body


  const sqlStr = 'insert into board set ?'
  db.query(sqlStr, { plContent: data.content, uid: params.id, time: data.time,aid:params.usesid}, (err, results) => {
    // 判断sql语句是否正确
    if (err) return res.cc(err)

    // 判断是否插入成功
    if (results.affectedRows !== 1) {
      return res.cc('评论失败，请稍后在试！')
    }
    res.cc('评论成功！', 0)

  })
})
router.post('/pl/delete', function (req, res) {
  const data = req.body
  const sql = `DELETE FROM board WHERE id = ?`
  
  db.query(sql, data.id, (err, results) => {

    // 判断sql语句是否正确
    if (err) return res.cc(err)

    // 判断是否插入成功
    if (results.affectedRows !== 1) {
      return res.cc('删除失败，请稍后在试！')
    }
    res.cc('删除成功！', 0)

  })
})

module.exports = router;