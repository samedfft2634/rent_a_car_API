"use strict";
/* -------------------------------------------------------*/
// sendMail(to, subject, message)
const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "samedfft@gmail.com",
			pass: "ihof qizt bxdc sshw",
		},
	});

	transporter.sendMail(
		{
			to,    
			subject,              
			text: message,          
			html:message,          
		},
		(err, success) => {
			success
				? console.log("SUCCESS", success)
				: console.log("ERROR", err);
		}
	);
};
