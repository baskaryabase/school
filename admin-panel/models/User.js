var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add(
	{
		email: { type: String, unique: true, lowercase: true },
		started: { type: Boolean, default: false },
		password: String,
		fullname: String,
		registernumber: Number,
		community: String,
		phonenumber: String,
		fathersname: String,
		groupin12th: String,
		marks: Number,
		password: { type: Types.Password, initial: true, required: true },
	},
	'Permissions',
	{
		isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	}
);

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

/**
 * Registration
 */
User.defaultColumns = 'fullname, email, marks';
User.register();
