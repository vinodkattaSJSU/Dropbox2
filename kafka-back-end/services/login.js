var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";
function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    try {
        console.log('jjjjjj');
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('users');

            coll.findOne({username: msg.username, password:msg.password}, function(err, user){
                if (user) {
                   // done(null, {username: username, password: password});
                    res.code = "200";
                    res.value = "Success Login";

                } else {
                    res.code = "401";
                    res.value = "Failed Login";

                }

                callback(null, res);
            });
        });
    }
    catch (e){
        console.log('hhhhhhhh')
        done(e,{});
    }

    // if(msg.username == "bhavan@b.com" && msg.password =="a"){
    //     res.code = "200";
    //     res.value = "Success Login";
    //
    // }
    // else{
    //     res.code = "401";
    //     res.value = "Failed Login";
    // }

}

exports.handle_request = handle_request;