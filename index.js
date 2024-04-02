"use strict";
/* __________________ RentACar API _________________ */
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

require("express-async-errors");

/* _______________________ - _______________________ */
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* __________________ Middlewares __________________ */
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(require("./src/middlewares/logger"));

app.use(require("./src/middlewares/authentication")); 

app.use(require("./src/middlewares/queryHandler"));

/* _____________________ Routes ____________________ */
app.use("/", require("./src/routes/"));

// HomePath:
app.all("/", (req, res) => {
	res.send({
		error: false,
		message: "Welcome to RentACar API",
		docs: {
			swagger: "/documents/swagger",
			redoc: "/documents/redoc",
			json: "/documents/json",
		},
		user: req.user,
	});
});
/* _______________________ - _______________________ */
app.use('/uploads',express.static('./uploads'))

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
/* _______________________ - _______________________ */
// require('./src/helpers/sync')() // !!! It clear database.
