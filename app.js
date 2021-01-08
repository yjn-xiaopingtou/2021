// 错误处理的包  createError 
var createError = require('http-errors');
var express = require('express');
var path = require('path');

// 路由守卫包
var cookieParser = require('cookie-parser')
var session = require('express-session')
//日志的一个引入包  暂时知道这些就行了  
var logger = require('morgan');
// 路由表
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var bannerRouter = require('./routes/banner');

var staffRouter = require('./routes/staff');

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
const { Cookie } = require('express-session');
var app = express();
// view engine setup
//设置ejs 引擎的一个寻找路径  
app.set('views', path.join(__dirname, 'views'));
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志   next() 会在底层内部执行  肉眼看不见
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));
//配置 ejs  里面寻找的静态文件的一个路径  
app.use(express.static(path.join(__dirname, 'public')));


// cookie  看门狗守卫
app.use(cookieParser())
// // cookie路由守卫
// app.all('*', (req, res, next) => {
//   console.log('进入all cookie守卫了');
//   console.log('req.url', req.url);

//   if (req.cookies.isLogin === 'ok' || req.url === '/login' || req.url === '/login/in') {
//     next()
//   } else {
//     res.redirect('/login')
//   }
// })


// session看门狗
app.use(
  session({
    // 加密
    secret: 'hfsh',
    // 强制保存
    resave: false,
    // 初始化session存储
    saveUninitialized: true,
    // 设置过期时间
    cookie: { maxAge: 1000 * 10 * 60 }
  })
)
// session 守卫
app.all('*', (req, res, next) => {
  console.log(req.session);
  if (req.session.isLogin === 'ok' || req.url === '/login' || req.url === '/login/in') {
    console.log('req.session.isLogin === ok /login /login/in')
    next()
  } else {
    console.log('session 看门狗else')
    res.redirect('/login')
  }
})



//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/banner', bannerRouter);

app.use('/staff', staffRouter);

app.use('/register', registerRouter);
app.use('/login', loginRouter);
//以下两个是处理错误的 中间件！！！一个是 状态码错误处理 一个是全局错误处理
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
