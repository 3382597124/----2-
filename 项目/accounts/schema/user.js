const joi = require('joi')
/** 
* string() 值必须是字符串
* alphanum() 值只能是包含a-zA-Z0-9的字符串
* min(length)最小长度
* max(length)最大长度
* required()值是必填项，不能为undefined
* pattern(正侧表达式)值必须符合正则表达式的规则
*/

const username = joi.string().alphanum().min(4).max(10).required()
const password = joi.string().pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/).required()

// 定义验证注册和登录表单数据的规则

exports.rule_login_zc = {
    body:{
        username,
        password
    }
}