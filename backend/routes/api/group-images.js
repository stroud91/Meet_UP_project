const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Venue, Membership, Event, Attendance, Image } = require('../../db/models');
const { Op } = require("sequelize");
const router = express.Router();



// Delete an Image for a Group
// Delete an existing image for a Group.
// Require Authentication: true
// Require proper authorization: Current user must be the organizer or "co-host" of the Group
// Request Method: DELETE
// URL: /groups/:groupId/images/:imageId

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const { user } = req;

    const image = await Image.findByPk(imageId);

    if (!image || image.imageableType !== 'group') {
        return res.status(404).json({ message: "Group Image couldn't be found" });
    }

    const groupId = image.imageableId;
    const group = await Group.findByPk(groupId);

    // Check if user is an organizer
    const isOrganizer = group && group.organizerId === user.id;

    // Check if user is a co-host
    const isCoHost = await Membership.findOne({
        where: {
            groupId: groupId,
            userId: user.id,
            status: 'co-host'
        }
    });

    // If user is not an organizer or co-host, return an error
    if (!isOrganizer && !isCoHost) {
        return res.status(401).json({ message: "Must be organizer or co-host to delete image" });
    }

    // Delete the image
    await image.destroy();

    // Send a success response
    return res.status(200).json({ message: "Successfully Deleted" });
});



module.exports = router;
