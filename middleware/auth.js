const jwt = require("jsonwebtoken");

const verifyAuthToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ error: "Access token missing or invalid" });
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = decoded;

		next(); 
	} catch (error) {
		console.error("Token Verification Error:", error);
		return res.status(403).json({ error: "Invalid or expired token" });
	}
};

module.exports = verifyAuthToken;
