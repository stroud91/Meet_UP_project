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

router.delete('/api/event-images/:imageId', isAuthenticated, isOrganizerOrCoHost, async (req, res) => {
    try {
        const imageId = req.params.imageId;

        // Fetch the image record
        const image = await Image.findOne({
            where: {
                id: imageId,
                imageableType: 'event'
            },
            include: [{
                model: Event,
                as: 'imageable',
                include: [{
                    model: Group,
                    attributes: ['organizerId', 'coHostId']
                }]
            }]
        });

        // Check if image exists
        if (!image) {
            return res.status(404).json({
                message: "Event Image couldn't be found"
            });
        }

        // Delete the image
        await Image.destroy({
            where: {
                id: imageId
            }
        });

        // Send success response
        res.status(200).json({
            message: 'Successfully deleted'
        });

    } catch (err) {
        // Handle error
        res.status(500).json({
            message: 'Server Error'
        });
    }
});

module.exports = router;
