var express = require('express');
var usersController=require('../controllers.js');
var router = express.Router();

var multer=require('multer');
var upload=multer({dest:'public/uploads'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userController.login);
router.post('/reginster',userController.reginster);
router.get('/verify',userController.verify);
router.get('/logout',userController.logout);
router.get('/getUser',userController.getUser);
router.post('/findPassword',userController.findPassword);
router.get('/verify',userController.verify);
router.get('/uploadUserHead',upload.single('file'),userController.uploadUserHead);




module.exports = router;
