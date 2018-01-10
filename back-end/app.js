var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
var kafka = require('./routes/kafka/client');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
//var kafka = require('./kafka/client');
var mongoURL = "mongodb://localhost:27017/demo";
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        else {
            req.session.user = user.username;
            console.log(req.session.user);
            console.log("session initilized");
            return res.status(201).send({username: "test"});
        }
    })(req, res);
});
app.post('/signup', function(req, resl) {
    passport.authenticate('signup', function(err, user) {
        if(err) {
            resl.status(500).send();
        }

        if(!user) {
            resl.status(401).send();
        }
        else {
            req.session.user = user.username;
            console.log(req.session.user);
            console.log("session initilized");
            return resl.status(201).send({username: "test"});
        }
    })(req, resl);
});
var fileUpload=require('express-fileupload');
app.use(fileUpload());

app.post('/upload', function(req, res) {
    // kafka.make_request('upload_topic',req.body, function(err,results){
    //     console.log('in result');
    //     console.log(results);
    //     resl.status(201).send();
    //
    //     // if(err){
    //     //     done(err,{});
    //     // }
    //     // else
    //     // {
    //     //     if(results.code == 200){
    //     //         console.log('inpassportsucess');
    //     //         done(null,{username:"bhavan@b.com",password:"a"});
    //     //     }
    //     //     else {
    //     //         done(null,false);
    //     //     }
    //     // }
    // });
    console.log(req.session.user);
    console.log("asddddddddddddddd");
    kafka.make_request('upload_topic',{"username":req.session.user,"buffer":req.files.mypic.data,"name":req.files.mypic.name,"permission":"yes"},function (err,results) {
         console.log("IN RESPONSE SENDING RESULTS");
            res.status(204).send();
    })
});

app.post('/shareFile', function (req, res, next) {

    var filename = req.body.file;
    var user=req.body.user;
    console.log("-------------------------");
    console.log(filename);
    console.log(user);
    var jsonString;
    var jsonParse;

    kafka.make_request('sharefile_topic',{"path":filename,"username":user},function (err,results) {
        jsonString = JSON.stringify(results);
        jsonParse = JSON.parse(jsonString);
        console.log(jsonParse);
        console.log("==============+++++++++++++++++++++==============")
    });
    res.status(204).end();

});

app.post('/deleteFilePath', function (req, res, next) {

    var filename = req.body.file;
    console.log("-------------------------fdelete");
    console.log(filename);

    var jsonString;
    var jsonParse;
    kafka.make_request('deletefile_topic',{"path":filename},function (err,results) {
        console.log("Delete file response");
        if(results.code==200)
            res.status(204).end();
    });

});



//
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)   //+ '-' + Date.now()
//     },
// });


//var upload = multer({storage:storage});

/* GET users listing. */
app.get('/display', function (req, res, next) {
    var resArr = [];
    var files=[];
    var out=[];
    console.log("In app.js/display");
    console.log(req.session.user);
    kafka.make_request('displayfiles_topic',{"username":req.session.user},function (err,results) {
        jsonString = JSON.stringify(results);
        jsonParse = JSON.parse(jsonString);
        files=jsonParse;
        // if(jsonParse!=null)
        // for(var i=0;i<files.length;i++)
        // {
        //     out.push(files[i].filepath);
        // }
        // resArr = out.map(function (file) {
        //     var imgJSON = {};
        //
        //     imgJSON.img = file.split('/')[3];
        //     console.log(imgJSON.img);
        //     imgJSON.cols = 2;
        //     return imgJSON;
        // });
        // console.log(resArr);
        res.send(results);

    });

});

app.get('/getUserDetails', function (req, res, next) {
    var resArr = [];
    var files=[];
    var out=[];
    console.log("In app.js/getUserDetails");
    console.log(req.user);
    kafka.make_request('userdetails_topic',{"username":req.user},function (err,results) {
        jsonString = JSON.stringify(results);
        jsonParse = JSON.parse(jsonString);
        files=jsonParse;

        res.send(results);

    });

});

app.post('/updateUserDetails', function (req, res, next) {
    var resArr = [];
    var files=[];
    var out=[];
    console.log("In app.js/updateUserDetails");
    console.log(req.user);
    kafka.make_request('updateuserdetails_topic',{"username":req.user,"email":req.email,"firstname":req.firstname,"lastname":req.lastname,
        "mobile":req.mobile,"degree":req.degree,"job":req.job,"bday":req.bday,
        "music":req.music,"shows":req.shows,"sports":req.sports},function (err,results) {
        jsonString = JSON.stringify(results);
        jsonParse = JSON.parse(jsonString);
        files=jsonParse;
        res.send(results);
    });
});

module.exports = app;
