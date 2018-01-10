var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    console.log('inpassportsucess');
                    done(null,{username:username});
                }
                else {
                    done(null,false);
                }
            }
        });

        /*try {
            if(username == "bhavan@b.com" && password == "a"){
                done(null,{username:"bhavan@b.com",password:"a"});
            }
            else
                done(null,false);
        }
        catch (e){
            done(e,{});
        }*/
    }));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
        },
        function(req, username , password, done) {
        console.log('in passport');
        kafka.make_request('signup_topic', {"username": req.body.username, "password": req.body.password, "firstname": req.body.firstname, "lastname":req.body.lastname}, function (err, results) {
            console.log('in result');
            console.log("lllllllll"+results);
            if (err) {
                console.log("make request error");
                done(err, {});
            }
            else {
                if (results.code == 201) {
                    console.log("in passport success");
                    done(null, {username: username});
                }
                else {
                    console.log("passport not success");
                    done(null, false);
                }
            }
        });
    }));
};


