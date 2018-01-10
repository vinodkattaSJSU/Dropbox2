var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";
var fs = require('fs');
var Buffer = require('buffer/').Buffer;
function handledeletefile(msg,callback) {
    var result = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    //var data=Buffer.from(msg.buffer);
   // var path='public/files/'+msg.name;
    //fs.writeFile(path,data,function(err) {
     //   console.log("The file was saved!");
    //});
    try {
        mongo.connect(mongoURL, function() {
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('filepath');
//created collections file path

            coll.remove({
                path: msg.path,
                "deletef":"yes"
            }, function (err, res) {
                if (err) throw err;
                result.code="200";
                result.value="Successfully deleted file";
                console.log("file deleted");
                console.log(result);
                callback(null, result);
                //return res.status(201).end;
            });
        });
    }
    catch (e){
        done(e,{});
    }
}

exports.handledeletefile = handledeletefile;