const mongoose = require('mongoose');

const childObject = new mongoose.Schema({
	text: {
		type: String,
	},
	image: {
		type: String,
	},
});

const factSchema = new mongoose.Schema(
	{
		embed: {
			type: String,
		},
		source: {
			type: String,
		},
		content: [childObject],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('news', factSchema);
