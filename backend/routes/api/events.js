const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Venue, Membership, Event, Attendance, Image } = require('../../db/models');
const { Op } = require("sequelize");
const { urlencoded } = require('express');

const router = express.Router();

const validateEvent = [
    check('venueId')
        // .exists({ checkFalsy: true })
        .custom(async value => {
            let venueExists = await Venue.findByPk(value)
            if (!venueExists) return Promise.reject()
        })
        .withMessage("Venue does not exist"),
    check('name')
        // .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters"),
    check('type')
        // .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage(`Type must be 'Online' or 'In person'`),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be an integer'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage("Price is invalid"),
    check('description')
        // .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage("Description is required"),
    check('startDate')
        .custom(async value => {
            if (Date.parse(value) < Date.now()) return Promise.reject()
        })
        .withMessage("Start date must be in the future"),
    check('endDate')
        .custom(async (value, { req }) => {
            if (Date.parse(value) < Date.parse(req.body.startDate)) return Promise.reject()
        })
        .withMessage("End date is less than start date"),
    handleValidationErrors
];

const validateQueryPagination = [
    check('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage("Page must be greater than or equal to 1 and less than or equal to 10"),
    check('size')
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1 and less than or equal to 20"),
    check('name')
        .optional()
        .isAlphanumeric('en-US',{ignore:" "})
        .withMessage("Name must be a string"),
    check('type')
        .optional()
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In Person'"),
    check('startDate')
        .optional()
        .custom(async value => {
            const dateTime = new Date(value)

            if (isNaN(dateTime.getTime())) return Promise.reject()
        })
        .withMessage("Start date must be a valid datetime"),
    handleValidationErrors
];

const err = {}


router.delete('/:eventId/images/:imageId', requireAuth, async (req, res, next) => {

    const event = await Event.findByPk(req.params.eventId, {
        include: [{ model: Group, attributes: ['id', 'organizerId'] }]
    });

    if (!event) {
        return res.status(404).json({ message: "Event couldn't be found" });
    }

    const groupId = event.Group.id;

    const isOrganizer = event.Group.organizerId ===  req.user.id;
    const isCohost = await Membership.findOne({ where: { userId:  req.user.id, groupId, status: 'co-host' } });

    if (!isOrganizer && !isCohost) {
        return res.status(403).json({ message: "Must be an organizer, or co-host to add an image" });
    }

    const image = await Image.findOne({
        where: { imageableId: req.params.eventId, imageableType: 'event'}
    });

    // Check if the image exists
    if (!image) {
        return res.status(404).json({
            message: "Event Image  couldn't be found"
        });
    }

    await Image.destroy({
        where: { id: req.params.imageId, imageableType: 'event' }
    });

    return res.json({
        message: "Successfully deleted"
    });
});

// Delete attendance to an event specified by id
// Require Authentication: true
// Require proper authorization: Current User must be the host of the group, or the user whose attendance is being deleted
// Request Method: DELETE
// URL: /events/:eventId/attendees/:attendeeId

router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { userId } = req.body;


    const event = await Event.findByPk(eventId);


    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }


    const attendance = await Attendance.findOne({
        where: {
            eventId,
            userId
        },
        attributes: ['id', 'eventId', 'userId', 'status']
    });

    if (!attendance) {
        const err = new Error("Attendance does not exist for this User");
        err.status = 404;
        err.message = "Attendance does not exist for this User";
        return next(err);
    }


    const group = await Group.findByPk(event.groupId);

    // Check if the user is an organizer or the attendee
    if (req.user.id !== userId && req.user.id !== group.organizerId) {
        const err = new Error("Only the User or organizer may delete an Attendance");
        err.status = 403;
        err.message = "Only the User or organizer may delete an Attendance";
        return next(err);
    }


    await attendance.destroy();


    res.json({ "message": "Successfully deleted attendance from event" });
});


// Change the status of an attendance for an event specified by id
// Require Authentication: true
// Require proper authorization: Current User must already be the organizer or have a membership to the group with the status of "co-host"
// Request Method: PUT
// URL: /events/:eventId/attendees/:attendeeId

router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId, attendeeId } = req.params;
    const { userId, status } = req.body;

    // Fetch the event
    const event = await Event.findByPk(eventId);

    // If the event is not found, return an error
    if (!event) {
        return res.status(404).json({ message: "Event couldn't be found" });
    }

    // Check if the user is the organizer or co-host
    const isOrganizerOrCohost = (event.organizerId === req.user.id) || await Membership.findOne({
        where: {
            groupId: event.groupId,
            userId: req.user.id,
            status: 'co-host'
        }
    });

    // If the user is not the organizer or co-host, return an error
    if (!isOrganizerOrCohost) {
        return res.status(403).json({ message: "User not authorized to modify this attendance" });
    }

    // If the status is 'pending', return an error
    if (status === "pending") {
        return res.status(400).json({ message: "Cannot change an attendance status to pending" });
    }

    // Fetch the attendance
    const attendance = await Attendance.findOne({
        where: {
            id: attendeeId,
            eventId,
            userId
        }
    });

    // If the attendance is not found, return an error
    if (!attendance) {
        return res.status(404).json({ message: "Attendance between the user and the event does not exist" });
    }

    // Update the attendance status
    attendance.status = status;
    await attendance.save();

    // Return the updated attendance
    res.status(200).json({
        id: attendance.id,
        eventId: attendance.eventId,
        userId: attendance.userId,
        status: attendance.status
    });
});



// Request to Attend an Event based on the Event's id
// Require Authentication: true
// Require Authorization: Current User must be a member of the group
// Request Method: POST
// URL: /events/:eventId/attendees

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
        return res.status(404).json({ message: "Event couldn't be found" });
    }

    const currentAttendance = await Attendance.findOne({
        where: {
            eventId,
            userId
        }
    });

    if (currentAttendance) {
        if (currentAttendance.status === 'pending') {
            return res.status(400).json({ message: "Attendance has already been requested" });
        } else {
            return res.status(400).json({ message: "User is already an attendee of the event" });
        }
    }

    const newAttendance = await Attendance.create({
        eventId,
        userId,
        status: 'pending'
    });

    res.status(200).json({
        userId: newAttendance.userId,
        status: newAttendance.status
    });
});


// Add an Image to a Event based on the Event's id
// Require Authentication: true
// Require proper authorization: Current User must be an attendee, host, or co-host of the event
// Request Method: POST
// URL: /events/:eventId/images

router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req;
    const { url, preview } = req.body;

        const event = await Event.findByPk(eventId, {
            include: [{ model: Group, attributes: ['id', 'organizerId'] }]
        });

        if (!event) {
            return res.status(404).json({ message: "Event couldn't be found" });
        }

        const groupId = event.Group.id;

        const isAttending = await Attendance.findOne({ where: { eventId, userId: user.id, status: 'attending' } });
        const isOrganizer = event.Group.organizerId === user.id;
        const isCohost = await Membership.findOne({ where: { userId: user.id, groupId, status: 'co-host' } });

        if (!isAttending && !isOrganizer && !isCohost) {
            return res.status(403).json({ message: "Must be an attendee, organizer, or co-host to add an image" });
        }

        // Create a new image
        const newImage = await Image.create({
            imageableId: eventId,
            imageableType: 'event',
            imageURL: url,
            preview: preview
        });

        return res.status(200).json({
            id: newImage.id,
            imageURL: newImage.imageURL,
            preview: newImage.preview
        });
});

// Get all Attendees of an Event specified by its id
// Require Authentication: false
// RequestnMethod: GET
// URL: /events/:eventId/attendees

router.get('/:eventId/attendees', restoreUser, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req;


    const event = await Event.findByPk(eventId, {
        include: [{
            model: Group,
            attributes: ['organizerId']
        }]
    });

    if (!event) {
        return res.status(404).json({ message: "Event couldn't be found" });
    }

    let isOrganizerOrCohost = false;
    if (event.Group && event.Group.organizerId) {
        isOrganizerOrCohost = (event.Group.organizerId === user.id);
    }
    if (!isOrganizerOrCohost) {
        isOrganizerOrCohost = await Membership.findOne({
            where: {
                groupId: event.groupId,
                userId: user.id,
                status: 'co-host'
            }
        });
    }
    const statusCondition = isOrganizerOrCohost ? {} : { status: { [Op.ne]: 'pending' } };
    const attendees = await Attendance.findAll({
        where: { eventId, ...statusCondition },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    });
    const formattedAttendees = attendees.map(attendance => {
        const attendee = attendance.User.toJSON();
        attendee.Attendance = { status: attendance.status };
        return attendee;
    });
    res.status(200).json({ Attendees: formattedAttendees });
});


// Get all Events of a Group specified by its id
// Require Authentication: false
// Request Method: GET
// URL: /groups/:groupId/events

router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params;

    let event = await Event.findByPk(eventId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: Group,
                attributes: ['id', 'name', 'private', 'city', 'state']
            },
            {
                model: Venue,
                attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
            },
            {
                model: Image,
                as: "images",
                attributes: ['id', 'imageURL', 'preview']
            }
        ]
    });

    if (event) {
        const numAttending = await Attendance.count({ where: { eventId, status: 'attending' } })

        event = event.toJSON();
        event.numAttending = numAttending
        return res.json(event)
    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }

})


// Delete an Event specified by its id
// Require Authentication: true
// Require Authorization: Current User must be the organizer of the group or a member of the group with a status of "co-host"
// Request Method: DELETE
// URL: /events/:eventId

router.delete('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req;
    const deleteEvent = await Event.findByPk(eventId);

    if (deleteEvent) {
        const group = await Group.findByPk(deleteEvent.groupId);
        const cohost = await Membership.findOne({ where: { groupId: group.id, status: 'co-host', userId: user.id } });

        if (group.organizerId !== user.id && !cohost) {
            return res.status(401).json({ message: "Must be organizer or co-host to delete event" });
        }

        await deleteEvent.destroy();
        return res.status(200).json({ message: "Successfully deleted" });

    } else {
        return res.status(404).json({ message: "Event couldn't be found" });
    }
});


// Edit an Event specified by its id
// Require Authentication: true
// Require Authorization: Current User must be the organizer of the group or a member of the group with a status of "co-host"
// Request Method: PUT
// URL: /events/:eventId

router.put('/:eventId', requireAuth, validateEvent, async (req, res, next) => {

    const { eventId } = req.params;
    const { user } = req;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    const event = await Event.findByPk(eventId);

    if (event) {
        const group = await Group.findByPk(event.groupId);
        const cohost = await Membership.findOne({ where: { groupId: group.id, status: 'co-host', userId: user.id } });
        const venue = await Venue.findByPk(venueId);

        if (!venue) {
            const err = new Error();
            err.title = "Venue not found!!!";
            err.status = 404;
            err.message = `Venue couldn't be found!!! Please input a valid venue!!!`;
            return next(err);
        }

        if (group.organizerId !== user.id && !cohost) {
            const err = new Error();
            err.title = "Not authorized!!!";
            err.status = 401;
            err.message = `Must be organizer or co-host to edit event!!! PLEASE CONTACT ADMIN!!!`;
            return next(err);
        }

        const newEvent = await event.update({
            venueId, name, type, capacity, price, description, startDate, endDate
        });

        return res.json({
            id: newEvent.id,
            groupId: group.id,
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        });

    } else {
        const err = new Error();
        err.title = "Can't find Event!!!!";
        err.status = 404;
        err.message = `Event couldn't be found!!! Please try again`;
        return next(err);
    }
});


// Get all Events
// Require Authentication: false
// Request Method: GET
// URL: /events

router.get('/', validateQueryPagination, async (req, res, next) => {

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 20;
        const name = req.query.name;
        const type = req.query.type;
        const startDate = req.query.startDate;

        const whereConditions = {};

        if (name) {
            whereConditions.name = { [Op.like]: `%${name}%` };
        }

        if (type) {
            whereConditions.type = type;
        }

        if (startDate) {
            whereConditions.startDate = { [Op.gte]: new Date(startDate) };
        }

        const events = await Event.findAll({
            where: whereConditions,
            include: [
                { model: Group.scope("eventRoutes") },
                { model: Venue.scope("eventRoutes") }
            ],
            limit: size,
            offset: (page - 1) * size
        });

        const eventIds = events.map(event => event.dataValues.id);

        const images = await Image.findAll({
            where: {
                imageableId: { [Op.in]: eventIds },
                imageableType: 'event',
            }
        });

        for (let i = 0; i < events.length; i++) {
            const eventImage = images.find(image => image.imageableId === events[i].dataValues.id);
            events[i].dataValues.previewImage = eventImage ? eventImage.imageURL : null;
        }

        for (let i = 0; i < events.length; i++) {
            let numAttending = await Attendance.count({
                where: {
                    eventId: events[i].dataValues.id
                }
            });
            events[i].dataValues.numAttending = numAttending;
        }

        res.json({ Events: events });

});



// the old router - to have it as reference
// router.get('/', async (req, res, next) => {

//     const events = await Event.findAll({
//         include: [{ model: Group.scope("eventRoutes") }, { model: Venue.scope("eventRoutes") }],
//     });

//     // Extract event IDs
//     const eventIds = events.map(event => event.dataValues.id);

//     // Use Sequelize to get images for the events

//     const images = await Image.findAll({
//         where: {
//             imageableId: { [Op.in]: eventIds },
//             imageableType: 'event',

//         }
//     });

//     // Map images to events
//     for (let i = 0; i < events.length; i++) {
//         const eventImage = images.find(image => image.imageableId === events[i].dataValues.id);
//         events[i].dataValues.previewImage = eventImage ? eventImage.imageURL : null;
//     }

//     // Count the number of attendees for each event
//     for (let i = 0; i < events.length; i++) {
//         let numAttending = await Attendance.count({
//             where: {
//                 eventId: events[i].dataValues.id
//             }
//         });
//         events[i].dataValues.numAttending = numAttending;
//     }

//     // Return the events with images and number of attendees
//     res.json({ Events: events });
// });



module.exports = router;
