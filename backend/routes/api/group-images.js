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

    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'group'
        }
    });

    if (!image) {
        const err = new Error("Group Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    const groupId = image.imageableId;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        return next(err);
    }

    const membership = await Membership.findOne({
        where: {
            groupId,
            userId: req.user.id,
        }
    });

    const isCohost = membership && membership.status === 'co-host';

    if (req.user.id !== group.organizerId && !isCohost) {
        const err = new Error("Unauthorized: Must be the organizer or co-host of the group");
        err.status = 403;
        return next(err);
    }

    await image.destroy();

    res.json({ "message": "Successfully deleted" });
});
module.exports = router;
