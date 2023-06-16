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

router.delete('/api/event-images/:imageId', async (req, res) => {
    const imageId = req.params.imageId;
    const currentUserId = req.user.id; 

        const image = await Image.findOne({
            where: { id: imageId, imageableType: 'event' },
            include: [{
                model: Event,
                as: 'event',
                include: [{
                    model: Group,
                    attributes: ['organizerId', 'id']
                }]
            }]
        });

        if (!image) {
            return res.status(404).json({ message: "Event Image couldn't be found" });
        }

        const groupId = image.event.Group.id;
        const organizerId = image.event.Group.organizerId;

        const membership = await Membership.findOne({
            where: { groupId: groupId, userId: currentUserId }
        });

        if (currentUserId !== organizerId && (!membership || membership.status !== 'co-host')) {
            return res.status(403).json({ message: "You don't have permission to delete this image" });
        }

        await Image.destroy({ where: { id: imageId } });

        return res.status(200).json({ message: 'Successfully deleted' });

});

module.exports = router;
