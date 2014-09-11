var express = require('express');
var http = require('http');

var app = express();
var api = express();
app.use(express.static(__dirname + "/../../../workspace-juno-jee/arsnova-vagrant/arsnova-mobile/src/main/webapp/build/production/ARSnova/"));
app.use('/presenter', express.static(__dirname + "/../../../workspace-juno-jee/arsnova-vagrant/arsnova-presenter/target/arsnova-presenter-1.1.0-SNAPSHOT/"));
app.use(express.static(__dirname + "/../../../Eclipse/workspace-juno-jee/arsnova-vagrant/arsnova-mobile/src/main/webapp/build/production/ARSnova/"));
app.use('/api', api);

var server = app.listen(3000);
var io = require('socket.io').listen(server);

// -- SOCKET --
api.get('/socket/url', function(req, res) {
	res.send('');
});
app.get('/socket/url', function(req, res) {
	res.send('');
});

api.post('/socket/assign', function(req, res) {
	res.send('');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	var combo = 0;
	var room = 'showroom';

	socket.join(room);
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
			io.sockets.in(room).emit('feedbackData', [10, 20, 2, 5]);
			combo = 0;
		} else {
			io.sockets.in(room).emit('feedbackData', feedback);
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

api.get('/auth/', function(req, res) {
	res.send('{"username":"cthl58","type":"thm","role":null}');
});

// -- SESSION --
api.get('/session/', function(req, res) {
	if (req.query.ownedonly) {
		res.send('[{"type":null,"name":"Developer Week 2013","shortName":"DWX2013","keyword":"67420855","creator":"cthl58","active":true,"lastOwnerActivity":0,"courseType":"","courseId":null,"_conflicts":null,"_id":"ed66e7b4088a49b2da5eb062860392a6","_rev":null},{"type":null,"name":"Meine Test-Sitzung","shortName":"COMMY","keyword":"15303422","creator":"cthl58","active":true,"lastOwnerActivity":0,"courseType":"","courseId":null,"_conflicts":null,"_id":"a984c8d5c7be3e389b5acc3bd70ece51","_rev":null},{"type":null,"name":"Methoden des Softwareentwicklungsprozesses","shortName":"MSP","keyword":"80158882","creator":"cthl58","active":true,"lastOwnerActivity":0,"courseType":"","courseId":null,"_conflicts":null,"_id":"618061e9f452d64e03a452d506e71c9c","_rev":null},{"type":null,"name":"OOP-Kurs A+B+C","shortName":"OOP-ABC","keyword":"91432974","creator":"cthl58","active":true,"lastOwnerActivity":0,"courseType":"moodle","courseId":null,"_conflicts":null,"_id":"1ff938c3dacb09edf3cc37b91e21d44e","_rev":null}]');
	} else {
		res.send('[]');
	}
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
api.get('/lecturerquestion/:id/answer/', function(req, res) {
	if (req.query.piround == '1') {
		res.send('[{"_id":null,"_rev":null,"type":"skill_question_answer","sessionId":null,"questionId":"91f7ec963d4b64776d60f65ae002a018","answerText":"trifft eher zu","answerSubject":null,"questionVariant":null,"questionValue":0,"piRound":1,"user":null,"timestamp":0,"answerCount":4,"abstention":false,"abstentionCount":0},{"_id":null,"_rev":null,"type":"skill_question_answer","sessionId":null,"questionId":"91f7ec963d4b64776d60f65ae002a018","answerText":"trifft eher zu","answerSubject":null,"questionVariant":null,"questionValue":0,"piRound":1,"user":null,"timestamp":0,"answerCount":11,"abstention":false,"abstentionCount":0}]');
	} else if (req.query.piround == '2') {
		res.send('[{"_id":null,"_rev":null,"type":"skill_question_answer","sessionId":null,"questionId":"91f7ec963d4b64776d60f65ae002a018","answerText":"trifft voll zu","answerSubject":null,"questionVariant":null,"questionValue":0,"piRound":1,"user":null,"timestamp":0,"answerCount":4,"abstention":false,"abstentionCount":0},{"_id":null,"_rev":null,"type":"skill_question_answer","sessionId":null,"questionId":"91f7ec963d4b64776d60f65ae002a018","answerText":"trifft voll zu","answerSubject":null,"questionVariant":null,"questionValue":0,"piRound":1,"user":null,"timestamp":0,"answerCount":11,"abstention":false,"abstentionCount":0}]');
	} else {
		res.send('[]');
	}
});

api.put('/lecturerquestion/:id', function(req, res) {
	res.send(req.body);
});

api.get('/lecturerquestion/unanswered', function(req, res) {
	res.send('[]');
});

api.get('/lecturerquestion/answercount', function(req, res) {
	res.send('100');
});

api.get('/lecturerquestion/', function(req, res) {
	if (req.query.sessionkey) {
		res.send('[{"type":"skill_question","questionType":"vote","questionVariant":"lecture","subject":"DWX2013","text":"Das Essen ist lecker...","active":true,"releasedFor":"all","possibleAnswers":[{"id":"","text":"trifft voll zu","correct":false,"value":0},{"id":"","text":"trifft eher zu","correct":false,"value":0},{"id":"","text":"weiß nicht","correct":false,"value":0},{"id":"","text":"trifft eher nicht zu","correct":false,"value":0},{"id":"","text":"trifft nicht zu","correct":false,"value":0}],"noCorrect":false,"sessionId":"ed66e7b4088a49b2da5eb062860392a6","sessionKeyword":"67420855","timestamp":0,"number":0,"duration":0,"piRound":1,"showStatistic":true,"showAnswer":false,"abstention":false,"_id":"91f7ec963d4b64776d60f65ae002a018","_rev":"6-bd820cc441c137e9877812f00f03aa96","image":null,"gridSize":0,"offsetX":0,"offsetY":0,"zoomLvl":0,"gridOffsetX":0,"gridOffsetY":0,"gridZoomLvl":0,"gridSizeX":0,"gridSizeY":0,"gridIsHidden":false,"imgRotation":0,"toggleFieldsLeft":false,"numClickableFields":0,"thresholdCorrectAnswers":0,"cvIsColored":false,"session":"ed66e7b4088a49b2da5eb062860392a6"},{"type":"skill_question","questionType":"mc","questionVariant":"lecture","subject":"DWX2013","text":"Ich bin an folgenden Tagen auf der Konferenz...","active":true,"releasedFor":"all","possibleAnswers":[{"id":"","text":"Montag","correct":false,"value":0},{"id":"","text":"Dienstag","correct":false,"value":0},{"id":"","text":"Mittwoch","correct":false,"value":0},{"id":"","text":"Donnerstag","correct":false,"value":0}],"noCorrect":true,"sessionId":"ed66e7b4088a49b2da5eb062860392a6","sessionKeyword":"67420855","timestamp":0,"number":0,"duration":0,"piRound":1,"showStatistic":true,"showAnswer":false,"abstention":false,"_id":"91f7ec963d4b64776d60f65ae002ae2b","_rev":"2-80946c5e360e00426a860155b8cc36ec","image":null,"gridSize":0,"offsetX":0,"offsetY":0,"zoomLvl":0,"gridOffsetX":0,"gridOffsetY":0,"gridZoomLvl":0,"gridSizeX":0,"gridSizeY":0,"gridIsHidden":false,"imgRotation":0,"toggleFieldsLeft":false,"numClickableFields":0,"thresholdCorrectAnswers":0,"cvIsColored":false,"session":"ed66e7b4088a49b2da5eb062860392a6"}]');
	} else {
		res.send('');
	}
});

// -- AUDIENCEQUESTION --
api.get('/audiencequestion/', function(req, res) {
	res.send('[{"_id":"1a8f015e549495ca91b65ae3b70028e0","_rev":"1-e30a11bb8d93ab86c223ea945c2603ee","type":null,"subject":"Test-Frage","text":null,"sessionId":"67420855","timestamp":1376308803355,"read":false,"creator":null},{"_id":"35c3f3ba12d62b2cc32fca4d9813c301","_rev":"1-a044ea73bc9f7af2f0f7f00c70abf162","type":null,"subject":"ereerer","text":null,"sessionId":"67420855","timestamp":1387362143084,"read":false,"creator":null},{"_id":"91f7ec963d4b64776d60f65ae0063402","_rev":"1-3499c9e33b8463c8203627ccaf5cff7d","type":null,"subject":"Anzahl User","text":null,"sessionId":"67420855","timestamp":1372247976358,"read":true,"creator":null},{"_id":"91f7ec963d4b64776d60f65ae006350b","_rev":"1-8af6bd4a62abe0af89d2f381a72afa6b","type":null,"subject":"backend","text":null,"sessionId":"67420855","timestamp":1372247978173,"read":true,"creator":null},{"_id":"91f7ec963d4b64776d60f65ae00643f7","_rev":"1-137e971a155965ac21109b189618e4f7","type":null,"subject":"Browserkompatibilität","text":null,"sessionId":"67420855","timestamp":1372248009046,"read":true,"creator":null},{"_id":"91f7ec963d4b64776d60f65ae0066662","_rev":"1-c8ec3e6350837deb002f1ff6786c5ff5","type":null,"subject":"sicherheit","text":null,"sessionId":"67420855","timestamp":1372248159665,"read":true,"creator":null},{"_id":"c8506ed8d2f638af5fd25ceae1016049","_rev":"1-73ca9cb4191301ef7dbc40c43a659deb","type":null,"subject":"Neue Frage","text":null,"sessionId":"67420855","timestamp":1373036653403,"read":true,"creator":null}]');
});

api.get('/audiencequestion/:id', function(req, res) {
	res.send('{"_id":"91f7ec963d4b64776d60f65ae0063402","_rev":"1-3499c9e33b8463c8203627ccaf5cff7d","type":"interposed_question","subject":"Anzahl User","text":"Wieviele User wurden bisher maximal eingebunden?","sessionId":"67420855","timestamp":1372247976358,"read":true,"creator":null}');
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
