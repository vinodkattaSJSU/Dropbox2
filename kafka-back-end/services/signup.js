var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";

function handle_request(msg, callback){

    var resl = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        console.log(msg.username+" "+msg.firstname+" "+msg.lastname);
        var coll = mongo.collection('users');

        coll.findOne({username: msg.username}, function(err, user){
            if (user) {
                console.log("user found "+JSON.stringify(user));
                resl.code = "401";
                resl.value = "User Already Exists";
                console.log("User already exists "+resl.code);

            }
            else {
                coll.insertOne({username:msg.username,password:msg.password,firstname:msg.firstname,lastname:msg.lastname},function(err,user) {
                    if(err){

                        resl.code = "500";
                        resl.value = "Failed Signup";
                        console.log("Signup failed "+resl.code);
                    }
                    else{
                        resl.code = "201";
                        resl.value = "Success Signup";
                        console.log("Signup success "+resl.code);
                    }
                    console.log(JSON.stringify(resl));
                    callback(null, resl);
                });
            }

        });
    })

    // if(msg.username == "bhavan@b.com" && msg.password =="a"){
    //     res.code = "200";
    //     res.value = "Success Login";
    //
    // }
    // else{
    //     res.code = "401";
    //     res.value = "Failed Login";
    // }
    // callback(null, res);
}

exports.handle_request = handle_request;