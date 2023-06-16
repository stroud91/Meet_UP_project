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

router.delete('/api/event-images/:imageId', requireAuth, (req, res) => {
    const imageId = req.params.imageId;

    // Fetch the image record
    Image.findOne({
        where: { id: imageId, imageableType: 'event' },
        include: [{
            model: Event,
            as: 'imageable',
            include: [{
                model: Group,
                attributes: ['organizerId', 'id']
            }]
        }]
    })
    .then(image => {
        // Check if image exists
        if (!image) {
            return res.status(404).json({ message: "Event Image couldn't be found" });
        }

        // Check if the current user is an organizer
        const group = image.imageable.Group;
        if (req.user.id === group.organizerId) {
            // User is an organizer, proceed to delete the image
            return Image.destroy({ where: { id: imageId } });
        }

        // Check if the current user is a co-host
        return Membership.findOne({
            where: {
                userId: req.user.id,
                groupId: group.id,
                status: 'co-host'
            }
        }).then(membership => {
            if (membership) {
                // User is a co-host, proceed to delete the image
                return Image.destroy({ where: { id: imageId } });
            } else {
                // User is neither an organizer nor a co-host
                return res.status(403).json({ message: "You don't have permission to delete this image" });
            }
        });
    })
    .then(() => {
        // Send success response
        res.status(200).json({ message: 'Successfully deleted' });
    })
    .catch(error => {
        // Handle error
        res.status(500).json({ message: 'Server Error', error });
    });
});

module.exports = router;
