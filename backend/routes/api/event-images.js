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

router.delete('/api/event-images/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    // Find the image
    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'event'
        }
    });

    // If the image doesn't exist, return a 404 error
    if (!image) {
        return res.status(404).json({ message: "Event Image couldn't be found" });
    }

    // Get the event associated with the image
    const eventId = image.imageableId;
    const event = await Event.findByPk(eventId, {
        include: [{
            model: Group,
            attributes: ['organizerId'],
            as: 'Group'
        }]
    });

    // If the event doesn't exist, return a 404 error
    if (!event) {
        return res.status(404).json({ message: "Event couldn't be found" });
    }

    // Check if the current user is the organizer or a co-host of the group
    const membership = await Membership.findOne({
        where: {
            groupId: event.groupId,
            userId: req.user.id,
        }
    });

    const isCohost = membership && membership.status === 'co-host';
    const isOrganizer = req.user.id === event.Group.organizerId;

    // If the user is neither an organizer nor a co-host, return a 403 error
    if (!isOrganizer && !isCohost) {
        return res.status(403).json({ message: "Unauthorized: Must be the organizer or co-host" });
    }

    // Delete the image
    await image.destroy();

    // Return a successful response
    res.status(200).json({ "message": "Successfully deleted" });
});












module.exports = router;
