const express = require("express")
const router = express.Router()
const { registerHandler, loginHandler } = require("../router_handler/user")
const { getArticleCategoriesInfo} = require("../router_handler/categories")


// 数据验证
//导入数据验证的中间件
// const Joi = require("joi")
// 导入验证的规则
const { register_login_schema } = require("../schema/user")
const { captchaHandler } = require("../router_handler/captcha")

router.post("/register", (req, res) => {
    /* 判断图形验证码是否正确不正常则提醒 验证码错误 */
    const userCaptcha = req.body.captcha?.toLowerCase();
    if (!userCaptcha) {
        res.sendError('验证码不存在', 400);
        return
    }
    if (userCaptcha !== req.session.captcha) {
        res.sendError('验证码不正确', 400);
        return
    }
    req.session.destroy((err) => {
        if (err) {
            return res.sendError('处理验证码错误', 400);
        }
    });

    // let obj = Object.assign({},req.body)
    let { value: { account, password }, error } = register_login_schema.validate(req.body)
    if (!error) {
        registerHandler(account, password, res)
    } else {
        res.sendError(error, 400)
    }
})

router.post("/login", (req, res) => {
    /* 判断图形验证码是否正确不正常则提醒 验证码错误 */
    const userCaptcha = req.body.captcha?.toLowerCase();
    // console.log(req.session.captcha)
    // console.log(userCaptcha)
    if (!userCaptcha) {
        res.sendError('验证码不存在', 400);
        return
    }
    if (userCaptcha !== req.session.captcha) {
        res.sendError('验证码不正确', 400);
        return
    }
    req.session.destroy((err) => {
        if (err) {
            return res.sendError('处理验证码错误', 400);
        }
    });
    let { value: { account, password }, error } = register_login_schema.validate(req.body)
    if (!error) {
        loginHandler(account, password, res)
    } else {
        console.log(error)
        res.sendError(error, 400)
    }
})



/* 获取分类的信息 */
router.get("/getcategory", async (req, res) => {
    //从mysql获取数据
    await getArticleCategoriesInfo(res);
});





/* 获取验证码 */
router.get("/captcha", async (req, res) => {
    await captchaHandler(req, res)
    
})

module.exports = router