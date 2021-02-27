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
		embed: {
			type: String,
		},
		source: {
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

module.exports = mongoose.models.news || mongoose.model('news', factSchema);
