import dbConnect from '../../../utils/dbConnect';
import News from '../../../backend/models/News';

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const users = await News.find({});
				res.status(200).json({ success: true, data: users });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const news = await News.create(req.body);
				res.status(201).json({ success: true, data: news });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
