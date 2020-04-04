var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* 引入基础模块 */
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");

const loginCheck = require("./middleware/loginCheck");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
const captchaRouter = require("./routes/captcha");
const fruitOperateRouter = require("./routes/fruit_operate");
const orderRouter = require("./routes/order");
const menuRouter = require("./routes/menu");
const statisticsRouter = require("./routes/statistics");
const authorityRouter = require("./routes/authority");

var app = express();

/* 跨域 */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://106.53.50.157:9999",
      "http://timo123.top:9999",
      "http://www.106.53.50.157:9999",
      "http://www.timo123.top:9999",
    ],
    credentials: true,
  })
);

/* session */
app.use(
  session({
    secret: "随机字符串",
    name: "myprocookie",
    resave: true,
    // sameSite: l,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60, secure: false },
  })
);

//应用body-parser中间件
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/captcha", captchaRouter);
app.use("/fruit", loginCheck); //登录之后才能操作水果信息
app.use("/fruit", fruitOperateRouter);
app.use("/order", loginCheck); //登录之后才能操作订单管理
app.use("/order", orderRouter);
// app.use("/menu", loginCheck); //登录之后才能查看菜单
app.use("/menu", menuRouter);
app.use("/statistics", statisticsRouter);
app.use("/authority", loginCheck);
app.use("/authority", authorityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
