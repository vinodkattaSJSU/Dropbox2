var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";

function handleupdateuserdetails(msg, callback){

    var resl = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        console.log(msg.username+" "+msg.firstname+" "+msg.lastname);
        var coll = mongo.collection('usersdetails');
        coll.insertOne({username:msg.username,email:msg.email,firstname:msg.firstname,lastname:msg.lastname,
            mobile:msg.mobile,degree:msg.degree,job:msg.job,bday:msg.bday,
            music:msg.music,shows:msg.shows,sports:msg.sports},function(err,user) {
                    if(err){

                        resl.code = "500";
                        resl.value = "Failed Signup";
                        console.log("update failed "+resl.code);
                    }
                    else{
                        resl.code = "201";
                        resl.value = "Success user details";
                        console.log("update success "+resl.code);
                    }
                    console.log(JSON.stringify(resl));
                    callback(null, resl);
                });
    });

}

exports.handleupdateuserdetails = handleupdateuserdetails;