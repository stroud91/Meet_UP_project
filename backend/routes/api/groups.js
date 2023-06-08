const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group } = require('../../db/models');
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

    const { user } = req;
    const id = user.id
    const group = await Group.findByPk(groupId)
    //Making sure to authorize only Admin to make changes to Group!!!DELETE
    if (group) {
        if (group.organizerId !== id) {
            err.title = "NOT AUTHORIZED!!!"
            err.status = 401
            err.message = `You are not authorized to delete this group! Only Admin has these privilege!`
            return next(err)
        }
        await group.destroy()
        res.status(200)
        return res.json({
            message: "Group was successfully deleted. Have a nice day!",
            statusCode: 200
        })
    } else {
        err.title = "Group query failed!"
        err.status = 404
        err.message = "Indicated group couldn't be found. Please try again"
        return next(err)


    }
})


router.put('/:groupId', requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body
    const { groupId } = req.params
    const { user } = req;
    const id = user.id

    const group = await Group.findByPk(groupId)
    //Making sure to authorize only Admin to make changes to Group!!!EDIT
    if (group) {
        if (group.organizerId !== id) {
            err.title = "NOT AUTHORIZED!!!"
            err.status = 401
            err.message = `You are not authorized to edit this group! Only Admin has these privilege!`
            return next(err)
        }
        await group.update({
            organizerId: id, name, about, city, state, type, private
        })
        res.status(200)
        return res.json({
            message: "Group was successfully edited. Have a nice day!",
            statusCode: 200
        })
    } else {
        err.title = "Group query failed!"
        err.status = 404
        err.message = "Indicated group couldn't be found. Please try again"
        return next(err)
    }


})

router.get('/', async (req, res, next) => {
    const groups = await Group.findAll({})
    const allGroupsArray = []

    //method in test 1 - for loop to get all array of groups
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i]
        const groupId = group.id

        group = group.toJSON()
        //console.log(group)

        allGroupsArray.push(group)
        //console.log(allGroupsArray)
    }


    res.json({ Groups: allGroupsArray })
})




router.post('/', requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, city, state, type, private,  } = req.body
    const { user } = req;
    const id = user.id
    const group = await Group.create({
        organizerId: id, name, about, city, state, type, private,
    })

    res.json(group)
})

module.exports = router;
