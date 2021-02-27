const mongoose = require('mongoose');
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			required: [true, 'Please add an email.'],
		},
		password: {
			type: String,
			required: [true, 'Password is required!'],
		},
		type: {
			type: String,
			required: true,
			default: 'admin',
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.models.users || mongoose.model('users', userSchema);
