var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var userDetails = require('./services/userDetails');
var updateuserDetails = require('./services/updateuserDetails');
var signup = require('./services/signup');
var uploadFile = require('./services/uploadFile');
var shareFile = require('./services/shareFile');
var deleteFile = require('./services/deleteFile');
var topic_login = 'login_topic';
var displayFiles = require('./services/displayFiles');
var topic_signup = 'signup_topic';
var topic_userdetails = 'userdetails_topic';
var topic_updateuserdetails = 'updateuserdetails_topic';
var topic_deletefile = 'deletefile_topic';
var topic_sharefile = 'sharefile_topic';
var topic_upload = 'upload_topic';
var topic_displayfiles = 'displayfiles_topic';
var consumer = connection.getConsumer(topic_login);
var consumer1 = connection.getConsumer(topic_signup);
var uploadFile_consumer = connection.getConsumer(topic_upload);
var shareFile_consumer = connection.getConsumer(topic_sharefile);
var displayfiles_consumer = connection.getConsumer(topic_displayfiles);
var deletefile_consumer = connection.getConsumer(topic_deletefile);
var userdetails_consumer = connection.getConsumer(topic_userdetails);
var updateuserdetails_consumer = connection.getConsumer(topic_updateuserdetails);
var producer = connection.getProducer();
var producer1 = connection.getProducer();
console.log('server is running!!!');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

userdetails_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    updateuserDetails.handleupdateuserdetails(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer1.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    signup.handle_request(data.data, function(err,res){
        console.log('after handle'+JSON.stringify(res.code));
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer1.send(payloads, function(err, data){
            console.log("jjjjjjjjjjjjjjdatajjjjjjjjjjj");
            console.log(data);
        });
        return;
    });
});

updateuserdetails_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    updateuserDetails.handleupdateuserdetails(data.data, function(err,res){
        console.log('after handle'+JSON.stringify(res.code));
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer1.send(payloads, function(err, data){
            console.log("jjjjjjjjjjjjjjdatajjjjjjjjjjj");
            console.log(data);
        });
        return;
    });
});
uploadFile_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    uploadFile.handleupload(data.data, function(err,res){
        console.log('after upload'+JSON.stringify(res.code));
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer1.send(payloads, function(err, data){
            console.log("jjjjjjjjjjjjjjdatajjjjjjjjjjj");
            console.log(data);
        });
        return;
    });
});
displayfiles_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    displayFiles.handledisplayfiles(data.data, function(err,res){
        console.log('after display'+JSON.stringify(res));
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer1.send(payloads, function(err, data){
            console.log("jjjjjjjjjjjjjjdatajjjjjjjjjjj");
            console.log(data);
        });
        return;
    });
});

deletefile_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    deleteFile.handledeletefile(data.data, function(err,res){
        console.log('after delete'+JSON.stringify(res));
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer1.send(payloads, function(err, data){
            console.log("jjjjjjjjjjjjjjdatajjjjjjjjjjj");
            console.log(data);
        });
        return;
    });
});


shareFile_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    shareFile.handlesharefile(data.data, function(err,res){
        console.log('after delete'+JSON.stringify(res));
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer1.send(payloads, function(err, data){
            console.log("jjjjjjjjjjjjjjdatajjjjjjjjjjj");
            console.log(data);
        });
        return;
    });
});