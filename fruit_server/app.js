var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* 引入基础模块 */
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");

var app = express();

/* 跨域 */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://106.53.50.157:9999",
      "http://timo123.top:9999",
      "http://106.53.50.157:8080",
      "http://timo123.top:8080"
    ],
    credentials: true
  })
);

/* session */
app.use(
  session({
    secret: "随机字符串",
    cookie: { maxAge: 1000 * 60 * 30 }, //过期时间ms 30分钟
    name: "mycookie",
    resave: true,
    saveUninitialized: true
  })
);

//应用body-parser中间件
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var employeeRouter = require("./routes/employee");
var furitOpperateRouter = require("./routes/furit_operate");
var userRouter = require("./routes/user");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/emp", employeeRouter);
app.use("/fruit", furitOpperateRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
