"use strict";
/* ________________ Car Controller ________________ */
const Car = require("../models/car");
const Reservation = require("../models/reservation");

module.exports = {
	list: async (req, res) => {
		/*
            #swagger.tags = ["Cars"]
            #swagger.summary = "List Cars"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

		// example car filtering
		// http://127.0.0.1:8000/cars?startDate=2024-03-15&endDate=2024-04-05

		let customFilter = { isPublish: true };

		// Filter by Date
		const { startDate: getStartDate, endDate: getEndDate } = req.query;

		if (getStartDate && getEndDate) {
			const reservedCars = await Reservation.find({
				$nor: [
					{ startDate: { $gt: getEndDate } },
					{ endDate: { $lt: getStartDate } },
				],
			},{_id:0,carId:1}).distinct('carId');

			if(reservedCars.length > 0){
				customFilter._id = {$nin:reservedCars}
			}
			// console.log(reservedCars);
			console.log(customFilter)
		} else {
			req.errorStatusCode = 400; // Bad request
			throw new Error("startDate and endDate queries are required.");
		}

		
		// Filter by Date

		const data = await res.getModelList(Car, customFilter, [
			{ path: "createdId", select: "username" },
			{ path: "updatedId", select: "username" },
		]);
		res.status(200).send({
			error: false,
			details: await res.getModelListDetails(Car, customFilter),
			data,
		});
	},
	create: async (req, res) => {
		/*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Car'
                }
            }
        */

		// createdId ve updatedId verisini req.user'dan al:
		req.body.createdId = req.user._id;
		req.body.updatedId = req.user._id;

		const data = await Car.create(req.body);
		res.status(201).send({
			error: false,
			data,
		});
	},
	read: async (req, res) => {
		/*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Get Single Car"
        */

		let customFilter = {};
		if (!req.user.isAdmin) {
			customFilter = { _id: req.user._id };
		}
		const data = await Car.findOne({
			_id: req.params.id,
			...customFilter,
		}).populate([
			{ path: "createdId", select: "username" },
			{ path: "updatedId", select: "username" },
		]);
		res.status(200).send({
			error: false,
			data,
		});
	},
	update: async (req, res) => {
		/*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Car'
                }
            }
        */
		const data = await Car.updateOne(
			{ _id: req.params.id, ...customFilter },
			req.body,
			{ runValidators: true }
		);
		res.status(202).send({
			error: false,
			data,
			new: await Car.findOne({ _id: req.params.id }),
		});
	},
	delete: async (req, res) => {
		/*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */
		const data = await Car.deleteOne({ _id: req.params.id });
		res.status(data.deletedCount ? 204 : 404).send({
			error: !data.deletedCount,
			data,
		});
	},
};
