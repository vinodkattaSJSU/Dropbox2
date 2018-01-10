var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";
function handledisplayfiles(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var out = [];
    let test1=[];
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('filepath');
            console.log(msg);
            coll.find({username: msg.username}).toArray( function(err, result){
                console.log("IN MONGO DB for getting images back");
                for (var i = 0; i < result.length; i++) {
                    out.push(result[i].path+'/'+result[i].star+'/'+result[i].deletef);
                }
               // console.log(out);
                test1=out.map(function (file) {
                    let imgJSON = {};
                    imgJSON.img = file.split('/')[0];
                    imgJSON.star=file.split('/')[1];
                    imgJSON.deletefile=file.split('/')[2];
                    console.log("vgfhgkjnkj");
                 //   console.log(imgJSON);
                    return imgJSON;
                });
                console.log(test1);
                callback(null, test1);
            });
        });
    }
    catch (e){
        done(e,{});
    }
}

exports.handledisplayfiles = handledisplayfiles;