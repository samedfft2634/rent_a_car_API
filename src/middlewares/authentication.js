"use strict";
/* ___________ Authentication Middleware ___________ */
const Token = require("../models/token");

module.exports = async (req, res, next) => {
	const auth = req.headers.authorization;
	const tokenKey = auth ? auth.split(" ") : null;

	if (tokenKey && tokenKey[0] == "Token") {
		const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
			"userId"
		);
		req.user = tokenData ? tokenData.userId : null;
	}
	next();
};
