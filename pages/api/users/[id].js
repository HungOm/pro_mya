import dbConnect from '../../../utils/dbConnect';
import User from '../../../backend/models/User.js';
dbConnect();

export default async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case 'GET':
			try {
				const user = await User.findById(id);

				if (!user) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'PATCH':
			try {
				const user = await Note.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				if (!user) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: note });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'DELETE':
			try {
				const delUser = await User.deleteOne({ _id: id });

				if (!delUser) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
