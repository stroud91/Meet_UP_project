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

router.delete('/api/group-images/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  
  const image = await Image.findByPk(imageId);

  if (!image || image.imageableType !== 'group') {
    return res.status(404).json({ message: "Group Image couldn't be found" });
  }

  const group = await Group.findByPk(image.imageableId);

  if (group.organizerId !== req.user.id) { // Assuming req.user contains the logged in user
    return res.status(403).json({ message: "Unauthorized" });
  }

  await image.destroy();

  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
