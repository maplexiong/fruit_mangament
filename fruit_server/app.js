/* 引入基础模块 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
/* 引入路由模块 */
const adminRouter = require("./routes/admin");

/* 创建服务器 */
let app = express();
/* 托管静态资源 */
app.use(express.static("./public"));

/* 跨域 */
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:5500"],
    credentials: true
  })
);
/* session */
app.use(
  session({
    secret: "随机字符串",
    cookie: { maxAge: 60 * 1000 * 30 }, //过期时间ms
    resave: true,
    saveUninitialized: true
  })
);
/* 挂载路由 */
app.use("/admin", adminRouter);

//应用body-parser中间件
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.listen(6060, () => {
  console.log("port 6060 start ...");
});

// module.exports = app;
