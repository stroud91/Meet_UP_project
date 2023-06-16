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

router.delete('/api/event-images/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  
  const image = await Image.findByPk(imageId);

  if (!image || image.imageableType !== 'event') {
    return res.status(404).json({ message: "Event Image couldn't be found" });
  }

  const event = await Event.findByPk(image.imageableId, {
    include: [{
      model: Group,
      as: 'group'
    }]
  });

  const group = event.group;

  if (group.organizerId !== req.user.id) { // Assuming req.user contains the logged in user
    return res.status(403).json({ message: "Unauthorized" });
  }

  await image.destroy();

  return res.status(200).json({ message: "Successfully deleted" });
});
module.exports = router;
