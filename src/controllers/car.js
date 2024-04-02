"use strict";
/* ________________ Car Controller ________________ */
const Car = require("../models/car");

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
       const data = await res.getModelList(Car)
       res.status(200).send({
        error:false,
        details: await res.getModelListDetails(Car),
        data
       })
    },
	create: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
        */
       const data = await Car.create(req.body);
       res.status(201).send({
        error:false,
        data,
       })
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
       const data = await Car.findOne({_id:req.params.id,...customFilter})
       res.status(200).send({
        error:false,
        data,
       })
    },
	update: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
        */
        const data = await Car.updateOne({_id:req.params.id,...customFilter},req.body,{runValidators:true})
        res.status(202).send({
            error:false,
            data,
            new:await Car.findOne({_id:req.params.id})
        })
    },
	delete: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */
       const data = await Car.deleteOne({_id:req.params.id})
       res.status(data.deletedCount ? 204 : 404).send({
        error:!data.deletedCount,
        data
       })
    },
};
