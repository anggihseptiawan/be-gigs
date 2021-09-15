const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
	rootPath: path.resolve(__dirname, ".."),
	serviceName: process.env.SERVICE_NAME,
	jwtKey: process.env.JWT_SECRET,
	urlDb: process.env.MONGO_URL_PROD,
};
