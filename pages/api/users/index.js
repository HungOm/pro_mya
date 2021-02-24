import dbConnect from '../../../utils/dbConnect';
import User from '../../../backend/models/User.js';
import generateToken from '../../../utils/generateToken.js';

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({});

				res.status(200).json({ success: true, data: users });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const { email } = req.body;
				const userExists = await User.findOne({ email });

				if (userExists) {
					res.status(400);
					throw new Error('User already exists');
				}

				const user = await User.create(req.body);
				if (user) {
					res.status(201).json({
						_id: user._id,
						email: user.email,
						type: user.type,
						token: generateToken(user._id),
					});
				} else {
					res.status(400).json({ success: false });
				}
			} catch (error) {
				res.status(400).json({ success: false });
				throw new Error('Invalid user data');
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
