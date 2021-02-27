const mongoose = require('mongoose');

// const childObject = new mongoose.Schema({
// 	text: {
// 		type: String,
// 	},
// 	image: {
// 		type: String,
// 	},
// });

const factSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// required: [true, 'Please add the title.'],
		},
		description: {
			type: String,
		},
		embed: {
			type: String,
		},
		content: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.models.facts || mongoose.model('facts', factSchema);
