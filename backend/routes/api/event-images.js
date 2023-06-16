const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Venue, Membership, Event, Attendance, Image } = require('../../db/models');
const { Op } = require("sequelize");
const router = express.Router();




// Delete an Image for an Event

// Require Authentication: true
// Require proper authorization: Current user must be the organizer or "co-host" of the Group that the Event belongs to
// Request Method: DELETE
// URL: /events/:eventId/images/:imageId

router.delete('/event-images/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'event'
        }
    });

    if (!image) {
        const err = new Error("Event Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    const eventId = image.imageableId;

    const event = await Event.findByPk(eventId, {
        include: [{
            model: Group,
            attributes: ['organizerId'],
            as: 'Group'
        }]
    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        return next(err);
    }

    const membership = await Membership.findOne({
        where: {
            groupId: event.groupId,
            userId: req.user.id,
        }
    });

    const isCohost = membership && membership.status === 'co-host';

    const isOrganizer = req.user.id === event.Group.organizerId;

    if (!isOrganizer && !isCohost) {
        const err = new Error("Unauthorized: Must be the organizer or co-host");
        err.status = 403;
        return next(err);
    }

   
    await image.destroy();

   
    res.json({ "message": "Successfully deleted" });
});












module.exports = router;
