var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";
function handleuserdetails(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    try {
        console.log('jjjjjj');
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('usersdetails');

            coll.findOne({username: msg.username}, function(err, user){
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
        console.log('hhhhhhhh');
        done(e,{});
    }
}

exports.handleuserdetails = handleuserdetails;