var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
// 引入数据库类
var {Mongoose}=require('./untils/config.js');

// 新增路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter=require('./routers/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 配置session
app.use(session({
	secret:"dd",
	name:'sessionId'
	resave:false,
	saveUnitialized:false,
	cookie:{
		maxAge:1000*60*60
	}
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 新增接口
app.use('/', indexRouter);
app.use('/api2/users', usersRouter);
app.use('/api2/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

Mongoose.connect(); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
