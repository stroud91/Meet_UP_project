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

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    // Find the image by its ID and ensure it's associated with an event.
    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'event'
        }
    });

    // If the image is not found, return an error.
    if (!image) {
        const err = new Error("Event Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    // Retrieve the event ID from the image.
    const eventId = image.imageableId;

    // Find the event and include the group it belongs to.
    const event = await Event.findByPk(eventId, {
        include: [{
            model: Group,
            attributes: ['organizerId']
        }]
    });

    // If the event is not found, return an error.
    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        return next(err);
    }

    // Find the membership of the user for the group the event belongs to.
    const membership = await Membership.findOne({
        where: {
            groupId: event.groupId,
            userId: req.user.id,
        }
    });

    // Check if the user is a co-host.
    const isCohost = membership && membership.status === 'co-host';

    // Check if the user is the organizer.
    const isOrganizer = req.user.id === event.Group.organizerId;

    // If the user is neither the organizer nor a co-host, return an unauthorized error.
    if (!isOrganizer && !isCohost) {
        const err = new Error("Unauthorized: Must be the organizer or co-host");
        err.status = 403;
        return next(err);
    }

    // Delete the image.
    await image.destroy();

    // Send a success response.
    res.json({ "message": "Successfully deleted" });
});












module.exports = router;
