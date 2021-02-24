import dbConnect from '../../../utils/dbConnect';
import Facts from '../../../backend/models/Facts';

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const users = await Facts.find({});
				res.status(200).json({ success: true, data: users });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const facts = await Facts.create(req.body);
				res.status(201).json({ success: true, data: facts });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
