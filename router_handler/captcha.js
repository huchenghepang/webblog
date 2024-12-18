const svgCaptcha = require('svg-captcha');



async function captchaHandler(req,res){
    try {
        const captcha = svgCaptcha.create({
            size:4,// 验证码长度
            noise:3,// 干扰线条的长度
            color:true,// 是否使用彩色
            background:"#cc9966" // 背景色
        })
    
        // 保存验证码到session
        req.session.captcha = captcha.text.toLowerCase() // 转为小写
        res.type('svg');
        res.status(200).send(captcha.data);
    } catch (error) {
        res.sendError('获取验证码错误');
    }
}


module.exports = {
    captchaHandler
}