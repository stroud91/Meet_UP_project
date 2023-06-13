const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Venue, Event, Attendee, Membership, Image} = require('../../db/models');
const { Op } = require("sequelize")

const router = express.Router();


const validateCreation = [
    check('name')
        .isLength({ min: 2, max: 60 })
        .withMessage('Name must be between 2 and 60 characters'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more! Please be aware to not include offensive description in your text!'),
    check('city')
        .isLength({ min: 2 })
        .withMessage('City must be 2 characters or more! Invalid Submit'),
    check('state')
        .isLength({ min: 2 })
        .withMessage('State MUST be 2 characters or more! Invalid submmit!'),
    check('type')
        .isIn(['Online', 'In person'])
        .withMessage(`Type MUST be 'Online' or 'In person'! Please try again!`),
    check('private')
        .isBoolean()
        .withMessage('Private MUST be a True! or False! Please try again!'),

    handleValidationErrors
];

const err = {};

//Groups Routes

router.get('users/:userId/groups', requireAuth, async (req, res, next) => {
    const { user } = req;
    const id = user.id
    const groupArray = []
    const safeGroup = []

    const organizerGroupResult = await Group.findAll({ where: { organizerId: id } })

    organizerGroupResult.forEach(group => {
        groupArray.push(group.toJSON())
    })
    res.json({ Groups: safeGroup })
})




router.delete('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;
    const userId = req.user.id;

        const group = await Group.findByPk(groupId);

        if (!group) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        // Check if the user is authorized to delete the group
        if (group.organizerId !== userId) {
            const err = new Error("You are not authorized to delete this group! Only Admin has these privilege!");
            err.status = 401;
            return next(err);
        }

        // Delete the group
        await group.destroy();

        res.status(200).json({
            message: "Successfully deleted"
        });
});


// Edit a Group
// Require Authentication: true
// Require proper authorization: Group must belong to the current user
// Request Method: PUT
// URL: /groups/:groupId

router.put('/:groupId', requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Indicated group couldn't be found. Please try again");
        err.status = 404;
        return next(err);
    }

    // Check if the user is authorized to update the group
    if (group.organizerId !== userId) {
        const err = new Error("You are not authorized to edit this group! Only Admin has these privilege!");
        err.status = 401;
        return next(err);
    }

    await group.update({ name, about, type, private, city, state });

    //updated group
    res.status(200).json({
        id: group.id,
        organizerId: group.organizerId,
        name: group.name,
        about: group.about,
        type: group.type,
        private: group.private,
        city: group.city,
        state: group.state,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt
    });


});

// Add an Image to a Group based on the Group's id
// Create and return a new image for a group specified by id.
// Require Authentication: true
// Require proper authorization: Current User must be the organizer for the group
// Request Method: POST
// URL: /groups/:groupId/images

router.post('/:groupId/images', requireAuth, async (req, res, next) => {

    const { groupId } = req.params;
    const { url, preview } = req.body;


    const group = await Group.findOne({ where: { id: groupId } });


    if (!group) {
        return res.status(404).json({ message: "Group couldn't be found" });
    }

    // Check if the current user is the organizer of the group
    if (group.organizerId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized: Only the organizer can add images" });
    }


    const newImage = await Image.create({
        imageableId: groupId,
        imageableType: 'group',
        url,
        preview
    });


    res.status(200).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    });
});



// Get all Groups joined or organized by the Current User
// Require Authentication: true
// Request Method: GET
// URL: /groups/current

router.get('/current', requireAuth, async (req, res, next) => {
    const ownerGroup = await Group.findAll({
        where: {
            organizerId: req.user.id
        }
    });

    const membersGroup = await Group.findAll({
        include: {
            attributes: [],
            model: Membership,
            as: "groupMemberIds",
            where: {
                userId: req.user.id
            }
        }
    });

    const list = [...ownerGroup, ...membersGroup];

    // Fetch groupIds from list
    const groupIds = list.map(group => group.id);

    // Fetch images for all groups at once
    const images = await Image.findAll({
        where: {
            imageableId: { [Op.in]: groupIds },
            imageableType: 'group'
        }
    });

    //for easier lookup
    const imageMap = {};
    images.forEach(image => {
        imageMap[image.imageableId] = image.imageURL;
    });

    //assign images and count
    for (let i = 0; i < list.length; i++) {
        let numMembers = await Membership.count({
            where: {
                groupId: list[i].dataValues.id
            }
        });

        list[i].dataValues.numMembers = numMembers;
        list[i].dataValues.images = imageMap[list[i].dataValues.id] || null;
    }

    res.json({ Groups: list });
});

// Get details of a Group from an id
// Require Authentication: false
// Request Method: GET
// URL: /groups/:groupId

router.get('/:groupId', async (req, res, next) => {
    const { groupId } = req.params;


 const group = await Group.findOne({
    where: {
        id: groupId
    },
    include: [
        {
            model: Image,
            attributes: ['id', 'imageURL', 'preview'],
            as: "images"
        },
        {
            model: User.scope('organizer'),
            attributes: ['id', 'firstName', 'lastName'],
            as: "Organizer"
        },
        {
            model: Venue.scope('allVenuesRoutes'),
            as: "Venues"
        }
    ]
});

if (!group) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    return next(err);
}


const numMembers = await Membership.count({
    where: {
        groupId: group.id
    }
});

const groupData = group.get({ plain: true });
groupData.numMembers = numMembers;


res.json(groupData);
});

// Create a Group
// Require Authentication: true
// Request Method: POST
// URL: api/groups

router.post('/', requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;

    const newGroup = await Group.create({
        organizerId: req.user.id,
        name,
        about,
        type,
        private,
        city,
        state
    })
    res.status(201);
    res.json(newGroup);
});


// GROUPS
// 1.Get all Groups
// Require Authentication: false
// Method: GET
// URL: /api/groups

router.get('/', async (req, res, next) => {
    const groups = await Group.findAll({});

    // Fetch all images
    const groupIds = groups.map(group => group.id);
    const images = await Image.findAll({
        where: {
            imageableId: { [Op.in]: groupIds },
            imageableType: 'group'
        }
    });

    const allGroups = await Promise.all(groups.map(async group => {
        const groupJSON = group.toJSON();
        const groupId = groupJSON.id;

        // Counting number of members
        const numMembers = await Membership.count({
            where: {
                groupId,
                status: { [Op.or]: ['co-host', 'member'] }
            }
        });
        groupJSON.numMembers = numMembers;

        // Adding preview image if available
        const previewImage = images.find(img => img.imageableId === groupId);
        if (previewImage) {
            groupJSON.previewImage = previewImage.imageURL;
        } else {
            groupJSON.previewImage = "Preview not available";
        }

        return groupJSON;
    }));

    res.json({ Groups: allGroups });
})

module.exports = router;
