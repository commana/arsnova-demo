var express = require('express');
var http = require('http');

var app = express();
var api = express();
app.use(express.static(__dirname + "/../../../workspace-juno-jee/arsnova-vagrant/arsnova-mobile/src/main/webapp/build/production/ARSnova/"));
app.use(express.static(__dirname + "/../../../Eclipse/workspace-juno-jee/arsnova-vagrant/arsnova-mobile/src/main/webapp/build/production/ARSnova/"));
app.use('/api', api);

var server = app.listen(3000);
var io = require('socket.io').listen(server);

// -- SOCKET --
app.get('/socket/url', function(req, res) {
	res.send('');
});

api.post('/socket/assign', function(req, res) {
	res.send('');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	var combo = 0;
	socket.on('setFeedback', function(feedbackData) {
		// feedbackData = { value: 0-3 };
		var feedback = [];
		switch (feedbackData.value) {
			case 0: feedback = [1, 0, 0, 0]; break;
			case 1: feedback = [0, 1, 0, 0]; break;
			case 2: feedback = [0, 0, 1, 0]; break;
			case 3: feedback = [0, 0, 0, 1]; break;
			default: feedback = [0, 0, 0, 0]; break;
		}
		if (++combo >= 5) {
			socket.emit('feedbackData', [10, 20, 2, 5]);
			combo = 0;
		} else {
			socket.emit('feedbackData', feedback);
		}
	});
});

// -- AUTH --
api.get('/auth/login', function(req, res) {
	res.send('Hello World');
});

api.get('/auth/services', function(req, res) {
	res.send('[{"id":"guest","name":"Guest","dialogUrl":null,"image":null,"order":0,"allowLecturer":true},{"id":"cas","name":"Uni","dialogUrl":"/api/auth/dialog?type=cas&successurl={0}","image":null,"order":0,"allowLecturer":true},{"id":"facebook","name":"Facebook","dialogUrl":"/api/auth/dialog?type=facebook&successurl={0}","image":null,"order":0,"allowLecturer":true},{"id":"google","name":"Google","dialogUrl":"/api/auth/dialog?type=google&successurl={0}","image":null,"order":0,"allowLecturer":true}]');
});

api.get('/auth/dialog', function(req, res) {
	res.send('');
});

// -- SESSION --
api.get('/session/', function(req, res) {
	res.send('[]');
});

api.get('/session/:id', function(req, res) {
	var id = req.params.id || 12345678;
	res.send('{"type":"session","name":"Developer Week 2013","shortName":"DWX2013","keyword":"67420855","creator":"7e7fd57ae7e3b879fce7a136375c67ddbc54a6146aaa77625b6f9d4ba3346ca423683f4eb9dc21c1b5a475134a637cde5ecc760bca03f2f5ca90b01b8433fb8c","active":true,"lastOwnerActivity":1410356269636,"courseType":"","courseId":"","_conflicts":null,"_id":"ed66e7b4088a49b2da5eb062860392a6","_rev":"626-85ce0ddfd3729a5428d221e5a43645c0"}');
});

api.get('/session/:id/interposedreadingcount', function(req, res) {
	res.send('{"read":5,"unread":2,"total":7}');
});

api.get('/session/:id/mylearningprogress', function(req, res) {
	res.send('{"myprogress":0,"courseprogress":0}');
});

api.get('/session/:id/myfeedback', function(req, res) {
	// Use mainly to hide 'feedback reset' messages
	res.send('0');
});

// -- LECTURERQUESTION --
api.get('/lecturerquestion/unanswered', function(req, res) {
	res.send('[]');
});

api.get('/lecturerquestion/answercount', function(req, res) {
	res.send('100');
});



app.get('/configuration', function(req, res) {
	res.send('Hello World');
});

app.get('/arsnova-config', function(req, res) {
	res.send('{"presenterPath":"/presenter","organizationUrl":"http://www.thm.de","apiPath":"/api","answerOptionLimit":8,"customizationPath":"/thm","features":{"gridSquare":true,"markdown":true,"studentsOwnQuestions":true,"mathJax":true,"flashcard":true,"learningProgress":true},"overlayUrl":"https://arsnova.eu/overlay/","imprintUrl":"https://arsnova.eu/blog/impressum/","mobilePath":"/mobile","parseAnswerOptionFormatting":true}');
});

api.get('/whoami.json', function(req, res) {
	res.send('{"username":"cthl58","type":"guest","role":null}');
});
