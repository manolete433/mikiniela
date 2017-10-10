var express    = require("express");
var index = require('./routes/index');
var userRoutes = require('./routes/users');
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

app.use('/', index);
app.use('/api', router);
app.use('/users', userRoutes);

//route to handle user registration
// router.post('/register',register.register); //registration
router.post('/login',login.login) //login

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});