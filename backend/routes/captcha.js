/**
 * 验证码模块
 */

const express = require("express");
const svgCaptcha = require("svg-captcha");
let router = express.Router();

router.get("/login", (req, res, next) => {
  let options = {
    size: 4,
    ignoreChars: "0oO1liI",
    noise: 2,
    color: true,
    background: "#efe",
    width: 120,
    height: 40,
  };
  let c = svgCaptcha.create(options); //创建验证码文字+图片
  // {text: 'ab29', data: '<svg>....</svg>'}
  req.session.loginCaptcha = c.text.toLowerCase();
  console.log("yzm: ", req.session.loginCaptcha);
  res.type("svg");
  res.send(c.data);
});

module.exports = router;
