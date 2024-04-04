"use strict";
/* ________________ Reservation Controller ________________ */
const Reservation = require("../models/reservation");

module.exports = {
	list: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
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

        let customFilter = { };
		if (!req.user.isAdmin && !req.user.isStaff) {
			customFilter = { userId: req.user._id };
		}    
       const data = await res.getModelList(Reservation,customFilter,[
        {path:'userId', select:'username firstName lastName'},
        {path:'carId'}, // get all details about car.
        {path:'createdId', select:'username'},
        {path:'updatedId', select:'username'},
    ])
       res.status(200).send({
        error:false,
        details: await res.getModelListDetails(Reservation,customFilter),
        data
       })
    },
	create: async (req, res) => {
         /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Reservation'
                }
            }
        */

        if ((!req.user.isAdmin && !req.user.isStaff) || !req.body?.userId) {
            req.body.userId = req.user._id
        }

        req.body.createdId = req.user._id
        req.body.updatedId = req.user._id

        // Intersectioned reservations
        const userReservationInDates = await Reservation.findOne({ // Does this user has reservation in these days?
            userId:req.body.userId,
            // carId:req.body.carId, // User could reserve another car, with old one !
            $nor: [
                { startDate: { $gt: req.body.endDate } },
                { endDate: { $lt: req.body.startDate } },
            ],
        })
        
        if (userReservationInDates) {
            res.errorStatusCode = 400
            throw new Error(
                'It cannot be added because there is another reservation with the same date.',
                { cause: { userReservationInDates: userReservationInDates } }
            )
        } else {
            const data = await Reservation.create(req.body)
            res.status(201).send({
                error: false,
                data
            })
        }
    },
	read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

            let customFilter = { };
            if (!req.user.isAdmin && !req.user.isStaff) {
                customFilter = { userId: req.user._id };
            }   
    
            const data = await User.findOne({_id:req.params.id,...customFilter}).populate([
                {path:'userId', select:'username firstName lastName'},
                {path:'carId'}, 
                {path:'createdId', select:'username'},
                {path:'updatedId', select:'username'},
            ]);
       res.status(200).send({
        error:false,
        data,
        permission:req.permission
       })
    },
	update: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Reservation'
                }
            }
        */

        // Only Admin can change reservastion informations.
        if (!req.user.isAdmin) {
            delete req.body.userId
        }

        // Take updateId from user
        req.body.updatedId = req.user._id

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error:false,
            data,
            new:await Reservation.findOne({_id:req.params.id})
        })
    },
	delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */
       const data = await Reservation.deleteOne({_id:req.params.id})
       res.status(data.deletedCount ? 204 : 404).send({
        error:!data.deletedCount,
        data
       })
    },
};
