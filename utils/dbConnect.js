import mongoose from 'mongoose';

async function dbConnect() {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(`MongoDB Connected: ${db.connection.host}`);
	} catch (error) {
		console.error(`MongoDB Connection Error: ${error.message}`);
		process.exit(1);
	}
}

export default dbConnect;
