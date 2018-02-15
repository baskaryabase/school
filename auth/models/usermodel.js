var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	started: { type: Boolean, default: false },
	password: String,
	fullname: String,
	registernumber: Number,
	community: String,
	contactnumber: Number,
	fathersname: String,
	groupin12th: String,
	marks: Number
});

userSchema.pre('save', function(next) {
	const user = this;
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};

const User = mongoose.model('user', userSchema);

module.exports = User;
