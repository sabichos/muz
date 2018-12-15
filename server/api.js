var express = require("express");
var bodyParser = require("body-parser");
var db = require("./db.json");
var server = require('http');
var socketio = require('socket.io');

var app = new express();
var http = server.Server(app);
var io = socketio(http);


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//get users
app.get('/api/user', function (req, res) {
    const users = db.users.map(function (user) { return { username: user.username, name: user.name } })
    res.send(users);
})

//get users
app.get('/api/user/:id', function (req, res) {
    const users = db.users.filter(function (user) { return user.username === req.params.id });
    if (users && users.length > 0) {
        let user = users[0];
        res.send({ username: user.username, name: user.name });
    } else {
        res.sendStatus(404);
    }

})


//get user avatar
app.get('/api/user/:id/avatar', function (req, res) {
    let user = db.users.find(user => user.username == req.params.id);
    var options = {
        root: __dirname + '/avatars',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = user.avatar;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('notify', function (notification) {
        socket.emit("playing", notification);
    });
});


//post connections
app.post('/api/user/connection', function (req, res) {

})

/* LISTENER */
app.listen(8080, 'localhost', function (error) {
    if (error)
        console.error("server error:", error);
    else
        console.info('express is taking API requests');
});