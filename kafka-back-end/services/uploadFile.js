var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";
var fs = require('fs');
var Buffer = require('buffer/').Buffer;
function handleupload(msg,callback) {
    var result = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var data=Buffer.from(msg.buffer);
    var path='public/files/'+msg.name;
    fs.writeFile(path,data,function(err) {
        console.log("The file was saved!");
    });
    try {
        mongo.connect(mongoURL, function() {
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('filepath');
//created collections file path

            coll.insertOne({
                username: msg.username,
                path: msg.name,
                star: 'no',
                deletef:"yes"
            }, function (err, res) {
                if (err) throw err;
                result.code="200";
                result.value="Successfully Uploaded file";
                console.log("1 document inserted");
                callback(null, result);
                //return res.status(201).end;
            });
        });
    }
    catch (e){
        done(e,{});
    }
}

exports.handleupload = handleupload;