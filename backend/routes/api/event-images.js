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

    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'event'
        }
    });

    if (!image) {
        return res.status(404).json({
            message: "Event Image couldn't be found"
        });
    }

    const eventId = image.imageableId;

    const event = await Event.findByPk(eventId, {
        include: [{
            model: Group,
            attributes: ['organizerId', 'id'] // include id for membership query
        }]
    });

    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    const isOrganizer = req.user.id === event.Group.organizerId;

    const groupId = event.Group.id;
    const membership = await Membership.findOne({
        where: {
            groupId,
            userId: req.user.id,
        }
    });
    const isCoHost = membership && membership.status === 'co-host';

    if (!isOrganizer && !isCoHost) {
        return res.status(403).json({
            message: "Unauthorized: Must be the organizer or co-host"
        });
    }

    await image.destroy();

    return res.status(200).json({
        message: "Successfully deleted"
    });
});











module.exports = router;
