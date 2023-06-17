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
  const { user } = req;

  const image = await Image.findByPk(imageId);

  // Check if the image exists and is associated with an event
  if (!image) {
      return res.status(404).json({ message: "Event Image couldn't be found" });
  }

  // Find the event and the group associated with the event
  const eventId = image.imageableId;
  const event = await Event.findByPk(eventId);
  const group = await Group.findByPk(event && event.groupId);
 
  // Check if user is an organizer
  const isOrganizer = group && group.organizerId === user.id;

  // Check if user is a co-host
  const isCoHost = await Membership.findOne({
      where: {
          groupId: group && group.id,
          userId: user.id,
          status: 'co-host'
      }
  });

  // If user is neither an organizer nor a co-host, return an error
  if (!isOrganizer && !isCoHost) {
      return res.status(401).json({ message: "Must be organizer or co-host to delete image" });
  }

  // Delete the image
  await image.destroy();

  // Send a success response
  return res.status(200).json({ message: "Successfully Deleted" });
});


module.exports = router;
