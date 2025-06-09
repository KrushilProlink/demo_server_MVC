const mongoose = require('mongoose');

const connectDB = async (MONGO_URI, DB_NAME) => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(MONGO_URI, {
			dbName: DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("✅ Database Connected Successfully..");
	} catch (err) {
		console.error("❌ Database connection failed:", err);
	}
};

module.exports = connectDB;
