const express = require('express');
const httpProxy = require('http-proxy');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const flash = require('connect-flash');
const User = require('./auth/models/usermodel.js');

const router = require('./auth/router');

//USE FLASH

const app = express();

app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

mongoose.connect('mongodb://gow:qwerty@ds111608.mlab.com:11608/auths');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, authorization'
	);
	next();
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB- connection error:'));

app.use(
	session({
		secret: 'my name is baymax',
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 2 * 24 * 60 * 60 },
		store: new MongoStore({ mongooseConnection: db, ttl: 2 * 4 * 60 * 60 })
	})
);

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

// auth routes
router(app);

// all api routes
var qbanks = require("./question")
const qbank = {
	qbank: [
		{
			question: '	Radiocarbon is produced in the atmosphere as a result of',
			choices: [
				{
					label:
						'collision between fast neutrons and nitrogen nuclei present in the atmosphere',
					value: 1
				},
				{
					label:
						'action of ultraviolet light from the sun on atmospheric oxygen',
					value: 2
				},
				{
					label:
						'action of solar radiations particularly cosmic rays on carbon dioxide present in the atmosphere',
					value: 3
				},
				{ label: 'lightning discharge in atmosphere', value: 4 }
			]
		},
		{
			question:
				'It is easier to roll a stone up a sloping road than to lift it vertical upwards because',
			choices: [
				{ label: 'work done in rolling is more than in lifting', value: 1 },
				{
					label: 'work done in lifting the stone is equal to rolling it',
					value: 2
				},
				{
					label:
						'work done in both is same but the rate of doing work is less in rolling',
					value: 3
				},
				{
					label: 'work done in rolling a stone is less than in lifting it',
					value: 4
				}
			]
		},
		{
			question: 'The absorption of ink by blotting paper involves',
			choices: [
				{ label: 'viscosity of ink', value: 1 },
				{ label: 'capillary action phenomenon', value: 2 },
				{ label: 'diffusion of ink through the blotting', value: 3 },
				{ label: 'siphon action', value: 4 }
			]
		},
		{
			question: 'Light year is a unit of',
			choices: [
				{ label: 'time', value: 1 },
				{ label: 'distance', value: 2 },
				{ label: 'light', value: 3 },
				{ label: 'intensity of light', value: 4 }
			]
		},
		{
			question: 'Light from the Sun reaches us in nearly',
			choices: [
				{ label: '2 minutes', value: 1 },
				{ label: '4 minutes', value: 2 },
				{ label: '8 minutes', value: 3 },
				{ label: '16 minutes', value: 4 }
			]
		},
		{
			question: '	Stars appears to move from east to west because',
			choices: [
				{ label: 'all stars move from east to west', value: 1 },
				{ label: 'the earth rotates from west to east', value: 2 },
				{ label: 'the earth rotates from east to west', value: 3 },
				{
					label: 'the background of the stars moves from west to east',
					value: 4
				}
			]
		},
		{
			question: 'Pa(Pascal) is the unit for',
			choices: [
				{ label: 'thrust', value: 1 },
				{ label: 'pressure', value: 2 },
				{ label: 'frequency', value: 3 },
				{ label: 'conductivity', value: 4 }
			]
		},
		{
			question: 'Planets do not twinkle because',
			choices: [
				{ label: 'they emit light of a constant intensity', value: 1 },
				{
					label: 'their distance from the earth does not change with time',
					value: 2
				},
				{
					label:
						'they are very far away from the earth resulting in decrease in intensity of light',
					value: 3
				},
				{
					label:
						'they are nearer to earth and hence we receive a greater amount of light and, therefore minor variations in the intensity are not noticeable',
					value: 4
				}
			]
		},
		{
			question: 'Metals are good conductors of electricity because',
			choices: [
				{ label: 'they contain free electrons', value: 1 },
				{ label: 'the atoms are lightly packed', value: 2 },
				{ label: 'they have high melting point', value: 3 },
				{ label: 'All of the above', value: 4 }
			]
		},
		{
			question: 'Rectifiers are used to convert',
			choices: [
				{ label: 'Direct current to Alternating current', value: 1 },
				{ label: 'Alternating current to Direct current', value: 2 },
				{ label: 'high voltage to low voltage', value: 3 },
				{ label: 'low voltage to high voltage', value: 4 }
			]
		}
	],
	answers: [1, 4, 2, 2, 3, 2, 2, 4, 1, 2]
};
app.get('/qbank', function(req, res, next) {
	res.json(qbanks.qbank);
});

app.post('/test-submission', function(req, res) {
	var answers = qbanks.answers;
	var submittedanswers = req.body.answers;
	var _id = req.body._id;
	console.log(answers);
	// User.findById(_id, function(err, user) {
	// 	if (err) {
	// 		return false;
	// 	}
	// 	if (answers[0] != null) {
	// 		for (var i = 0; i < answers.length; i++) {
	// 			if (answers[i] == submittedanswers[i]) {
	// 				marks = marks + 1;
	// 			}
	// 		}
	// 		user.started = true;
	// 		user.marks = marks;
	// 		user.save();
	// 		console.log(marks);
	// 		res.json(marks);
	// 	}
	// });

	var marks = 0;
	submittedanswers.map(function(ans, i) {
		if (answers[i] == submittedanswers[i]) {
			return (marks = marks + 1);
		} else {
			return marks;
		}
	});

	function marks() {}
	User.findOneAndUpdate(
		{ _id: _id },
		{
			$set: {
				started: true,
				marks: marks
			}
		},
		{ new: true },
		function(err, doc) {
			if (err) {
				console.log('Something wrong when updating data!');
			}
			res.json(marks);
		}
	);
});

// static file routes
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
	console.log('static server running in port 5000');
});
