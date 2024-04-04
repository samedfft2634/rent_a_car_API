"use strict";
/* ___________________ User Modal __________________ */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ______________________________________________ *
{
    "username": "Rent User 1",
    "password": "aA123456*",
    "email": "rentacar@gmail.com",
    "firstName": "Rent",
    "lastName": "Acar",
    "isActive": true,
    "isAdmin": true
},
{
	"username": "admin",
    "password": "aA?123456",
}
/* ______________________________________________ */
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
			set: (password) => {
				if (
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
						password
					)
				) {
					return passwordEncrypt(password);
				} else {
					throw new Error("Password type is not correct.");
				}
			},
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			validate: [
				(email) =>
					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
				"Email type is not correct.",
			],
		},
		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		collection: "users",
		timestamps: true,
	}
);
module.exports = mongoose.model("User", UserSchema);
