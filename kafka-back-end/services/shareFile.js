var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";
var fs = require('fs');
var Buffer = require('buffer/').Buffer;
function handlesharefile(msg,callback) {
    var result = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    //var data=Buffer.from(msg.buffer);
    //var path='public/files/'+msg.name;
    // fs.writeFile(path,data,function(err) {
    //     console.log("The file was saved!");
    // });
    try {
        mongo.connect(mongoURL, function() {
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('filepath');
//created collections file path
            var coll1 = mongo.collection('users');

            coll1.findOne({username: msg.username}, function(err, user){
                if (user) {
                    coll.insertOne({
                        username: msg.username,
                        path: msg.path,
                        star: 'no',
                        deletef:"no"
                    }, function (err, res) {
                        if (err) throw err;
                        result.code="200";
                        result.value="Successfully shared file";
                        console.log("1 document inserted");
                        callback(null, result);
                        //return res.status(201).end;
                    });

                }
                else {
                    result.code="401";
                    result.value="User doesn't exist"
                    callback(null,result);
                }
            });

        });
    }
    catch (e){
        done(e,{});
    }
}

exports.handlesharefile = handlesharefile;